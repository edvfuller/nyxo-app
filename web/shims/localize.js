// Web implementation of the react-native-localize calls the app uses.
const browserLocales = () =>
  (navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'en']
  ).map((tag) => ({
    languageTag: tag,
    languageCode: tag.split('-')[0],
    countryCode: tag.split('-')[1] || '',
    isRTL: false
  }))

export const getLocales = browserLocales

export const findBestAvailableLanguage = (languageTags) => {
  for (const locale of browserLocales()) {
    if (languageTags.includes(locale.languageTag)) {
      return { languageTag: locale.languageTag, isRTL: false }
    }
    if (languageTags.includes(locale.languageCode)) {
      return { languageTag: locale.languageCode, isRTL: false }
    }
  }
  return undefined
}

export const uses24HourClock = () => true
export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone
export const addEventListener = () => undefined
export const removeEventListener = () => undefined

export default {
  getLocales,
  findBestAvailableLanguage,
  uses24HourClock,
  getTimeZone,
  addEventListener,
  removeEventListener
}
