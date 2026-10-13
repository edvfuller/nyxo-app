// Sample coaching program for the web demo, used when the Nyxo Contentful
// space can't be reached. The text was written for this demo; it is not
// Nyxo's own coaching content.
//
// Lesson bodies use a tiny markup that ./richText turns into Contentful
// rich-text documents:  '## heading', '- bullet', '> quote', or a paragraph.
// **bold** works inside any line.

export type DemoHabit = {
  slug: string
  title: string
  period: 'morning' | 'afternoon' | 'evening'
  description: string
}

export type DemoLesson = {
  slug: string
  lessonName: string
  keywords: string[]
  section: { title: string; order: string; description: string }
  body: string[]
  extra?: string[]
  habits?: DemoHabit[]
}

export type DemoWeek = {
  slug: string
  weekName: string
  intro: string
  duration: number
  description: string[]
  lessons: DemoLesson[]
}

export const introduction: DemoLesson = {
  slug: 'introduction',
  lessonName: 'Welcome to Nyxo coaching',
  keywords: ['coaching', 'getting started'],
  section: {
    title: 'Introduction',
    order: '0',
    description: 'How the program works'
  },
  body: [
    'Nyxo coaching is a four-week program for sleeping better. Each week has a theme, a handful of short lessons and a few habits to try.',
    '## How it works',
    '- Start a week when you are ready. Read the lessons at your own pace; most take two or three minutes.',
    '- Pick one or two habits from the lessons and practise them every day that week.',
    '- Keep an eye on your sleep clock and trend chart. Changes usually show up after one or two weeks, not overnight.',
    '## What to expect',
    'Week one explains how sleep works and how to read your own data. Week two builds a steady routine around a fixed wake-up time. Week three looks at what you do during the day: light, caffeine, exercise and naps. Week four covers the nights when your mind will not switch off.',
    '> Small, consistent changes beat big, short-lived ones. Choose habits you can keep doing.',
    'If you have had trouble sleeping for months, snore heavily or feel very sleepy during the day, talk to a doctor as well. Coaching works best alongside proper care, not instead of it.'
  ]
}

