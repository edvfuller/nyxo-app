// react-native-gesture-handler for the web build. Its 1.x touchables run on
// Hammer.js gesture recognisers that don't reliably fire onPress from a mouse
// click, so use react-native-web's touchables (same props) and keep the rest
// of the library as is.
export * from 'react-native-gesture-handler/lib/module/index.js'
export {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedback as TouchableNativeFeedback
} from 'react-native'
