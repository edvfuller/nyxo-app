// Web stand-in for react-native-haptic-feedback.
export const HapticFeedbackTypes = {
  selection: 'selection',
  impactLight: 'impactLight',
  impactMedium: 'impactMedium',
  impactHeavy: 'impactHeavy',
  notificationSuccess: 'notificationSuccess',
  notificationWarning: 'notificationWarning',
  notificationError: 'notificationError'
}

const ReactNativeHapticFeedback = {
  trigger: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10)
      } catch (e) {
        // not allowed in this frame
      }
    }
  }
}

export default ReactNativeHapticFeedback
