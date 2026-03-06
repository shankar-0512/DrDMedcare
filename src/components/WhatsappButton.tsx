const WA_NUMBER = '919080709332'

export const WA_MESSAGES = {
  general:    "Hi Dr Priyanka! I'd like to know more about your medication counselling services.",
  booking:    "Hi Dr Priyanka! I'd like to book a session. Could you help me?",
  faq:        "Hi Dr Priyanka! I have a question before booking my session.",
  blog:       "Hi Dr Priyanka! I have a topic suggestion for your blog.",
  suggestion: "Hi Dr Priyanka! I'd like to suggest a topic for your blog.",
}

export function waLink(message?: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message ?? WA_MESSAGES.general)}`
}

const WA_ICON = (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L.057 23.535a.75.75 0 0 0 .92.92l5.733-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.953-1.355l-.355-.211-3.664.936.972-3.573-.231-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

type Props = {
  message?: string
  label?: string
  variant?: 'outline' | 'green'
  className?: string
}

export default function WhatsAppButton({
  message,
  label = 'Chat on WhatsApp',
  variant = 'outline',
  className = '',
}: Props) {
  const href = waLink(message)

  if (variant === 'green') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-700 transition-colors ${className}`}
      >
        {WA_ICON}
        {label}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors ${className}`}
    >
      <span className="text-green-500">{WA_ICON}</span>
      {label}
    </a>
  )
}