// Web stand-in for react-native-app-auth. The tracker OAuth flows (Fitbit,
// Oura, Withings, Polar, Google Fit) need native redirect handling and the
// project's own token endpoints, so they are disabled in the web demo.
const unavailable = () =>
  Promise.reject(
    new Error('Connecting sleep trackers is not available in the web demo')
  )

export const authorize = unavailable
export const refresh = unavailable
export const revoke = () => Promise.resolve()
export const prefetchConfiguration = () => Promise.resolve()

export default { authorize, refresh, revoke, prefetchConfiguration }
