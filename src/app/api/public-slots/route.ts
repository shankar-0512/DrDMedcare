import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

// GET /api/public-slots?date=YYYY-MM-DD
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (!date) return NextResponse.json({ message: 'Missing date' }, { status: 400 })

  const supabase = createSupabaseServer()
  const { data, error } = await supabase
    .from('slots')
    .select('*')
    .eq('slot_date', date)
    .eq('is_blocked', false)
    .order('start_time')

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ slots: data ?? [] })
}
