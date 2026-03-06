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
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function getNext14Days(): string[] {
  const dates: string[] = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

function toIST(date: string, time: string): string {
  return `${date}T${time}:00+05:30`
}

export default function SlotStep(props: {
  durationMinutes: number
  selectedSlotId?: string
  onBack: () => void
  onNext: (slotId: string, preferredStart: string, preferredEnd: string) => void
}) {
  const dates = getNext14Days()
  const [selectedDate, setSelectedDate] = useState<string>(dates[0])
  const [slots, setSlots]               = useState<Slot[]>([])
  const [loading, setLoading]           = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  useEffect(() => {
    loadSlots(selectedDate)
  }, [selectedDate])

  async function loadSlots(date: string) {
    setLoading(true)
    setSelectedSlot(null)
    const { data } = await supabase
      .from('slots')
      .select('*')
      .eq('slot_date', date)
      .eq('is_blocked', false)
      .order('start_time')
    setSlots((data ?? []) as Slot[])
    setLoading(false)
  }

  function isPast(slot: Slot): boolean {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
    if (slot.slot_date !== today) return false
    const [h, m] = slot.start_time.split(':').map(Number)
    const now = new Date()
    const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
    return istNow.getHours() * 60 + istNow.getMinutes() >= h * 60 + m
  }

  function isAvailable(slot: Slot) {
    return !slot.is_booked && !slot.is_dummy && !isPast(slot)
  }

  function handleContinue() {
    if (!selectedSlot) return
    const start = toIST(selectedSlot.slot_date, selectedSlot.start_time.slice(0, 5))
    const end   = toIST(selectedSlot.slot_date, selectedSlot.end_time.slice(0, 5))
    props.onNext(selectedSlot.id, start, end)
  }

  const availableSlots = slots.filter(isAvailable)
  const unavailableSlots = slots.filter((s) => !isAvailable(s) && !isPast(s))

  return (
    <div className="space-y-5">

      {/* Info note */}
      <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <span className="mt-0.5 text-amber-500">ℹ️</span>
        <p className="text-sm text-amber-800 leading-relaxed">
          Select a date and available slot. Your session will be confirmed after payment proof is shared on WhatsApp.
        </p>
      </div>

      {/* Date picker */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Select a date
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {dates.map((date) => {
            const d = new Date(date + 'T00:00:00')
            const isSelected = date === selectedDate
            const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' })
            const dayNum  = d.getDate()
            const month   = d.toLocaleDateString('en-IN', { month: 'short' })

            return (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={[
                  'flex shrink-0 flex-col items-center rounded-xl border-2 px-3 py-2 transition-all duration-200 min-w-[56px]',
                  isSelected
                    ? 'text-white border-transparent shadow-md'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                ].join(' ')}
                style={isSelected ? { background: 'rgb(var(--color-primary))' } : {}}
              >
                <span className="text-[10px] font-medium opacity-80">{dayName}</span>
                <span className="text-base font-bold leading-tight">{dayNum}</span>
                <span className="text-[10px] opacity-70">{month}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Slots */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Available slots — {formatDate(selectedDate)}
        </p>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[rgb(var(--color-primary))]" />
          </div>
        ) : slots.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">No slots available on this date.</p>
            <p className="mt-1 text-xs text-slate-400">Please try another date.</p>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">All slots are booked for this date.</p>
            <p className="mt-1 text-xs text-slate-400">Please try another date.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {/* Available slots */}
            {availableSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={[
                    'rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                    isSelected
                      ? 'text-white border-transparent shadow-md'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                  ].join(' ')}
                  style={isSelected ? { background: 'rgb(var(--color-primary))' } : {}}
                >
                  {formatTime(slot.start_time)}
                </button>
              )
            })}

            {/* Unavailable slots — shown greyed out */}
            {unavailableSlots.map((slot) => (
              <div
                key={slot.id}
                className="rounded-xl border-2 border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-300 text-center cursor-not-allowed"
              >
                {formatTime(slot.start_time)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected slot confirmation */}
      {selectedSlot && (
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: 'rgb(var(--color-primary-mid))', background: 'rgb(var(--color-primary-soft) / 0.5)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))] mb-2">
            Selected slot
          </p>
          <p className="text-sm font-semibold text-slate-800">
            {formatDate(selectedSlot.slot_date)}
          </p>
          <p className="text-sm text-slate-600 mt-0.5">
            {formatTime(selectedSlot.start_time)} – {formatTime(selectedSlot.end_time)} IST
          </p>
          <p className="mt-1 text-xs text-slate-400">Duration: {props.durationMinutes} minutes</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={props.onBack}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedSlot}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-40"
          style={{ background: 'rgb(var(--color-primary))' }}
        >
          Continue →
        </button>
      </div>

    </div>
  )
}