export const weeks: DemoWeek[] = [
  {
    slug: 'sleep-basics',
    weekName: 'Sleep Basics',
    intro: 'What happens while you sleep, and how to read your own sleep data.',
    duration: 7,
    description: [
      'Before changing anything, it helps to know what you are working with. This week covers how a night of sleep is built, the two systems that decide when you feel sleepy, and how to read the sleep clock in Nyxo.'
    ],
    lessons: [
      {
        slug: 'how-sleep-works',
        lessonName: 'How a night of sleep is built',
        keywords: ['sleep cycles', 'deep sleep', 'REM'],
        section: {
          title: 'Understanding sleep',
          order: '1',
          description: 'The science in plain words'
        },
        body: [
          'Sleep is not one long, even state. Through the night you move through cycles that last roughly 90 minutes, and most people go through four to six of them.',
          '## The stages',
          '- **Light sleep** makes up about half the night. Your heart rate slows and your body temperature drops.',
          '- **Deep sleep** is when the body does most of its physical repair. It is concentrated in the first half of the night.',
          '- **REM sleep** is when most vivid dreaming happens. It grows longer in the later cycles, towards the morning.',
          'Waking briefly between cycles is normal. Most of these awakenings are so short you never remember them.',
          '> Cutting a night short mostly costs you REM sleep, because so much of it comes in the final hours.'
        ],
        habits: [
          {
            slug: 'note-how-you-feel',
            title: 'Rate how rested you feel',
            period: 'morning',
            description:
              'Each morning, give yourself a score from 1 to 5 for how rested you feel. Compare it with your sleep data at the end of the week.'
          }
        ]
      },
      {
        slug: 'sleep-pressure-and-body-clock',
        lessonName: 'Sleep pressure and your body clock',
        keywords: ['circadian rhythm', 'sleep pressure', 'adenosine'],
        section: {
          title: 'Understanding sleep',
          order: '1',
          description: 'The science in plain words'
        },
        body: [
          'Two systems decide when you feel sleepy.',
          '## Sleep pressure',
          'From the moment you wake up, a chemical called adenosine slowly builds up in your brain. The longer you are awake, the stronger the pull towards sleep. Sleep clears it away again.',
          '## The body clock',
          'Your circadian rhythm is an internal clock of about 24 hours. It makes you more alert at some times of day and sleepier at others, regardless of how long you have been awake. Daylight is what keeps it in step with the world.',
          'You fall asleep most easily when both systems agree: plenty of sleep pressure, and a body clock that says it is night.',
          '> Long naps and lie-ins work against you because they release sleep pressure at the wrong time.'
        ]
      },
      {
        slug: 'reading-your-sleep-clock',
        lessonName: 'Reading your sleep clock',
        keywords: ['sleep data', 'sleep efficiency'],
        section: {
          title: 'Your data',
          order: '2',
          description: 'Making sense of the numbers'
        },
        body: [
          'The clock on the Sleep tab shows one night at a glance.',
          '- The **outer ring** is the time you spent in bed.',
          '- The **inner, filled ring** is the time you were actually asleep.',
          '- The **teal arc** is your suggested bedtime window.',
          'Below the clock, Insights show when you went to bed, fell asleep, woke up and got up.',
          '## Sleep efficiency',
          'Efficiency is the share of your time in bed that you spent asleep. Above 85% is generally considered good. If yours is much lower, you may be spending too long in bed lying awake. Week four covers what to do about that.',
          '> Look at the trend over a week or two rather than at any single night.'
        ],
        habits: [
          {
            slug: 'check-your-trend',
            title: 'Check your weekly trend',
            period: 'evening',
            description:
              'Once a week, open the Sleep Trend chart and look at how consistent your bedtimes and wake-up times were.'
          }
        ]
      }
    ]
  },
  {
    slug: 'building-a-routine',
    weekName: 'Building a Routine',
    intro: 'Anchor your days with a steady wake-up time and a calm wind-down.',
    duration: 7,
    description: [
      'Your body clock loves regularity. This week you will set a wake-up time you can keep every day, build a short routine for the last hour before bed, and check that your bedroom works for sleep.'
    ],
    lessons: [
      {
        slug: 'a-steady-wake-up-time',
        lessonName: 'A steady wake-up time',
        keywords: ['routine', 'wake-up time', 'weekends'],
        section: {
          title: 'Mornings',
          order: '1',
          description: 'Where a good night starts'
        },
        body: [
          'It sounds backwards, but a good night starts with a fixed time to get up. Getting up at the same time every day sets your body clock and builds the right amount of sleep pressure for the next evening.',
          '## Choosing your time',
          '- Pick a time you can keep on workdays **and** weekends.',
          '- Allow no more than about an hour of difference on days off.',
          '- Get up when the alarm goes, even after a poor night. That is what makes the next night better.',
          '> Bedtime is harder to control than wake-up time. Fix the morning and the evening tends to follow.'
        ],
        habits: [
          {
            slug: 'same-wake-up-time',
            title: 'Get up at the same time',
            period: 'morning',
            description:
              'Get out of bed at your chosen time every day this week, including the weekend.'
          }
        ]
      },
      {
        slug: 'winding-down',
        lessonName: 'Winding down',
        keywords: ['evening routine', 'screens', 'relaxation'],
        section: {
          title: 'Evenings',
          order: '2',
          description: 'The hour before bed'
        },
        body: [
          'You cannot switch from busy to asleep in a moment. A wind-down routine gives your mind a signal that the day is over.',
          '## Ideas for your last hour',
          '- Dim the lights in your home.',
          '- Put work, email and news away.',
          '- Do something calm and repetitive: reading, stretching, a warm shower.',
          '- Keep the order the same each night so the routine itself becomes a cue.',
          'Screens are less about the light they give off and more about how engaging they are. Endless feeds keep you alert. If you use a screen, choose something with a natural end.'
        ],
        habits: [
          {
            slug: 'dim-the-lights',
            title: 'Dim the lights an hour before bed',
            period: 'evening',
            description:
              'Turn off bright overhead lights and use lamps for the last hour of your evening.'
          },
          {
            slug: 'set-a-wind-down-alarm',
            title: 'Set a wind-down alarm',
            period: 'evening',
            description:
              'Set an alarm for an hour before bedtime. When it goes off, start your routine.'
          }
        ]
      },
      {
        slug: 'your-bedroom',
        lessonName: 'A bedroom made for sleep',
        keywords: ['bedroom', 'temperature', 'noise'],
        section: {
          title: 'Evenings',
          order: '2',
          description: 'The hour before bed'
        },
        body: [
          'Your bedroom should make sleep easy.',
          '- **Cool:** most people sleep best in a room around 16 to 19 °C.',
          '- **Dark:** blackout curtains or an eye mask help, especially in summer.',
          '- **Quiet:** earplugs or steady background noise can cover sudden sounds.',
          '- **For sleep:** try to keep work and long screen sessions out of bed, so your brain links the bed with sleeping.'
        ]
      }
    ]
  },
  {
    slug: 'daytime-habits',
    weekName: 'Daytime Habits',
    intro: 'Light, caffeine, movement and naps all shape the night ahead.',
    duration: 7,
    description: [
      'Good nights are built during the day. This week looks at the daytime habits that have the biggest effect on sleep, and how to time them.'
    ],
    lessons: [
      {
        slug: 'light-and-your-body-clock',
        lessonName: 'Light and your body clock',
        keywords: ['daylight', 'circadian rhythm'],
        section: {
          title: 'Light',
          order: '1',
          description: 'The strongest signal your body clock gets'
        },
        body: [
          'Daylight is the main signal that sets your body clock. Bright light in the morning tells your body the day has started, which makes it easier to feel sleepy in the evening.',
          '- Spend 15 to 30 minutes outside in the morning. Even an overcast day is far brighter than indoor lighting.',
          '- Keep evenings dim, as you practised last week.',
          '> Morning light and evening darkness work as a pair.'
        ],
        habits: [
          {
            slug: 'morning-daylight',
            title: 'Get morning daylight',
            period: 'morning',
            description:
              'Go outside for at least 15 minutes within two hours of waking up. A walk to work or a coffee on the balcony both count.'
          }
        ]
      },
      {
        slug: 'caffeine-and-alcohol',
        lessonName: 'Caffeine, alcohol and timing',
        keywords: ['caffeine', 'alcohol'],
        section: {
          title: 'What you consume',
          order: '2',
          description: 'Coffee, drinks and meals'
        },
        body: [
          'Caffeine blocks the sleep pressure signal. Its effect fades slowly: several hours after your coffee, a good share of the caffeine is still active.',
          '- Have your last coffee, tea or energy drink by early afternoon.',
          '- Watch for hidden caffeine in cola, chocolate and pre-workout drinks.',
          '## Alcohol',
          'Alcohol can make you drowsy, but it breaks up sleep later in the night and cuts REM sleep. If you drink, do it earlier in the evening and in moderation.'
        ],
        habits: [
          {
            slug: 'caffeine-cut-off',
            title: 'No caffeine after 2 pm',
            period: 'afternoon',
            description:
              'Switch to decaf or herbal tea after 2 pm for one week and see how your evenings feel.'
          }
        ]
      },
      {
        slug: 'naps-and-exercise',
        lessonName: 'Naps and exercise',
        keywords: ['naps', 'exercise'],
        section: {
          title: 'Movement and rest',
          order: '3',
          description: 'Using the day well'
        },
        body: [
          '## Exercise',
          'Regular physical activity is one of the most reliable ways to sleep more deeply. Any time of day helps, though very intense workouts right before bed can keep some people awake.',
          '## Naps',
          'A short nap can be refreshing, but it also uses up sleep pressure. If you nap, keep it under 30 minutes and before mid-afternoon. If you are struggling to sleep at night, skip naps altogether for now.'
        ]
      }
    ]
  },
  {
    slug: 'quieting-the-mind',
    weekName: 'Quieting the Mind',
    intro: 'What to do when your thoughts keep you awake.',
    duration: 7,
    description: [
      'Most people have nights when their mind will not switch off. This week covers practical techniques for those nights, and how to keep your progress going after the program ends.'
    ],
    lessons: [
      {
        slug: 'when-you-cannot-sleep',
        lessonName: "When you can't fall asleep",
        keywords: ['insomnia', 'stimulus control'],
        section: {
          title: 'At night',
          order: '1',
          description: 'Handling restless nights'
        },
        body: [
          'Lying in bed trying hard to sleep usually backfires. The effort keeps you alert, and your brain starts to link the bed with frustration.',
          '## If you have been awake for a while',
          '- If you have been awake for what feels like 20 minutes, get up.',
          '- Go to another room with dim light and do something calm until you feel sleepy.',
          '- Then go back to bed. Repeat if you need to.',
          '- Keep your usual wake-up time the next morning.',
          'Do not watch the clock. Turn it away from you if you need to.',
          '> The aim is to make your bed a place where you fall asleep quickly, not a place where you lie awake.'
        ]
      },
      {
        slug: 'worry-time',
        lessonName: 'Give your worries a time slot',
        keywords: ['stress', 'worry', 'journaling'],
        section: {
          title: 'During the day',
          order: '2',
          description: 'Handling worries before bedtime'
        },
        body: [
          'If your mind races at night, give your thoughts a place earlier in the day.',
          '- Set aside 15 minutes in the early evening.',
          '- Write down what is on your mind, and one next step for each item, even if the step is "decide on Friday".',
          '- Close the notebook. If the thoughts come back at night, remind yourself they have been written down and will be dealt with tomorrow.'
        ],
        habits: [
          {
            slug: 'evening-worry-list',
            title: 'Write a worry list',
            period: 'evening',
            description:
              'Spend 15 minutes in the early evening writing down what is on your mind and one next step for each item.'
          }
        ]
      },
      {
        slug: 'keeping-it-going',
        lessonName: 'Keeping it going',
        keywords: ['progress', 'routine'],
        section: {
          title: 'After the program',
          order: '3',
          description: 'Making changes stick'
        },
        body: [
          'Over these four weeks you have tried a lot of changes. Now choose the two or three that made the biggest difference and keep them.',
          '- Keep your steady wake-up time. It is the foundation for everything else.',
          '- Look at your sleep trend once a week.',
          '- If an old pattern creeps back, return to the week that covered it.',
          'Everyone has bad nights. One poor night does not undo your progress; keep your routine and the next night usually takes care of itself.'
        ]
      }
    ]
  }
]

