'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin',              icon: '📊', label: 'Dashboard'   },
  { href: '/admin/availability', icon: '🗓️', label: 'Availability' },
  { href: '/admin/slots',        icon: '⏱️', label: 'Slots'        },
  { href: '/admin/bookings',     icon: '📋', label: 'Bookings'     },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  )

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-slate-50">

      <aside
        className={[
          'flex flex-col border-r border-slate-200 bg-white transition-all duration-200',
          collapsed ? 'w-16' : 'w-56',
        ].join(' ')}
      >
        {/* Header */}
        <div className={[
          'flex items-center border-b border-slate-100 py-4',
          collapsed ? 'justify-center px-3' : 'justify-between px-5',
        ].join(' ')}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm text-white"
                style={{ background: 'rgb(var(--color-primary))' }}
              >
                💻
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 leading-tight truncate">Dr D's MedCare</p>
                <p className="text-[10px] text-slate-400">Admin panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {collapsed
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              }
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={[
                  'flex items-center rounded-lg py-2 text-sm font-medium transition-all',
                  collapsed ? 'justify-center px-2' : 'gap-2.5 px-3',
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                ].join(' ')}
                style={isActive ? { background: 'rgb(var(--color-primary))' } : {}}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={handleSignOut}
            title={collapsed ? 'Sign out' : undefined}
            className={[
              'flex w-full items-center rounded-lg py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all',
              collapsed ? 'justify-center px-2' : 'gap-2.5 px-3',
            ].join(' ')}
          >
            <span className="text-base shrink-0">🚪</span>
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>

    </div>
  )
}