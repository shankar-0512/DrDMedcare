import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServer } from '@/lib/supabase/server'

const schema = z.object({
  serviceCode: z.string().min(1),
  preferredStart: z.string().min(1),
  preferredEnd: z.string().min(1),

  patientName: z.string().min(2),
  patientPhone: z.string().min(6),
  patientEmail: z.string().email(),
  city: z.string().min(2),
  language: z.string().min(2),

  consentEducation: z.boolean(),
  consentNoPrescribing: z.boolean(),
  consentNotEmergency: z.boolean(),
})

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json())
    const supabase = createSupabaseServer()

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        service_code: body.serviceCode,
        preferred_start: new Date(body.preferredStart).toISOString(),
        preferred_end: new Date(body.preferredEnd).toISOString(),

        patient_name: body.patientName,
        patient_phone: body.patientPhone,
        patient_email: body.patientEmail,
        city: body.city,
        language: body.language,

        consent_education: body.consentEducation,
        consent_no_prescribing: body.consentNoPrescribing,
        consent_not_emergency: body.consentNotEmergency,
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    return NextResponse.json({ bookingId: data.id })
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? 'Invalid request' }, { status: 400 })
  }
}
