// Web stand-in for react-native-background-fetch.
const BackgroundFetch = {
  configure: () => Promise.resolve(0),
  finish: () => undefined,
  start: () => Promise.resolve(0),
  stop: () => Promise.resolve(),
  status: (callback) => callback && callback(0),
  FETCH_RESULT_NEW_DATA: 0,
  STATUS_AVAILABLE: 2,
  NETWORK_TYPE_ANY: 1
}
export default BackgroundFetch
