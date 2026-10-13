// Web-demo replacement for src/hooks/coaching/useCoaching.ts (wired up with
// an alias in web/webpack.config.js). Same exports and react-query v3
// behaviour, but coaching progress (program started, weeks started and
// completed, lessons read) is kept in this browser instead of in Nyxo Cloud,
// which needs a signed-in AWS Amplify account.
import {
  CreateCoachingDataInput,
  GetCoachingDataQuery,
  UpdateCoachingDataInput
} from '@API'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult
} from 'react-query'

export type CoachingPeriod = Exclude<
  Exclude<GetCoachingDataQuery['getCoachingData'], null>,
  null
> | null

type StoredCoaching = Omit<
  Exclude<CoachingPeriod, null>,
  'user' | 'active' | '__typename'
>

export type CoachingItems = Array<StoredCoaching>

const STORAGE_KEY = 'nyxo-demo-coaching'
let memory: StoredCoaching | undefined

const empty = (): StoredCoaching => {
  const now = new Date().toISOString()
  return {
    id: 'demo-coaching',
    userId: 'demo-user',
    stage: null,
    activeWeek: null,
    started: null,
    ended: null,
    weeks: [],
    lessons: [],
    createdAt: now,
    updatedAt: now
  }
}

const read = (): StoredCoaching => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // storage blocked: fall back to memory
  }
  return memory ?? empty()
}

const write = (coaching: StoredCoaching): StoredCoaching => {
  const next = { ...coaching, updatedAt: new Date().toISOString() }
  memory = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch (e) {
    // storage blocked: memory copy still works for this visit
  }
  return next
}

const merge = (
  input: Partial<UpdateCoachingDataInput | CreateCoachingDataInput>
): StoredCoaching => {
  const current = read()
  const defined = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  )
  return write({
    ...current,
    ...defined,
    id: current.id,
    userId: current.userId
  } as StoredCoaching)
}

export const getUserActiveCoaching = async (): Promise<CoachingPeriod> =>
  read() as CoachingPeriod

export const completeLessonMutation = async ({
  coaching
}: {
  coaching: UpdateCoachingDataInput
}): Promise<{ updateCoachingData: StoredCoaching }> => ({
  updateCoachingData: merge(coaching)
})

const listCoaching = async (): Promise<CoachingItems> => {
  const coaching = read()
  return coaching.started ? [coaching] : []
}

const useInvalidateCoaching = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries('userActiveCoaching')
    queryClient.invalidateQueries('listCoaching')
    queryClient.invalidateQueries('coaching')
  }
}

/* HOOKS */

export const useListCoaching = (): UseQueryResult<CoachingItems | null> =>
  useQuery('listCoaching', listCoaching)

export const useGetCoaching = (
  id: string
): UseQueryResult<GetCoachingDataQuery['getCoachingData']> =>
  useQuery(
    ['coaching', { id }],
    async () => read() as GetCoachingDataQuery['getCoachingData']
  )

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCreateCoaching = () => {
  const invalidate = useInvalidateCoaching()
  return useMutation(
    async ({ coaching }: { coaching: CreateCoachingDataInput }) =>
      merge({
        ...coaching,
        started: coaching.started ?? new Date().toISOString()
      }),
    { onSuccess: invalidate }
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUpdateCoaching = () => {
  const invalidate = useInvalidateCoaching()
  return useMutation(
    async ({ coaching }: { coaching: UpdateCoachingDataInput }) =>
      merge(coaching),
    { onSuccess: invalidate }
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDeleteCoaching = () => {
  const invalidate = useInvalidateCoaching()
  return useMutation(async () => write(empty()), { onSuccess: invalidate })
}

export const useGetActiveCoaching = (): UseQueryResult<CoachingPeriod | null> =>
  useQuery('userActiveCoaching', getUserActiveCoaching)
