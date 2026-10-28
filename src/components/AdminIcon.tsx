const PATHS: Record<string, string> = {
  dashboard: 'M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z',
  calendar: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  check: 'M5 13l4 4L19 7',
  hourglass: 'M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9',
  rupee: 'M7 5h10M7 9h10M7 5c5 0 7 1.5 7 4s-2 4-7 4l7 6',
}

export default function AdminIcon({ name, className = 'h-5 w-5' }: { name: keyof typeof PATHS | string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d={PATHS[name] ?? PATHS.dashboard} />
    </svg>
  )
}

export function AdminMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" aria-hidden>
      <g transform="rotate(-40 17 17)">
        <rect x="2" y="9.5" width="30" height="15" rx="7.5" style={{ fill: 'rgb(var(--c-teal))' }} />
        <path d="M17 9.5h8a7.5 7.5 0 0 1 0 15h-8z" style={{ fill: 'rgb(var(--c-brand))' }} />
      </g>
    </svg>
  )
}
