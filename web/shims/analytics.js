// Web stand-in for appcenter-analytics.
const Analytics = {
  trackEvent: () => Promise.resolve(),
  setEnabled: () => Promise.resolve()
}
export default Analytics
