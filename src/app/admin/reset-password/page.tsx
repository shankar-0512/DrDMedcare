'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenHash = searchParams.get('token_hash')

  const [verified, setVerified]   = useState(false)
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setVerified(true)
    })
  }, [])

  async function handleVerify() {
    setError('')

    if (!tokenHash) {
      setError('This reset link is invalid or incomplete.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' })
    setLoading(false)

    if (error) {
      setError('This reset link has expired or already been used. Request a new one from the login page.')
      return
    }

    setVerified(true)
  }

  async function handleSubmit() {
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setDone(true)
    setTimeout(() => router.push('/admin/login'), 2000)
  }

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[rgb(var(--color-primary))] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]/10 transition-all'

  return (
    <div className="w-full max-w-sm">

      <div className="mb-8 text-center">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white text-xl shadow-md"
          style={{ background: 'rgb(var(--color-primary))' }}
        >
          💻
        </div>
        <h1 className="text-xl font-bold text-slate-900">Dr D's MedCare</h1>
        <p className="mt-1 text-sm text-slate-500">Set a new password</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {done ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Password updated. Redirecting to login…
          </div>
        ) : !verified ? (
          <>
            <p className="text-sm text-slate-500">
              Click below to verify your reset link and continue.
            </p>
            <button
              type="button"
              onClick={handleVerify}
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'rgb(var(--color-primary))' }}
            >
              {loading ? 'Verifying…' : 'Verify and continue'}
            </button>
          </>
        ) : (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">New password</label>
              <input
                className={inputClass}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Confirm password</label>
              <input
                className={inputClass}
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'rgb(var(--color-primary))' }}
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </>
        )}
      </div>

    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  )
}
