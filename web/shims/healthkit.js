// Web stand-in for react-native-healthkit. HealthKit only exists on iOS, so
// every call reports that it is unavailable.
const unavailable = (_options, callback) =>
  callback && callback('HealthKit is not available on web', null)

const AppleHealthKit = {
  Constants: {
    Permissions: { SleepAnalysis: 'SleepAnalysis' }
  },
  initHealthKit: unavailable,
  isAvailable: (callback) => callback && callback(null, false),
  getSleepSamples: unavailable
}

export default AppleHealthKit
