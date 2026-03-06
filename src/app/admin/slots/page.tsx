'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Slot = {
  id: string
  slot_date: string
  start_time: string
  end_time: string
  is_booked: boolean
  is_dummy: boolean
  is_blocked: boolean
  booking_id: string | null
}

type Rule = {
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

type Override = {
  date: string
  is_available: boolean
  start_time: string | null
  end_time: string | null
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + mins
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

function generateSlotTimes(start: string, end: string): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = []
  let current = start.slice(0, 5)
  const endStr = end.slice(0, 5)
  while (current < endStr) {
    const next = addMinutes(current, 30)
    if (next > endStr) break
    slots.push({ start: current, end: next })
    current = next
  }
  return slots
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  })
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

function getNext30Days(): string[] {
  const dates: string[] = []
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

export default function SlotsPage() {
  const [slots, setSlots]           = useState<Slot[]>([])
  const [loading, setLoading]       = useState(true)
  const [generating, setGenerating] = useState(false)
  const [toast, setToast]           = useState('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [generateDays, setGenerateDays] = useState(7)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
    loadSlots(today)
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function loadSlots(date: string) {
    setLoading(true)
    const { data } = await supabase
      .from('slots')
      .select('*')
      .eq('slot_date', date)
      .order('start_time')
    setSlots((data ?? []) as Slot[])
    setLoading(false)
  }

  async function generateSlots() {
    setGenerating(true)

    const [{ data: rules }, { data: overrides }] = await Promise.all([
      supabase.from('availability_rules').select('*').eq('is_active', true),
      supabase.from('availability_overrides').select('*'),
    ])

    const ruleList = (rules ?? []) as Rule[]
    const overrideList = (overrides ?? []) as Override[]
    const overrideMap = Object.fromEntries(overrideList.map((o) => [o.date, o]))

    const dates = getNext30Days().slice(0, generateDays)
    const toInsert: any[] = []

    for (const date of dates) {
      const dayOfWeek = new Date(date + 'T00:00:00').getDay()
      const override = overrideMap[date]

      // Blocked override — skip this date entirely
      if (override && !override.is_available) continue

      // Extra availability override
      if (override && override.is_available && override.start_time && override.end_time) {
        const slotTimes = generateSlotTimes(override.start_time, override.end_time)
        for (const { start, end } of slotTimes) {
          toInsert.push({ slot_date: date, start_time: start, end_time: end })
        }
        continue
      }

      // Normal weekly rules
      const dayRules = ruleList.filter((r) => r.day_of_week === dayOfWeek)
      for (const rule of dayRules) {
        const slotTimes = generateSlotTimes(rule.start_time, rule.end_time)
        for (const { start, end } of slotTimes) {
          toInsert.push({ slot_date: date, start_time: start, end_time: end })
        }
      }
    }

    if (toInsert.length > 0) {
      const { error } = await supabase
        .from('slots')
        .upsert(toInsert, { onConflict: 'slot_date,start_time', ignoreDuplicates: true })

      if (error) { showToast('Error: ' + error.message); setGenerating(false); return }
    }

    showToast(`Generated slots for next ${generateDays} days ✓`)
    setGenerating(false)
    loadSlots(selectedDate)
  }

  async function toggleSlotProp(slotId: string, prop: 'is_dummy' | 'is_blocked', current: boolean) {
    await supabase.from('slots').update({ [prop]: !current }).eq('id', slotId)
    loadSlots(selectedDate)
  }

  async function deleteSlot(slotId: string) {
    await supabase.from('slots').delete().eq('id', slotId)
    loadSlots(selectedDate)
  }

  const inputClass = 'rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 focus:border-[rgb(var(--color-primary))] focus:bg-white focus:outline-none transition-all'

  return (
    <div className="px-8 py-8 max-w-4xl">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-lg">
          {toast}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Slots</h1>
        <p className="mt-1 text-sm text-slate-500">Generate, view and manage individual time slots.</p>
      </div>

      {/* ── Generate slots ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-6 p-6">
        <h2 className="font-semibold text-slate-900 mb-1">Generate slots</h2>
        <p className="text-xs text-slate-500 mb-4">
          Generates 30-minute slots from your weekly schedule. Safe to run multiple times — existing slots won't be duplicated.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Generate for next</label>
            <select
              className={inputClass}
              value={generateDays}
              onChange={(e) => setGenerateDays(Number(e.target.value))}
            >
              {[7, 14, 21, 30].map((d) => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={generateSlots}
            disabled={generating}
            className="rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'rgb(var(--color-primary))' }}
          >
            {generating ? 'Generating…' : 'Generate slots'}
          </button>
        </div>
      </div>

      {/* ── View & manage by date ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 flex-wrap gap-3">
          <h2 className="font-semibold text-slate-900">Manage slots by date</h2>
          <input
            type="date"
            className={inputClass}
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); loadSlots(e.target.value) }}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-3 bg-slate-50/50 flex-wrap">
          <span className="text-xs text-slate-400 font-medium">Legend:</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-green-400" />Available</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Dummy (appears booked)</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-blue-400" />Booked</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-red-400" />Blocked</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[rgb(var(--color-primary))]" />
          </div>
        ) : slots.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-slate-400">No slots for {formatDate(selectedDate)}.</p>
            <p className="mt-1 text-xs text-slate-400">Click "Generate slots" above to create them.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {slots.map((slot) => {
              const dotColor = slot.is_booked
                ? 'bg-blue-400'
                : slot.is_blocked
                ? 'bg-red-400'
                : slot.is_dummy
                ? 'bg-amber-400'
                : 'bg-green-400'

              return (
                <div key={slot.id} className="flex items-center justify-between gap-4 px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
                    <span className="text-sm font-semibold text-slate-800 w-32">
                      {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                    </span>
                    {slot.is_booked && (
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                        Booked
                      </span>
                    )}
                    {slot.is_dummy && !slot.is_booked && (
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        Dummy
                      </span>
                    )}
                    {slot.is_blocked && (
                      <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                        Blocked
                      </span>
                    )}
                  </div>

                  {/* Actions — disabled for booked slots */}
                  {!slot.is_booked && (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleSlotProp(slot.id, 'is_dummy', slot.is_dummy)}
                        className="text-xs font-medium text-amber-600 hover:text-amber-800 transition-colors"
                      >
                        {slot.is_dummy ? 'Unmark dummy' : 'Mark dummy'}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSlotProp(slot.id, 'is_blocked', slot.is_blocked)}
                        className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
                      >
                        {slot.is_blocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSlot(slot.id)}
                        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}