'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Booking = {
  id: string
  patient_name: string
  service_type_slug: string
  plan_code: string
  preferred_start: string
  status: string
  payment_status: string
  final_price_inr: number
}

type Slot = {
  id: string
  start_time: string
  end_time: string
  is_booked: boolean
  is_dummy: boolean
  is_blocked: boolean
}

type StatCard = {
  label: string
  value: string | number
  sub?: string
  icon: string
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

const STATUS_COLORS: Record<string, string> = {
  pending_payment: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed:       'bg-green-50 text-green-700 border-green-200',
  completed:       'bg-slate-50 text-slate-600 border-slate-200',
  cancelled:       'bg-red-50 text-red-600 border-red-200',
}

export default function AdminDashboard() {
  const [todayBookings, setTodayBookings]   = useState<Booking[]>([])
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [todaySlots, setTodaySlots]         = useState<Slot[]>([])
  const [stats, setStats]                   = useState({ total: 0, confirmed: 0, revenue: 0, pending: 0 })
  const [loading, setLoading]               = useState(true)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)

    const [bookingsRes, slotsRes] = await Promise.all([
      fetch('/api/admin/bookings'),
      fetch(`/api/admin/slots?date=${today}`),
    ])

    const { bookings: allBookings } = bookingsRes.ok ? await bookingsRes.json() : { bookings: [] }
    const { slots: tSlots }         = slotsRes.ok   ? await slotsRes.json()    : { slots: [] }

    const all   = (allBookings ?? []) as Booking[]
    const slots = (tSlots ?? [])      as Slot[]

    const todayB = all.filter((b) => {
      const d = new Date(b.preferred_start).toISOString().split('T')[0]
      return d === today
    })

    const pending = all.filter((b) => b.status === 'pending_payment')

    const confirmed = all.filter((b) => b.status === 'confirmed' || b.status === 'completed')
    const revenue = confirmed.reduce((sum, b) => sum + (b.final_price_inr ?? 0), 0)

    setTodayBookings(todayB)
    setPendingBookings(pending)
    setTodaySlots(slots)
    setStats({
      total: all.length,
      confirmed: confirmed.length,
      revenue,
      pending: pending.length,
    })
    setLoading(false)
  }

  const statCards: StatCard[] = [
    { icon: '📋', label: 'Total bookings',    value: stats.total,     sub: 'All time' },
    { icon: '✅', label: 'Confirmed',          value: stats.confirmed, sub: 'All time' },
    { icon: '⏳', label: 'Pending payment',    value: stats.pending,   sub: 'Action needed' },
    { icon: '💰', label: 'Revenue confirmed',  value: `₹${stats.revenue.toLocaleString('en-IN')}`, sub: 'All time' },
  ]

  const availableToday = todaySlots.filter((s) => !s.is_booked && !s.is_blocked && !s.is_dummy).length
  const bookedToday    = todaySlots.filter((s) => s.is_booked).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[rgb(var(--color-primary))]" />
      </div>
    )
  }

  return (
    <div className="px-8 py-8 max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="mt-0.5 text-xs font-medium text-slate-600">{s.label}</div>
            {s.sub && <div className="mt-0.5 text-[10px] text-slate-400">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Today's slots summary */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">Today's slots</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {bookedToday} booked · {availableToday} available · {todaySlots.length} total
            </p>
          </div>
          <Link
            href="/admin/slots"
            className="text-xs font-medium text-[rgb(var(--color-primary))] hover:opacity-70 transition-opacity"
          >
            Manage slots →
          </Link>
        </div>

        {todaySlots.length === 0 ? (
          <div className="px-6 py-6 text-center">
            <p className="text-sm text-slate-400">No slots generated for today.</p>
            <Link
              href="/admin/slots"
              className="mt-2 inline-block text-xs font-medium text-[rgb(var(--color-primary))] hover:opacity-70"
            >
              Generate slots →
            </Link>
          </div>
        ) : (
          <div className="px-6 py-4 flex flex-wrap gap-2">
            {todaySlots.map((slot) => {
              const bg = slot.is_booked
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : slot.is_blocked
                ? 'bg-red-50 border-red-200 text-red-400'
                : slot.is_dummy
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-green-50 border-green-200 text-green-700'

              return (
                <span
                  key={slot.id}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${bg}`}
                >
                  {formatTime(slot.start_time)}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* Pending payment — needs action */}
      {pendingBookings.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-100 px-6 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Awaiting confirmation</h2>
              <p className="text-xs text-slate-500 mt-0.5">{pendingBookings.length} booking{pendingBookings.length > 1 ? 's' : ''} pending payment verification</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-medium text-[rgb(var(--color-primary))] hover:opacity-70 transition-opacity"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-amber-100">
            {pendingBookings.slice(0, 5).map((b) => (
              <Link
                key={b.id}
                href="/admin/bookings"
                className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-amber-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{b.patient_name}</p>
                  <p className="text-xs text-slate-500">{b.service_type_slug} · {formatDateTime(b.preferred_start)}</p>
                </div>
                <span className="text-sm font-bold text-slate-700 shrink-0">₹{b.final_price_inr}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Today's sessions */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">Today's sessions</h2>
            <p className="text-xs text-slate-500 mt-0.5">{todayBookings.length} session{todayBookings.length !== 1 ? 's' : ''} scheduled</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-medium text-[rgb(var(--color-primary))] hover:opacity-70 transition-opacity"
          >
            View all →
          </Link>
        </div>

        {todayBookings.length === 0 ? (
          <p className="px-6 py-6 text-sm text-slate-400 text-center">No sessions scheduled for today.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {todayBookings.map((b) => (
              <Link
                key={b.id}
                href="/admin/bookings"
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ background: 'rgb(var(--color-primary))' }}
                  >
                    {new Date(b.preferred_start).getHours() % 12 || 12}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{b.patient_name}</p>
                    <p className="text-xs text-slate-500">
                      {formatDateTime(b.preferred_start)} · {b.service_type_slug}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[b.status] ?? ''}`}>
                  {b.status.replace('_', ' ')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}