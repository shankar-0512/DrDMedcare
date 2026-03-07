'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Booking = {
  id: string
  created_at: string
  service_type_slug: string
  plan_code: string
  preferred_start: string
  preferred_end: string
  status: string
  payment_status: string
  payment_ref: string | null
  patient_name: string
  patient_age: number | null
  patient_gender: string | null
  patient_phone: string
  patient_email: string
  patient_address: string | null
  language: string
  base_price_inr: number
  final_price_inr: number
  slot_id: string | null
}

const STATUS_COLORS: Record<string, string> = {
  pending_payment: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed:       'bg-green-50 text-green-700 border-green-200',
  completed:       'bg-slate-50 text-slate-600 border-slate-200',
  cancelled:       'bg-red-50 text-red-600 border-red-200',
}

const PAYMENT_COLORS: Record<string, string> = {
  awaiting_proof: 'bg-amber-50 text-amber-700 border-amber-200',
  received:       'bg-blue-50 text-blue-700 border-blue-200',
  verified:       'bg-green-50 text-green-700 border-green-200',
}

const SERVICE_LABELS: Record<string, string> = {
  'prescription-counselling': 'Prescription Counselling',
  'adherence-planning':       'Adherence Planning',
  'elderly-polypharmacy':     'Elderly Polypharmacy',
  'disease-awareness':        'Disease Awareness',
  'device-usage':             'Device Usage',
  'side-effects':             'Side Effects Review',
}

const PLAN_LABELS: Record<string, string> = {
  'quick_15': 'Quick Consult (15 min)',
  'full_30':  'Full Session (30 min)',
  'monthly':  'Monthly Plan',
}

