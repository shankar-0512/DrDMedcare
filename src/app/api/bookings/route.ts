import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
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

function planLabel(plan: PlanCode): string {
  switch (plan) {
    case 'quick_15': return 'Quick Consult (15 min)'
    case 'full_30':  return 'Full Session (30 min)'
    case 'monthly':  return 'Monthly Plan'
  }
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  })
}

function buildAdminNotificationEmail(params: {
  bookingId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAge: number
  patientGender: string
  patientAddress: string
  language: string
  serviceTitle: string
  planCode: PlanCode
  preferredStart: string
  finalPriceInr: number
}): string {
  const adminLink = `https://drdmedcare.com/admin/bookings`
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:540px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0f766e;padding:24px 40px;">
            <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">New Booking Received</h1>
            <p style="margin:4px 0 0;color:#99f6e4;font-size:13px;">Dr D's MedCare · Admin Alert</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:24px;">
              <tr><td style="padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;width:40%;">Patient</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.patientName}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Age / Gender</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.patientAge} · ${params.patientGender}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Phone</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.patientPhone}</td>
                  </tr>
                  ${params.patientEmail ? `<tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Email</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.patientEmail}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Address</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.patientAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Language</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.language.toUpperCase()}</td>
                  </tr>
                  <tr><td colspan="2" style="padding:8px 0;border-top:1px solid #e2e8f0;"></td></tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Service</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.serviceTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Plan</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${planLabel(params.planCode)}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Preferred slot</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${formatDateTime(params.preferredStart)}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Amount</td>
                    <td style="padding:5px 0;color:#0f766e;font-size:15px;font-weight:700;">₹${params.finalPriceInr}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Booking ID</td>
                    <td style="padding:5px 0;color:#94a3b8;font-size:12px;font-family:monospace;">${params.bookingId}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0f766e;border-radius:8px;">
                  <a href="${adminLink}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">
                    View in Admin →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildPatientConfirmationEmail(params: {
  patientName: string
  serviceTitle: string
  planCode: PlanCode
  preferredStart: string
  finalPriceInr: number
  bookingId: string
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:540px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0f766e;padding:24px 40px;">
            <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">Booking Received</h1>
            <p style="margin:4px 0 0;color:#99f6e4;font-size:13px;">Dr D's MedCare · Confirmation</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 20px;color:#0f172a;font-size:15px;">Hi ${params.patientName},</p>
            <p style="margin:0 0 24px;color:#334155;font-size:14px;line-height:1.6;">
              Thank you for booking a session with Dr Priyanka Deventhiran. Your slot is reserved — please complete the steps below to confirm it.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:24px;">
              <tr><td style="padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;width:40%;">Service</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${params.serviceTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Plan</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${planLabel(params.planCode)}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Preferred slot</td>
                    <td style="padding:5px 0;color:#0f172a;font-size:13px;font-weight:600;">${formatDateTime(params.preferredStart)}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Amount</td>
                    <td style="padding:5px 0;color:#0f766e;font-size:15px;font-weight:700;">₹${params.finalPriceInr}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#64748b;font-size:13px;">Booking ID</td>
                    <td style="padding:5px 0;color:#94a3b8;font-size:12px;font-family:monospace;">${params.bookingId}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="padding:4px 0;color:#334155;font-size:13px;">1. Make payment via UPI to <strong>30818055@kvb</strong> (UPI mobile: 9080709332).</td></tr>
              <tr><td style="padding:4px 0;color:#334155;font-size:13px;">2. Send your payment screenshot on WhatsApp along with your Booking ID.</td></tr>
              <tr><td style="padding:4px 0;color:#334155;font-size:13px;">3. We will confirm your session slot within a few hours.</td></tr>
            </table>
            <p style="margin:0 0 8px;color:#334155;font-size:13px;line-height:1.6;">
              Questions? Reply to this email or reach out on WhatsApp at +91 90807 09332.
            </p>
            <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;">Dr D's MedCare · drdmedcare.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
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
      .select('slug, title, base_price_inr, is_active')
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

    // Rate limit: max 3 bookings per phone number per 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('patient_phone', body.patientPhone)
      .gte('created_at', since)

    if ((count ?? 0) >= 3) {
      return NextResponse.json(
        { message: 'Too many bookings from this number. Please try again after 24 hours or contact us on WhatsApp.' },
        { status: 429 }
      )
    }

    const startIso = new Date(body.preferredStart).toISOString()
    const endIso   = new Date(body.preferredEnd).toISOString()

    if (new Date(endIso).getTime() <= new Date(startIso).getTime()) {
      return NextResponse.json({ message: 'Invalid slot time range.' }, { status: 400 })
    }

    // Atomically claim slot — prevents double-booking race condition
    if (body.slotId) {
      const { data: claimed } = await supabase
        .from('slots')
        .update({ is_booked: true })
        .eq('id', body.slotId)
        .eq('is_booked', false)
        .eq('is_blocked', false)
        .eq('is_dummy', false)
        .select('id')
        .single()

      if (!claimed) {
        return NextResponse.json(
          { message: 'Selected slot is no longer available. Please choose another.' },
          { status: 409 }
        )
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

    // Link booking_id to the already-claimed slot
    if (body.slotId) {
      await supabase
        .from('slots')
        .update({ booking_id: data.id })
        .eq('id', body.slotId)
    }

    // Send booking emails (admin + patient) — failure must not block the booking response
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = "Dr D's MedCare <bookings@drdmedcare.com>"
      const adminEmail = process.env.RESEND_REPLY_TO ?? 'drpriyankamedcare@gmail.com'

      const emailParams = {
        bookingId: data.id,
        patientName: body.patientName,
        patientPhone: body.patientPhone,
        patientEmail: body.patientEmail ?? '',
        patientAge: body.patientAge,
        patientGender: body.patientGender,
        patientAddress: body.patientAddress,
        language: body.language,
        serviceTitle: serviceType.title,
        planCode,
        preferredStart: startIso,
        finalPriceInr,
      }

      const sends = [
        resend.emails.send({
          from,
          to: adminEmail,
          subject: `New booking: ${body.patientName} — ${serviceType.title}`,
          html: buildAdminNotificationEmail(emailParams),
        }),
      ]

      if (body.patientEmail) {
        sends.push(
          resend.emails.send({
            from,
            to: body.patientEmail,
            replyTo: adminEmail,
            subject: `Your booking is confirmed — Dr D's MedCare`,
            html: buildPatientConfirmationEmail(emailParams),
          })
        )
      }

      await Promise.allSettled(sends)
    } catch {
      // Email failure should not block the booking response
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
