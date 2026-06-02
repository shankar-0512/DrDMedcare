import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

// GET /api/available-dates?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns dates that have at least one non-blocked, non-booked, non-dummy slot.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from')
  const to   = searchParams.get('to')
  if (!from || !to) return NextResponse.json({ message: 'Missing from/to' }, { status: 400 })

  const supabase = createSupabaseServer()
  const { data, error } = await supabase
    .from('slots')
    .select('slot_date')
    .gte('slot_date', from)
    .lte('slot_date', to)
    .eq('is_blocked', false)
    .eq('is_booked', false)
    .eq('is_dummy', false)
    .order('slot_date')

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })

  // Deduplicate dates
  const dates = [...new Set((data ?? []).map((r) => r.slot_date as string))]
  return NextResponse.json({ dates })
}
