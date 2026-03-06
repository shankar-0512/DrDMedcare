export type PlanCode = 'quick_15' | 'full_30' | 'monthly'

export function planMultiplier(plan: PlanCode): number {
  switch (plan) {
    case 'quick_15':
      return 1.0
    case 'full_30':
      return 1.6
    case 'monthly':
      return 3.5
    default:
      return 1.0
  }
}

function roundToClean(amount: number): number {
  if (amount < 1000) {
    return Math.round(amount / 50) * 50   // ₹250, ₹300, ₹350…
  }
  return Math.round(amount / 100) * 100   // ₹1200, ₹1400…
}

export function calculateFinalPrice(basePriceInr: number, plan: PlanCode): number {
  const raw = basePriceInr * planMultiplier(plan)
  return roundToClean(raw)
}
