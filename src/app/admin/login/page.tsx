'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/admin'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push(redirectTo)
  }

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[rgb(var(--color-primary))] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]/10 transition-all'

  return (
    <div className="w-full max-w-sm">

      {/* Logo / title */}
      <div className="mb-8 text-center">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white text-xl shadow-md"
          style={{ background: 'rgb(var(--color-primary))' }}
        >
          💻
        </div>
        <h1 className="text-xl font-bold text-slate-900">Dr D's MedCare</h1>
        <p className="mt-1 text-sm text-slate-500">Admin access</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500">Email</label>
          <input
            className={inputClass}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500">Password</label>
          <input
            className={inputClass}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'rgb(var(--color-primary))' }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        This page is for authorised use only.
      </p>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}
