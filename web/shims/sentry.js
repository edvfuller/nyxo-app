// Web stand-in for @sentry/react-native: errors go to the console instead.
export const init = () => undefined
export const captureException = (error) => {
  // eslint-disable-next-line no-console
  console.warn('[sentry shim]', error)
}
export const captureMessage = (message) => {
  // eslint-disable-next-line no-console
  console.warn('[sentry shim]', message)
}
export const setUser = () => undefined
export const withScope = (fn) => fn({ setExtra: () => undefined })
