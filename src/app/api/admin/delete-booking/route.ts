import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function DELETE(req: Request) {
  try {
    // Auth check — middleware only covers /admin pages, not /api routes
    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { session } } = await supabaseAuth.auth.getSession()
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const { bookingId, slotId } = await req.json()
    if (!bookingId) return NextResponse.json({ message: 'Missing bookingId' }, { status: 400 })

    const supabase = createSupabaseServer()

    if (slotId) {
      await supabase.from('slots').update({ is_booked: false, booking_id: null }).eq('id', slotId)
    }

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId)
    if (error) return NextResponse.json({ message: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Invalid request'
    return NextResponse.json({ message }, { status: 400 })
  }
}
