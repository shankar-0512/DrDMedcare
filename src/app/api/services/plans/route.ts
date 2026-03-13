import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

// GET /api/services/plans?type=<service_type_slug>
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const serviceTypeSlug = searchParams.get('type')
  if (!serviceTypeSlug) return NextResponse.json({ message: 'Missing type' }, { status: 400 })

  const supabase = createSupabaseServer()
  const { data, error } = await supabase
    .from('service_type_plans')
    .select(`
      plan_code,
      sort_order,
      services:services (
        code,
        title,
        duration_minutes,
        price_inr
      )
    `)
    .eq('service_type_slug', serviceTypeSlug)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ plans: data ?? [] })
}
