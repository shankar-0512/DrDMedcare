import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

// GET /api/services — active service types
export async function GET() {
  const supabase = createSupabaseServer()
  const { data, error } = await supabase
    .from('service_types')
    .select('id,slug,title,short_desc,long_desc,icon,base_price_inr')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ message: error.message }, { status: 400 })
  return NextResponse.json({ services: data ?? [] })
}
