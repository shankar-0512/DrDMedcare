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

// GET /api/admin/slots?date=YYYY-MM-DD
export async function GET(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (!date) return NextResponse.json({ message: 'Missing date' }, { status: 400 })

  const supabase = createSupabaseServer()
  const { data, error } = await supabase
    .from('slots')
    .select('*')
    .eq('slot_date', date)
    .order('start_time')

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ slots: data ?? [] })
}

// POST /api/admin/slots — generate slots from availability rules
export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { toInsert } = await req.json()
  if (!Array.isArray(toInsert)) return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })

  if (toInsert.length === 0) return NextResponse.json({ success: true })

  const supabase = createSupabaseServer()
  const { error } = await supabase
    .from('slots')
    .upsert(toInsert, { onConflict: 'slot_date,start_time', ignoreDuplicates: true })

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}

// PATCH /api/admin/slots — update or delete a single slot
export async function PATCH(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServer()
  const body = await req.json()

  if (body.deleteId !== undefined) {
    const { error } = await supabase.from('slots').delete().eq('id', body.deleteId)
    if (error) return NextResponse.json({ message: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  }

  const { id, updates } = body
  if (!id || !updates) return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  const { error } = await supabase.from('slots').update(updates).eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
