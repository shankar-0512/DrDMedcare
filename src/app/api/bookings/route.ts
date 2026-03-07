import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServer } from '@/lib/supabase/server'

type PlanCode = 'quick_15' | 'full_30' | 'monthly'

function planMultiplier(plan: PlanCode): number {
  switch (plan) {
    case 'quick_15': return 1.0
    case 'full_30':  return 1.6
    case 'monthly':  return 3.5
    default:         return 1.0
  }
}

function roundToClean(amount: number): number {
  if (amount < 1000) return Math.round(amount / 50) * 50
  return Math.round(amount / 100) * 100
}

export function calculateFinalPrice(basePriceInr: number, plan: PlanCode): number {
  return roundToClean(basePriceInr * planMultiplier(plan))
}

const schema = z.object({
  serviceTypeSlug: z.string().min(1).optional(),
  planCode: z.enum(['quick_15', 'full_30', 'monthly']).optional(),
  serviceCode: z.string().min(1).optional(), // legacy

  slotId: z.string().uuid().optional(),

  preferredStart: z.string().min(1),
  preferredEnd:   z.string().min(1),

  patientName:    z.string().min(2),
  patientAge:     z.number().int().min(1).max(120),
  patientGender:  z.enum(['Male', 'Female', 'Other']),
  patientPhone:   z.string().min(6),
  patientAddress: z.string().min(2),
  patientEmail:   z.string().email().optional().or(z.literal('')),
  language:       z.string().min(2),

  consentLegal: z.boolean(),
})

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json())

    if (!body.consentLegal) {
      return NextResponse.json(
        { message: 'You must agree to the Terms of Service, Disclaimer, and Privacy Policy.' },
        { status: 400 }
      )
    }

    const planCode = (body.planCode ?? body.serviceCode) as PlanCode | undefined
    if (!planCode || !['quick_15', 'full_30', 'monthly'].includes(planCode)) {
      return NextResponse.json({ message: 'Invalid plan selected.' }, { status: 400 })
    }

    const serviceTypeSlug = body.serviceTypeSlug
    if (!serviceTypeSlug) {
      return NextResponse.json({ message: 'Missing service type.' }, { status: 400 })
    }

    const supabase = createSupabaseServer()

    const { data: serviceType, error: stError } = await supabase
      .from('service_types')
      .select('slug, base_price_inr, is_active')
      .eq('slug', serviceTypeSlug)
      .single()

    if (stError) return NextResponse.json({ message: stError.message }, { status: 400 })

    if (!serviceType?.is_active) {
      return NextResponse.json({ message: 'Selected service is not available.' }, { status: 400 })
    }

    const { data: allowed, error: mapErr } = await supabase
      .from('service_type_plans')
      .select('plan_code, is_active')
      .eq('service_type_slug', serviceTypeSlug)
      .eq('plan_code', planCode)
      .eq('is_active', true)
      .maybeSingle()

    if (mapErr) return NextResponse.json({ message: mapErr.message }, { status: 400 })

    if (!allowed) {
      return NextResponse.json(
        { message: 'Selected plan is not available for this service.' },
        { status: 400 }
      )
    }

    const basePriceInr = Number(serviceType.base_price_inr ?? 0)
    if (!Number.isFinite(basePriceInr) || basePriceInr <= 0) {
      return NextResponse.json({ message: 'Invalid base price for service.' }, { status: 400 })
    }

    const finalPriceInr = calculateFinalPrice(basePriceInr, planCode)

    const startIso = new Date(body.preferredStart).toISOString()
    const endIso   = new Date(body.preferredEnd).toISOString()

    if (new Date(endIso).getTime() <= new Date(startIso).getTime()) {
      return NextResponse.json({ message: 'Invalid slot time range.' }, { status: 400 })
    }

    // Validate slot if provided
    if (body.slotId) {
      const { data: slot } = await supabase
        .from('slots')
        .select('id, is_booked, is_blocked, is_dummy')
        .eq('id', body.slotId)
        .single()

      if (!slot) {
        return NextResponse.json({ message: 'Selected slot not found.' }, { status: 400 })
      }
      if (slot.is_booked || slot.is_blocked || slot.is_dummy) {
        return NextResponse.json({ message: 'Selected slot is no longer available. Please choose another.' }, { status: 400 })
      }
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        service_type_slug: serviceTypeSlug,
        plan_code:         planCode,
        base_price_inr:    basePriceInr,
        final_price_inr:   finalPriceInr,
        slot_id:           body.slotId ?? null,

        preferred_start: startIso,
        preferred_end:   endIso,

        patient_name:    body.patientName,
        patient_age:     body.patientAge,
        patient_gender:  body.patientGender,
        patient_phone:   body.patientPhone,
        patient_address: body.patientAddress,
        patient_email:   body.patientEmail ?? '',
        language:        body.language,

        consent_legal: body.consentLegal,
      })
      .select('id')
      .single()

    if (error) return NextResponse.json({ message: error.message }, { status: 400 })

    // Mark slot as booked
    if (body.slotId) {
      await supabase
        .from('slots')
        .update({ is_booked: true, booking_id: data.id })
        .eq('id', body.slotId)
    }

    return NextResponse.json({
      bookingId: data.id,
      serviceTypeSlug,
      planCode,
      basePriceInr,
      finalPriceInr,
    })
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? 'Invalid request' }, { status: 400 })
  }
}