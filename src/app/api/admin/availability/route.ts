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
