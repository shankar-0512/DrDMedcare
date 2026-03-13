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

// Fetch availability rules + overrides
export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServer()
  const [{ data: rules }, { data: overrides }] = await Promise.all([
    supabase.from('availability_rules').select('*').order('day_of_week').order('start_time'),
    supabase.from('availability_overrides').select('*').order('date'),
  ])

  return NextResponse.json({ rules: rules ?? [], overrides: overrides ?? [] })
}

// Save weekly availability rules (delete-all + re-insert)
export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { rules } = await req.json()
  if (!Array.isArray(rules)) return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })

  const supabase = createSupabaseServer()

  await supabase.from('availability_rules').delete().neq('id', 0)

  const now = new Date().toISOString()
  const toInsert = rules.map(({ id: _id, ...r }: { id?: number; [key: string]: unknown }) => ({ ...r, created_at: now }))

  if (toInsert.length > 0) {
    const { error } = await supabase.from('availability_rules').insert(toInsert)
    if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

// Upsert or delete an availability override
export async function PATCH(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServer()
  const body = await req.json()

  if (body.deleteId !== undefined) {
    const { error } = await supabase.from('availability_overrides').delete().eq('id', body.deleteId)
    if (error) return NextResponse.json({ message: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  }

  const { error } = await supabase.from('availability_overrides').upsert(body.override, { onConflict: 'date' })
  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
