import { calculateFinalPrice, PlanCode } from '@/lib/pricing'

type Plan = {
  code: PlanCode
  title: string
  duration_minutes: number
  price_inr: number
}

type ServiceType = {
  slug: string
  title: string
  short_desc: string
  base_price_inr: number
}

const PLAN_META: Record<string, { icon: string; tag?: string; tagColor?: string }> = {
  quick_15: { icon: '⚡' },
  full_30:  { icon: '🎯', tag: 'Most popular', tagColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  monthly:  { icon: '📅', tag: 'Best value', tagColor: 'brand' },
}

export default function ServiceStep(props: {
  plans: Plan[]
  serviceType?: ServiceType
  selectedPlanCode: string
  onSelect: (plan: Plan) => void
}) {
  const visiblePlans = props.plans.filter((p) => p.code !== 'monthly')

  if (!props.serviceType) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-400 text-center">
        Please select a service type above.
      </div>
    )
  }

  if (visiblePlans.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-400 text-center">
        No plans available for this service right now.
      </div>
    )
  }

  const base = props.serviceType.base_price_inr

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
        Select a plan
      </p>

      {visiblePlans.map((p) => {
        const final = calculateFinalPrice(base, p.code)
        const isSelected = p.code === props.selectedPlanCode
        const meta = PLAN_META[p.code] ?? { icon: '✅' }

        return (
          <button
            key={p.code}
            type="button"
            onClick={() => props.onSelect(p)}
            className={[
              'group w-full rounded-xl border-2 p-4 text-left transition-all duration-200',
              isSelected
                ? 'border-[rgb(var(--color-primary))] shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm',
            ].join(' ')}
            style={isSelected ? { background: 'rgb(var(--color-primary-soft) / 0.5)' } : {}}
          >
            <div className="flex items-center justify-between gap-3">

              {/* Left */}
              <div className="flex items-center gap-3">
                <div className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl transition-colors',
                  isSelected ? 'bg-[rgb(var(--color-primary-soft))]' : 'bg-slate-100 group-hover:bg-slate-200',
                ].join(' ')}>
                  {meta.icon}
                </div>

                <div>
                  <span className="font-semibold text-slate-900">{p.title}</span>

                  {meta.tag && (
                    meta.tagColor === 'brand' ? (
                      <span
                        className="ml-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold text-[rgb(var(--color-primary))]"
                        style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}
                      >
                        {meta.tag}
                      </span>
                    ) : (
                      <span className={`ml-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.tagColor}`}>
                        {meta.tag}
                      </span>
                    )
                  )}

                  <div className="mt-0.5 text-xs text-slate-500">
                    {p.duration_minutes} min session
                  </div>
                </div>
              </div>

              {/* Right: price + selector */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">₹{final}</div>
                  <div className="text-[10px] text-slate-400">per session</div>
                </div>

                <div className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                  isSelected
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]'
                    : 'border-slate-300',
                ].join(' ')}>
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

            </div>
          </button>
        )
      })}
    </div>
  )
}