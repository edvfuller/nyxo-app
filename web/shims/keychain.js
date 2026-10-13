// Web stand-in for react-native-keychain backed by localStorage.
// Fine for a demo; never store real secrets like this.
const PREFIX = 'nyxo-demo-keychain:'

const read = (key) => {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : false
  } catch (e) {
    return false
  }
}

const write = (key, value) => {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    // storage unavailable (private mode / sandbox); ignore
  }
}

export const ACCESSIBLE = {
  WHEN_UNLOCKED: 'WHEN_UNLOCKED',
  AFTER_FIRST_UNLOCK: 'AFTER_FIRST_UNLOCK',
  ALWAYS: 'ALWAYS'
}

export const ACCESS_CONTROL = {
  USER_PRESENCE: 'USER_PRESENCE',
  BIOMETRY_ANY: 'BIOMETRY_ANY',
  BIOMETRY_CURRENT_SET: 'BIOMETRY_CURRENT_SET',
  DEVICE_PASSCODE: 'DEVICE_PASSCODE',
  BIOMETRY_ANY_OR_DEVICE_PASSCODE: 'BIOMETRY_ANY_OR_DEVICE_PASSCODE'
}

export const setGenericPassword = async (username, password, options) => {
  write((options && options.service) || 'default', {
    username,
    password,
    service: (options && options.service) || 'default'
  })
  return true
}

export const getGenericPassword = async (options) =>
  read((options && options.service) || 'default')

export const resetGenericPassword = async (options) => {
  try {
    window.localStorage.removeItem(
      PREFIX + ((options && options.service) || 'default')
    )
  } catch (e) {
    // ignore
  }
  return true
}

export const setInternetCredentials = async (server, username, password) =>
  setGenericPassword(username, password, { service: server })
export const getInternetCredentials = async (server) =>
  getGenericPassword({ service: server })
export const resetInternetCredentials = async (server) =>
  resetGenericPassword({ service: server })

export default {
  ACCESSIBLE,
  ACCESS_CONTROL,
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
  setInternetCredentials,
  getInternetCredentials,
  resetInternetCredentials
}
