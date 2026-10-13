// Web stand-in for expo-web-browser.
export const openBrowserAsync = async (url) => {
  window.open(url, '_blank', 'noopener')
  return { type: 'opened' }
}
export const openAuthSessionAsync = async () => ({ type: 'cancel' })
export const dismissBrowser = () => undefined
export default { openBrowserAsync, openAuthSessionAsync, dismissBrowser }
