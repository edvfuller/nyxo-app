# Nyxo web demo

Runs the Nyxo React Native app in a desktop or phone browser through
[react-native-web](https://necolas.github.io/react-native-web/), with sample
data, so you can try the app without Xcode, Android Studio, or any of the
service keys in `docs/env-structure.md`.

## Run it

```shell
yarn install --ignore-scripts   # the postinstall step needs a .env file
yarn web                        # dev server on http://localhost:8080
yarn web:build                  # static build in web/dist
```

`web/dist` is a plain static site: `index.html` for normal hosting, and
`artifact.html`, a fragment without `<html>`/`<body>` for hosts that add their
own page shell.

## What is real and what is sample data

| Area | In the demo |
| --- | --- |
| Screens, navigation, sleep clock, charts, lessons | The app's own code from `src/` |
| Sleep data | A generated month of nights (`demo/sleep.ts`), regenerated around today on every load |
| Coaching content | Nyxo's public Contentful test space is tried first, otherwise a sample four-week program written for this demo (`demo/lessons.ts`). The Contentful path couldn't be tested while building this, so you may only ever see the sample program |
| Coaching progress | Kept in the browser's localStorage (`demo/useCoaching.ts`) instead of Nyxo Cloud |
| Subscription | Treated as active, so coaching is unlocked (`shims/purchases.js`) |
| Tracker sync, Nyxo Cloud sign-in | Not available: they need native modules, the project's own OAuth token endpoints, and an AWS Amplify backend |

## How it fits together

- `webpack.config.js`: babel with the Metro preset, the same path aliases as
  `babel.config.js`, and aliases from native-only modules to `shims/`.
- `shims/`: web stand-ins for RevenueCat, HealthKit, Keychain, app-auth,
  Sentry, App Center, blur, fast-image and so on. Each file says what it does.
- `DemoAppWrapper.tsx`: the web counterpart of `src/AppWrapper.tsx`. Same
  providers, plus the demo Contentful link and the sleep-data seed.
- `setup.js` and `styles.js`: polyfills, a phone-sized frame on wide screens,
  the app's fonts, and a few CSS rules that make browser flexbox behave like
  React Native's Yoga layout (for example `flex: 1` inside a ScrollView).

## Fixes made in `src/` along the way

These were bugs in the app itself, mostly left over from the last
"Refactor/upgrade packages" commit, so they affect the phone app too:

- `useSleep` returned hard-coded empty data, so the sleep clock and insights were always blank.
- react-query v3 upgrade leftovers: `useMutation()` destructured as an array
  (crashed the week and lesson screens) and the removed global `queryCache`.
- Every modal reducer read `action.payload.value` while callers pass a
  boolean, so no modal (calendar, sleep explanations, rating) could open.
- Settings screens were registered under different names than the ones the
  settings rows, deep links and navigation types use, so most rows did nothing.
- Lessons only opened when coaching was *locked* (inverted check).
- Smaller ones: chart axis colour and labels, sleep efficiency ratio, night
  date range, the clock edit-mode duration, the calendar backdrop and month
  change, and the sleep explanations modal (re-mounted and its values restored).
- The week query now fetches each lesson's content and author, which the
  lesson list already read (reading time showed 0 and every lesson fell back
  to a hard-coded author).

## Known gaps (also present in the phone app)

- Habit tracking: the habit reducer was removed from the store in March 2021
  and the habit screen is not in any navigator, so "Add habit" in lessons fails.
- Saving a manually added night only closes edit mode; the save call is commented out.
- The Jest suite does not start: `jest.config.js` doesn't transform
  `@react-native/polyfills`, and `jest-setup.js` mocks a React Native path
  that moved in 0.64.
- In the browser the day strip opens on yesterday rather than today.
