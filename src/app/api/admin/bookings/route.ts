import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createSupabaseServer } from '@/lib/supabase/server'

async function getAuthSession() {
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
  return session
}

// GET /api/admin/bookings
export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServer()
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ bookings: data ?? [] })
}

// PATCH /api/admin/bookings — update booking fields, or cancel (with slot release)
export async function PATCH(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServer()
  const body = await req.json()
  const { id, updates, cancel, slotId } = body

  if (!id) return NextResponse.json({ message: 'Missing booking id' }, { status: 400 })

  if (cancel) {
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id)
    if (error) return NextResponse.json({ message: error.message }, { status: 400 })
    if (slotId) {
      await supabase.from('slots').update({ is_booked: false, booking_id: null }).eq('id', slotId)
    }
    return NextResponse.json({ success: true })
  }

  if (!updates) return NextResponse.json({ message: 'Missing updates' }, { status: 400 })
  const { error } = await supabase.from('bookings').update(updates).eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
