// Answers the app's Contentful GraphQL queries (GetWeeks, GetWeek, GetLesson)
// from the sample program in ./lessons. The response is shaped by walking
// the query's own selection set, so Apollo receives exactly the fields it
// asked for, with nulls where the sample has nothing.
import { Operation } from '@apollo/client'
import { FieldNode, OperationDefinitionNode, SelectionSetNode } from 'graphql'
import {
  additionalInformation,
  DemoHabit,
  DemoLesson,
  DemoWeek,
  introduction,
  weeks
} from './lessons'
import { toDocument } from './richText'

const covers: Record<string, string> = {
  introduction: require('./covers/introduction.svg'),
  'sleep-basics': require('./covers/sleep-basics.svg'),
  'building-a-routine': require('./covers/building-a-routine.svg'),
  'daytime-habits': require('./covers/daytime-habits.svg'),
  'quieting-the-mind': require('./covers/quieting-the-mind.svg')
}

// Every sample lesson is credited to the demo itself, so the app never falls
// back to showing a real coach as the author of text they didn't write.
const demoAuthor = {
  __typename: 'AuthorCard',
  name: 'Nyxo web demo',
  credentials: 'Sample lesson written for this demo',
  description: null,
  avatar: { __typename: 'Asset', url: require('./covers/author.svg') }
}

type Entry = { __typename: string; [key: string]: unknown }

const collection = (typename: string, items: Entry[]): Entry => ({
  __typename: typename,
  items
})

const richText = (typename: string, lines?: string[]): Entry | null =>
  lines
    ? {
        __typename: typename,
        json: toDocument(lines),
        links: {
          __typename: `${typename}Links`,
          assets: { __typename: `${typename}Assets`, block: [] }
        }
      }
    : null

const habitEntry = (habit: DemoHabit): Entry => ({
  __typename: 'Habit',
  slug: habit.slug,
  period: habit.period,
  title: habit.title,
  description: richText('HabitDescription', [habit.description])
})

const lessonEntry = (lesson: DemoLesson, coverSlug: string): Entry => ({
  __typename: 'Lesson',
  lessonName: lesson.lessonName,
  slug: lesson.slug,
  author: null,
  chronotype: null,
  weights: null,
  keywords: lesson.keywords,
  cover: { __typename: 'Asset', url: covers[coverSlug] },
  section: {
    __typename: 'Section',
    title: lesson.section.title,
    order: lesson.section.order,
    description: richText('SectionDescription', [lesson.section.description])
  },
  lessonContent: richText('LessonLessonContent', lesson.body),
  additionalInformation: richText(
    'LessonAdditionalInformation',
    lesson.extra ?? additionalInformation[lesson.slug]
  ),
  habitCollection: collection(
    'LessonHabitCollection',
    (lesson.habits ?? []).map(habitEntry)
  ),
  authorCardCollection: collection('LessonAuthorCardCollection', [demoAuthor])
})

const weekEntry = (week: DemoWeek): Entry => ({
  __typename: 'CoachingWeek',
  sys: { __typename: 'Sys', id: `demo-${week.slug}` },
  weekName: week.weekName,
  slug: week.slug,
  intro: week.intro,
  duration: week.duration,
  coverPhoto: { __typename: 'Asset', url: covers[week.slug] },
  weekDescription: richText('CoachingWeekWeekDescription', week.description),
  lessonsCollection: collection(
    'CoachingWeekLessonsCollection',
    week.lessons.map((lesson) => lessonEntry(lesson, week.slug))
  )
})

const allWeeks = weeks.map(weekEntry)
const allLessons = [
  lessonEntry(introduction, 'introduction'),
  ...weeks.flatMap((week) =>
    week.lessons.map((lesson) => lessonEntry(lesson, week.slug))
  )
]

const roots: Record<string, (slug?: string) => Entry> = {
  coachingWeekCollection: (slug) =>
    collection(
      'CoachingWeekCollection',
      allWeeks.filter((week) => !slug || week.slug === slug)
    ),
  lessonCollection: (slug) =>
    collection(
      'LessonCollection',
      allLessons.filter((lesson) => !slug || lesson.slug === slug)
    )
}

const project = (selectionSet: SelectionSetNode, value: unknown): unknown => {
  if (value === null || value === undefined) return null
  if (Array.isArray(value)) return value.map((v) => project(selectionSet, v))

  const source = value as Record<string, unknown>
  const result: Record<string, unknown> = {}
  selectionSet.selections.forEach((selection) => {
    if (selection.kind !== 'Field') return
    const field = selection as FieldNode
    const name = field.name.value
    const key = field.alias?.value ?? name
    const fieldValue = source[name]
    result[key] =
      field.selectionSet && fieldValue !== null && fieldValue !== undefined
        ? project(field.selectionSet, fieldValue)
        : fieldValue ?? null
  })
  return result
}

export const resolveDemoQuery = (
  operation: Pick<Operation, 'query' | 'variables'>
): Record<string, unknown> => {
  const definition = operation.query.definitions.find(
    (d) => d.kind === 'OperationDefinition'
  ) as OperationDefinitionNode | undefined
  const data: Record<string, unknown> = {}

  definition?.selectionSet.selections.forEach((selection) => {
    if (selection.kind !== 'Field') return
    const field = selection as FieldNode
    const resolve = roots[field.name.value]
    const key = field.alias?.value ?? field.name.value
    if (!resolve) {
      data[key] = null
      return
    }
    const root = resolve(operation.variables?.slug as string | undefined)
    data[key] = field.selectionSet ? project(field.selectionSet, root) : root
  })

  return data
}