function formatSlug(slug: string) {
  return SERVICE_LABELS[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function formatPlan(code: string) {
  return PLAN_LABELS[code] ?? code.replace('_', ' ')
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colorClass}`}>
      {label}
    </span>
  )
}

export default function BookingsPage() {
  const [bookings, setBookings]         = useState<Booking[]>([])
  const [loading, setLoading]           = useState(true)
  const [selected, setSelected]         = useState<Booking | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [toast, setToast]               = useState('')
  const [updating, setUpdating]         = useState(false)
  const [deleting, setDeleting]         = useState(false)
  const [paymentRef, setPaymentRef]     = useState('')

  useEffect(() => { load() }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    setBookings((data ?? []) as Booking[])
    setLoading(false)
  }

  async function updateBooking(id: string, updates: Partial<Booking>) {
    setUpdating(true)
    const { error } = await supabase.from('bookings').update(updates).eq('id', id)
    setUpdating(false)
    if (error) { showToast('Error: ' + error.message); return }
    showToast('Booking updated ✓')
    await load()
    // Refresh selected
    const updated = bookings.find((b) => b.id === id)
    if (updated) setSelected({ ...updated, ...updates })
  }

  async function cancelBooking(booking: Booking) {
    setUpdating(true)
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', booking.id)

    if (error) { showToast('Error: ' + error.message); setUpdating(false); return }

    // Free up the slot
    if (booking.slot_id) {
      await supabase
        .from('slots')
        .update({ is_booked: false, booking_id: null })
        .eq('id', booking.slot_id)
    }

    showToast('Booking cancelled and slot released ✓')
    setUpdating(false)
    await load()
    const updated = bookings.find((b) => b.id === booking.id)
    if (updated) setSelected({ ...updated, status: 'cancelled' })
  }

  async function deleteBooking(booking: Booking) {
    if (!confirm(`Delete booking for ${booking.patient_name}? This cannot be undone.`)) return
    setDeleting(true)
    if (booking.slot_id) {
      await supabase.from('slots').update({ is_booked: false, booking_id: null }).eq('id', booking.slot_id)
    }
    const { error } = await supabase.from('bookings').delete().eq('id', booking.id)
    setDeleting(false)
    if (error) { showToast('Error: ' + error.message); return }
    showToast('Booking deleted ✓')
    setSelected(null)
    await load()
  }

  async function activateMonthly(booking: Booking) {
    await updateBooking(booking.id, {
      status: 'confirmed',
      payment_status: 'verified',
      plan_code: 'monthly',
    })
    showToast('Monthly plan activated ✓')
  }

  const filtered = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter)

  const inputClass = 'rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 focus:border-[rgb(var(--color-primary))] focus:bg-white focus:outline-none transition-all'

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-lg">
          {toast}
        </div>
      )}

      {/* ── Left: booking list ── */}
      <div className="flex w-[420px] shrink-0 flex-col border-r border-slate-200 bg-white overflow-hidden">

        {/* Header */}
        <div className="border-b border-slate-100 px-5 py-4">
          <h1 className="text-lg font-bold text-slate-900">Bookings</h1>
          <div className="mt-3 flex gap-1.5 flex-wrap">
            {['all', 'pending_payment', 'confirmed', 'completed', 'cancelled'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={[
                  'rounded-full border px-3 py-0.5 text-xs font-medium transition-all',
                  statusFilter === s
                    ? 'text-white border-transparent'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300',
                ].join(' ')}
                style={statusFilter === s ? { background: 'rgb(var(--color-primary))' } : {}}
              >
                {s === 'all' ? 'All' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[rgb(var(--color-primary))]" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-5 py-8 text-sm text-slate-400">No bookings found.</p>
          ) : (
            filtered.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => { setSelected(b); setPaymentRef(b.payment_ref ?? '') }}
                className={[
                  'w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors',
                  selected?.id === b.id ? 'bg-slate-50 border-l-2' : 'border-l-2 border-transparent',
                ].join(' ')}
                style={selected?.id === b.id ? { borderLeftColor: 'rgb(var(--color-primary))' } : {}}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{b.patient_name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{formatSlug(b.service_type_slug)} · {formatPlan(b.plan_code)}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{formatDateTime(b.preferred_start)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge label={b.status.replace('_', ' ')} colorClass={STATUS_COLORS[b.status] ?? ''} />
                    <span className="text-xs font-bold text-slate-700">₹{b.final_price_inr}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Right: booking detail ── */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {!selected ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">Select a booking to view details</p>
          </div>
        ) : (
          <div className="px-8 py-8 max-w-2xl space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selected.patient_name}</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Booking #{selected.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge label={selected.status.replace('_', ' ')} colorClass={STATUS_COLORS[selected.status] ?? ''} />
                <Badge label={selected.payment_status.replace('_', ' ')} colorClass={PAYMENT_COLORS[selected.payment_status] ?? ''} />
              </div>
            </div>

            {/* Patient info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Patient</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-slate-400">Name</p><p className="font-medium text-slate-800">{selected.patient_name}</p></div>
                <div><p className="text-xs text-slate-400">Age / Gender</p><p className="font-medium text-slate-800">{selected.patient_age ?? '—'} · {selected.patient_gender ?? '—'}</p></div>
                <div><p className="text-xs text-slate-400">Phone</p><p className="font-medium text-slate-800">{selected.patient_phone}</p></div>
                <div><p className="text-xs text-slate-400">Email</p><p className="font-medium text-slate-800">{selected.patient_email || '—'}</p></div>
                <div className="col-span-2"><p className="text-xs text-slate-400">Address</p><p className="font-medium text-slate-800">{selected.patient_address || '—'}</p></div>
                <div><p className="text-xs text-slate-400">Language</p><p className="font-medium text-slate-800">{selected.language}</p></div>
              </div>
            </div>

            {/* Booking info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Session</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-slate-400">Service</p><p className="font-medium text-slate-800">{formatSlug(selected.service_type_slug)}</p></div>
                <div><p className="text-xs text-slate-400">Plan</p><p className="font-medium text-slate-800">{formatPlan(selected.plan_code)}</p></div>
                <div><p className="text-xs text-slate-400">Preferred slot</p><p className="font-medium text-slate-800">{formatDateTime(selected.preferred_start)}</p></div>
                <div><p className="text-xs text-slate-400">Amount</p><p className="text-lg font-bold text-slate-900">₹{selected.final_price_inr}</p></div>
                <div><p className="text-xs text-slate-400">Booked on</p><p className="font-medium text-slate-800">{formatDateTime(selected.created_at)}</p></div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Payment</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <select
                    className={inputClass}
                    value={selected.payment_status}
                    onChange={(e) => updateBooking(selected.id, { payment_status: e.target.value as any })}
                  >
                    <option value="awaiting_proof">Awaiting proof</option>
                    <option value="received">Received</option>
                    <option value="verified">Verified</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className={`${inputClass} flex-1`}
                    placeholder="Payment reference / UPI ID"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => updateBooking(selected.id, { payment_ref: paymentRef })}
                    disabled={updating}
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: 'rgb(var(--color-primary))' }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Actions</p>
              <div className="flex flex-wrap gap-3">

                {selected.status === 'pending_payment' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => updateBooking(selected.id, { status: 'confirmed' })}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: 'rgb(var(--color-primary))' }}
                  >
                    Confirm booking
                  </button>
                )}

                {selected.status === 'confirmed' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => updateBooking(selected.id, { status: 'completed' })}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
                  >
                    Mark completed
                  </button>
                )}

                {(selected.status === 'confirmed' || selected.status === 'completed') &&
                  selected.plan_code !== 'monthly' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => activateMonthly(selected)}
                    className="rounded-lg border px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50 text-[rgb(var(--color-primary))]"
                    style={{ borderColor: 'rgb(var(--color-primary-mid))', background: 'rgb(var(--color-primary-soft))' }}
                  >
                    Activate monthly plan
                  </button>
                )}

                {selected.status !== 'cancelled' && selected.status !== 'completed' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => cancelBooking(selected)}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition-all disabled:opacity-50"
                  >
                    Cancel booking
                  </button>
                )}

                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => deleteBooking(selected)}
                  className="rounded-lg border border-red-300 bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {deleting ? 'Deleting…' : 'Delete booking'}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}