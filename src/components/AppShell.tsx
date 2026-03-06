'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      // Let the browser handle anchor scrolling, then clean up the hash after
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }, 100)
    }
  }, [pathname])

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}