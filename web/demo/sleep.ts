// Generates a month of believable sleep for the demo: bedtimes drifting
// around 23:00, 6.5 to 8.5 hours in bed, a short time to fall asleep and the
// odd awakening in the night. A fixed seed per date keeps every reload stable.
import { Night } from '@reducers/nights'
import { addMinutes, set, startOfDay, subDays } from 'date-fns'

export const DEMO_SOURCE = 'health-kit'
const SOURCE_NAME = 'Nyxo demo data'
const DAYS = 30

// Small deterministic PRNG (mulberry32) so a given date always gets the same night
const random = (seed: number) => {
  let state = seed
  return () => {
    state += 0x6d2b79f5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const between = (rand: () => number, min: number, max: number) =>
  Math.round(min + rand() * (max - min))

const sample = (
  value: Night['value'],
  start: Date,
  end: Date,
  minutes: number
): Night => ({
  id: `demo_${value}_${start.toISOString()}`,
  sourceId: DEMO_SOURCE,
  sourceName: SOURCE_NAME,
  value,
  startDate: start.toISOString(),
  endDate: end.toISOString(),
  totalDuration: minutes
})

const nightBefore = (day: Date): Night[] => {
  const dayStart = startOfDay(day)
  const rand = random(Number(dayStart.valueOf() / 86400000))
  const weekend = [0, 6].includes(day.getDay())

  // Bedtime the evening before `day`: 22:15–00:15, later on weekends
  const bedtime = addMinutes(
    set(subDays(dayStart, 1), { hours: 22, minutes: 15 }),
    between(rand, 0, 100) + (weekend ? 35 : 0)
  )
  const inBedMinutes = between(rand, 390, 510) + (weekend ? 30 : 0)
  const outOfBed = addMinutes(bedtime, inBedMinutes)

  const nights: Night[] = [sample('INBED', bedtime, outOfBed, inBedMinutes)]

  // Asleep periods, split by 0–2 short awakenings
  const fellAsleep = addMinutes(bedtime, between(rand, 6, 28))
  const wokeUp = addMinutes(outOfBed, -between(rand, 3, 15))
  const awakenings = rand() < 0.35 ? 2 : rand() < 0.6 ? 1 : 0

  let cursor = fellAsleep
  const totalAsleepSpan = (wokeUp.valueOf() - fellAsleep.valueOf()) / 60000
  for (let i = 0; i <= awakenings; i++) {
    const remaining = (wokeUp.valueOf() - cursor.valueOf()) / 60000
    const isLast = i === awakenings
    const chunk = isLast
      ? remaining
      : Math.round((totalAsleepSpan / (awakenings + 1)) * (0.7 + rand() * 0.5))
    const end = addMinutes(cursor, chunk)
    nights.push(sample('ASLEEP', cursor, end, Math.round(chunk)))
    if (!isLast) {
      const awake = between(rand, 4, 22)
      const awakeEnd = addMinutes(end, awake)
      nights.push(sample('AWAKE', end, awakeEnd, awake))
      cursor = awakeEnd
    }
  }

  return nights
}

export const generateDemoNights = (today = new Date()): Night[] => {
  const nights: Night[] = []
  for (let i = DAYS; i >= 0; i--) {
    nights.push(...nightBefore(subDays(today, i)))
  }
  return nights
}
