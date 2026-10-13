// Web stand-in for react-native-device-info.
const DeviceInfo = {
  getReadableVersion: () => '0.1.0 (web demo)',
  getVersion: () => '0.1.0',
  getBuildNumber: () => 'web',
  getSystemName: () => 'Web',
  getUniqueId: () => 'web-demo',
  hasNotch: () => false
}
export default DeviceInfo
