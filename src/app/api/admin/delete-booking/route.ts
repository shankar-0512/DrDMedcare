import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function DELETE(req: Request) {
  try {
    const { bookingId, slotId } = await req.json()
    if (!bookingId) return NextResponse.json({ message: 'Missing bookingId' }, { status: 400 })

    const supabase = createSupabaseServer()

    if (slotId) {
      await supabase.from('slots').update({ is_booked: false, booking_id: null }).eq('id', slotId)
    }

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId)
    if (error) return NextResponse.json({ message: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? 'Invalid request' }, { status: 400 })
  }
}
