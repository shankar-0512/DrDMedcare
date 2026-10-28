export type PlanCode = 'quick_15' | 'full_30' | 'monthly'

/* Email palette: keep in sync with the design tokens in src/app/globals.css */
const C = {
  teal: '#0f766e',
  tealDeep: '#0b5e58',
  gold: '#d8b65f',
  mint: '#e2f3f0',
  ink: '#121212',
  body: '#4e4e4e',
  muted: '#707070',
  line: '#dbe6e4',
  page: '#f4f8f7',
  white: '#ffffff',
}
const FONT = "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"

export function escapeHtml(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function planLabel(plan: PlanCode): string {
  switch (plan) {
    case 'quick_15': return 'Quick Clarity (15 min)'
    case 'full_30':  return 'Full Counselling (30 min)'
    case 'monthly':  return 'Monthly Plan'
  }
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })
}

function row(label: string, value: string, opts: { strong?: boolean; mono?: boolean } = {}) {
  const style = opts.mono
    ? `font-family:'SFMono-Regular',Menlo,monospace;font-size:12px;color:${C.muted};word-break:break-all;`
    : `font-size:14px;font-weight:${opts.strong ? 800 : 600};color:${C.ink};`
  return `<tr>
    <td style="padding:7px 0;width:38%;font-size:13px;color:${C.muted};vertical-align:top;">${label}</td>
    <td style="padding:7px 0;${style}">${value}</td>
  </tr>`
}

function shell(opts: { title: string; kicker: string; preheader: string; body: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(opts.title)}</title></head>
<body style="margin:0;padding:0;background:${C.page};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.white};border-radius:28px;overflow:hidden;border:1px solid ${C.line};">
        <tr>
          <td style="background:${C.teal};padding:28px 40px 24px;">
            <p style="margin:0 0 14px;font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${C.white};">Dr D&rsquo;s <span style="color:${C.gold};">MedCare</span></p>
            <h1 style="margin:0;font-size:24px;line-height:1.2;font-weight:800;letter-spacing:-0.02em;color:${C.white};">${escapeHtml(opts.title)}</h1>
            <p style="margin:6px 0 0;font-size:13px;color:#bfe6e1;">${escapeHtml(opts.kicker)}</p>
          </td>
        </tr>
        <tr><td style="height:4px;background:${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px 40px 8px;">${opts.body}</td></tr>
        <tr>
          <td style="padding:8px 40px 32px;">
            <p style="margin:0;font-size:12px;color:${C.muted};">Dr D&rsquo;s MedCare &middot; drdmedcare.com &middot; Education only &middot; India only</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function button(href: string, text: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="background:${C.teal};border-radius:999px;">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:${C.white};text-decoration:none;">${text}</a>
    </td>
  </tr></table>`
}

export type BookingEmailParams = {
  bookingId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAge: number
  patientGender: string
  patientAddress: string
  language: string
  serviceTitle: string
  planCode: PlanCode
  preferredStart: string
  finalPriceInr: number
}

export function buildAdminNotificationEmail(p: BookingEmailParams): string {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.mint};border-radius:20px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row('Patient', escapeHtml(p.patientName))}
          ${row('Age / Gender', `${escapeHtml(p.patientAge)} &middot; ${escapeHtml(p.patientGender)}`)}
          ${row('Phone', escapeHtml(p.patientPhone))}
          ${p.patientEmail ? row('Email', escapeHtml(p.patientEmail)) : ''}
          ${row('Address', escapeHtml(p.patientAddress))}
          ${row('Language', escapeHtml(p.language.toUpperCase()))}
          <tr><td colspan="2" style="padding:6px 0;border-top:1px solid ${C.line};"></td></tr>
          ${row('Service', escapeHtml(p.serviceTitle))}
          ${row('Plan', escapeHtml(planLabel(p.planCode)))}
          ${row('Preferred slot', escapeHtml(formatDateTime(p.preferredStart)))}
          ${row('Amount', `&#8377;${escapeHtml(p.finalPriceInr)}`, { strong: true })}
          ${row('Booking ID', escapeHtml(p.bookingId), { mono: true })}
        </table>
      </td></tr>
    </table>
    ${button('https://drdmedcare.com/admin/bookings', 'View in admin &rarr;')}
    <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:${C.body};">Payment proof will arrive on WhatsApp with this Booking ID.</p>`
  return shell({ title: 'New booking received', kicker: 'Admin alert', preheader: `${p.patientName} booked ${p.serviceTitle}`, body })
}

export function buildPatientConfirmationEmail(p: Pick<BookingEmailParams, 'patientName' | 'serviceTitle' | 'planCode' | 'preferredStart' | 'finalPriceInr' | 'bookingId'>): string {
  const step = (n: number, t: string) => `<tr>
    <td style="padding:6px 0;width:34px;vertical-align:top;"><span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:12px;background:${C.gold};color:${C.ink};font-size:12px;font-weight:800;">${n}</span></td>
    <td style="padding:6px 0;font-size:14px;line-height:1.55;color:${C.body};">${t}</td>
  </tr>`
  const body = `
    <p style="margin:0 0 14px;font-size:16px;color:${C.ink};">Hi ${escapeHtml(p.patientName)},</p>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.65;color:${C.body};">Thank you for booking a session with Dr Priyanka Deventhiran. Your slot is reserved. Please complete the steps below to confirm it.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.mint};border-radius:20px;margin-bottom:26px;">
      <tr><td style="padding:20px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row('Service', escapeHtml(p.serviceTitle))}
          ${row('Plan', escapeHtml(planLabel(p.planCode)))}
          ${row('Preferred slot', escapeHtml(formatDateTime(p.preferredStart)))}
          ${row('Amount', `&#8377;${escapeHtml(p.finalPriceInr)}`, { strong: true })}
          ${row('Booking ID', escapeHtml(p.bookingId), { mono: true })}
        </table>
      </td></tr>
    </table>
    <p style="margin:0 0 8px;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${C.ink};">What happens next</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${step(1, 'Pay via UPI to <strong style="color:' + C.ink + ';">30818055@kvb</strong> (UPI mobile: 9080709332).')}
      ${step(2, 'Send your payment screenshot on WhatsApp with your Booking ID.')}
      ${step(3, 'We will confirm your session slot within a few hours.')}
    </table>
    ${button('https://wa.me/919080709332', 'Send payment proof on WhatsApp &rarr;')}
    <p style="margin:22px 0 0;font-size:13px;line-height:1.65;color:${C.body};">Questions? Reply to this email or message +91 90807 09332 on WhatsApp.</p>`
  return shell({ title: 'Booking received', kicker: 'Your slot is reserved', preheader: 'Your slot is reserved. Complete payment to confirm it.', body })
}
