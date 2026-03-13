'use client'

import { useEffect, useState } from 'react'

type Rule = {
  id?: number
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

type Override = {
  id?: number
  date: string
  is_available: boolean
  start_time: string | null
  end_time: string | null
  reason: string
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function timeOptions() {
  const opts: string[] = []
  for (let h = 6; h <= 22; h++) {
    opts.push(`${String(h).padStart(2, '0')}:00`)
    opts.push(`${String(h).padStart(2, '0')}:30`)
  }
  return opts
}
const TIME_OPTIONS = timeOptions()

function Badge({ children, color }: { children: React.ReactNode; color: 'green' | 'red' | 'amber' }) {
  const classes = {
    green: 'bg-green-50 text-green-700 border-green-200',
    red:   'bg-red-50 text-red-700 border-red-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  }
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${classes[color]}`}>
      {children}
    </span>
  )
}

export default function AvailabilityPage() {
  const [rules, setRules]         = useState<Rule[]>([])
  const [overrides, setOverrides] = useState<Override[]>([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [toast, setToast]         = useState<string>('')

  // New override form
  const [newDate, setNewDate]           = useState('')
  const [newIsAvailable, setNewIsAvailable] = useState(false)
  const [newStart, setNewStart]         = useState('09:00')
  const [newEnd, setNewEnd]             = useState('13:00')
  const [newReason, setNewReason]       = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/availability')
    if (res.ok) {
      const { rules: r, overrides: o } = await res.json()
      setRules(r as Rule[])
      setOverrides(o as Override[])
    }
    setLoading(false)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  // ── Weekly rules ──────────────────────────────

  function getRulesForDay(day: number) {
    return rules.filter((r) => r.day_of_week === day)
  }

  function addBlock(day: number) {
    setRules((prev) => [
      ...prev,
      { day_of_week: day, start_time: '09:00', end_time: '13:00', is_active: true },
    ])
  }

  function removeBlock(day: number, index: number) {
    let count = 0
    setRules((prev) => prev.filter((r) => {
      if (r.day_of_week !== day) return true
      if (count === index) { count++; return false }
      count++
      return true
    }))
  }

  function updateBlock(day: number, index: number, field: 'start_time' | 'end_time' | 'is_active', value: string | boolean) {
    let count = 0
    setRules((prev) => prev.map((r) => {
      if (r.day_of_week !== day) return r
      if (count === index) {
        count++
        return { ...r, [field]: value }
      }
      count++
      return r
    }))
  }

  async function saveRules() {
    setSaving(true)
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules }),
    })
    setSaving(false)
    if (!res.ok) {
      const { message } = await res.json()
      showToast('Error saving: ' + message)
      return
    }
    showToast('Weekly schedule saved ✓')
    load()
  }

  // ── Overrides ─────────────────────────────────

  async function addOverride() {
    if (!newDate) { showToast('Please select a date.'); return }
    if (newIsAvailable && (!newStart || !newEnd)) { showToast('Please set start and end time.'); return }
    if (newIsAvailable && newEnd <= newStart) { showToast('End time must be after start time.'); return }

    const res = await fetch('/api/admin/availability', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        override: {
          date: newDate,
          is_available: newIsAvailable,
          start_time: newIsAvailable ? newStart : null,
          end_time: newIsAvailable ? newEnd : null,
          reason: newReason,
        },
      }),
    })
    if (!res.ok) { const { message } = await res.json(); showToast('Error: ' + message); return }
    showToast('Override saved ✓')
    setNewDate(''); setNewReason(''); setNewIsAvailable(false)
    load()
  }

  async function deleteOverride(id: number) {
    await fetch('/api/admin/availability', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deleteId: id }),
    })
    showToast('Override removed ✓')
    load()
  }

  const inputClass = 'rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 focus:border-[rgb(var(--color-primary))] focus:bg-white focus:outline-none transition-all'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[rgb(var(--color-primary))]" />
      </div>
    )
  }

  return (
    <div className="px-8 py-8 max-w-4xl">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-lg">
          {toast}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Availability</h1>
        <p className="mt-1 text-sm text-slate-500">Set your weekly schedule and manage date-specific exceptions.</p>
      </div>

      {/* ── Weekly schedule ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-6">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">Weekly schedule</h2>
            <p className="text-xs text-slate-500 mt-0.5">Slots are auto-generated every 30 minutes within these hours.</p>
          </div>
          <button
            type="button"
            onClick={saveRules}
            disabled={saving}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'rgb(var(--color-primary))' }}
          >
            {saving ? 'Saving…' : 'Save schedule'}
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {DAYS.map((day, dayIndex) => {
            const dayRules = getRulesForDay(dayIndex)
            const hasRules = dayRules.length > 0
            return (
              <div key={day} className="flex items-start gap-4 px-6 py-4">

                {/* Day label */}
                <div className="w-24 shrink-0 pt-1">
                  <span className="text-sm font-semibold text-slate-700">{DAY_SHORT[dayIndex]}</span>
                  {!hasRules && <span className="ml-2 text-xs text-slate-400">Off</span>}
                </div>

                {/* Time blocks */}
                <div className="flex-1 space-y-2">
                  {dayRules.map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="flex items-center gap-2 flex-wrap">
                      <select
                        className={inputClass}
                        value={rule.start_time.slice(0, 5)}
                        onChange={(e) => updateBlock(dayIndex, ruleIndex, 'start_time', e.target.value)}
                      >
                        {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span className="text-xs text-slate-400">to</span>
                      <select
                        className={inputClass}
                        value={rule.end_time.slice(0, 5)}
                        onChange={(e) => updateBlock(dayIndex, ruleIndex, 'end_time', e.target.value)}
                      >
                        {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rule.is_active}
                          onChange={(e) => updateBlock(dayIndex, ruleIndex, 'is_active', e.target.checked)}
                          className="rounded border-slate-300"
                        />
                        <span className="text-xs text-slate-500">Active</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeBlock(dayIndex, ruleIndex)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addBlock(dayIndex)}
                    className="text-xs font-medium text-[rgb(var(--color-primary))] hover:opacity-70 transition-opacity"
                  >
                    + Add time block
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Date overrides ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Date exceptions</h2>
          <p className="text-xs text-slate-500 mt-0.5">Block a holiday or add availability on a day you don't normally work.</p>
        </div>

        {/* Add override form */}
        <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Add exception</p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Date</label>
              <input
                type="date"
                className={inputClass}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Type</label>
              <select
                className={inputClass}
                value={newIsAvailable ? 'available' : 'blocked'}
                onChange={(e) => setNewIsAvailable(e.target.value === 'available')}
              >
                <option value="blocked">Blocked (holiday / off)</option>
                <option value="available">Extra availability</option>
              </select>
            </div>

            {newIsAvailable && (
              <>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">From</label>
                  <select className={inputClass} value={newStart} onChange={(e) => setNewStart(e.target.value)}>
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">To</label>
                  <select className={inputClass} value={newEnd} onChange={(e) => setNewEnd(e.target.value)}>
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Note (internal)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Public holiday"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={addOverride}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
              style={{ background: 'rgb(var(--color-primary))' }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Existing overrides */}
        <div className="divide-y divide-slate-100">
          {overrides.length === 0 && (
            <p className="px-6 py-5 text-sm text-slate-400">No exceptions set.</p>
          )}
          {overrides.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-4 px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-800">
                  {new Date(o.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                {o.is_available
                  ? <Badge color="green">Extra: {o.start_time?.slice(0,5)} – {o.end_time?.slice(0,5)}</Badge>
                  : <Badge color="red">Blocked</Badge>
                }
                {o.reason && <span className="text-xs text-slate-400">{o.reason}</span>}
              </div>
              <button
                type="button"
                onClick={() => deleteOverride(o.id!)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}