// "Additional information" shown at the end of each lesson
export const additionalInformation: Record<string, string[]> = {
  introduction: [
    'Your progress in this demo is saved in this browser only. Clear the site data to start the program again.'
  ],
  'how-sleep-works': [
    'Sleep trackers estimate sleep stages from movement and heart rate. Treat the stage numbers as rough guides; total sleep and timing are more reliable.'
  ],
  'sleep-pressure-and-body-clock': [
    'Many people notice a dip in alertness in the early afternoon. That is the body clock, not a sign you slept badly.'
  ],
  'reading-your-sleep-clock': [
    'Tap any day in the strip at the top of the Sleep tab, or the calendar, to look at a different night.'
  ],
  'a-steady-wake-up-time': [
    'The first few days of a fixed wake-up time can feel hard. Most people adjust within a week or two.'
  ],
  'winding-down': [
    'If you share your home, agree on a "lights down" time so the whole household winds down together.'
  ],
  'your-bedroom': [
    'A warm bath or shower an hour or two before bed helps your body cool down afterwards, which can make falling asleep easier.'
  ],
  'light-and-your-body-clock': [
    'In dark winter months, a bright daylight lamp in the morning can stand in for some of the outdoor light.'
  ],
  'caffeine-and-alcohol': [
    'Some people are much more sensitive to caffeine than others. If you sleep poorly, try a two-week break from caffeine after noon and compare.'
  ],
  'naps-and-exercise': [
    'Even a 10-minute walk outside counts: it combines movement with daylight.'
  ],
  'when-you-cannot-sleep': [
    'This technique is part of cognitive behavioural therapy for insomnia (CBT-I). If sleeplessness lasts for months, a doctor can refer you to a full CBT-I program.'
  ],
  'worry-time': [
    'Keep a notebook by the bed. If a thought keeps you awake, write it down and let it wait until morning.'
  ],
  'keeping-it-going': [
    'Life events such as travel, illness or a new baby will disrupt sleep. Return to your steady wake-up time as soon as you can.'
  ]
}
