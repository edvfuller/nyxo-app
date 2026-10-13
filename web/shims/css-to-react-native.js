// styled-components/native turns the `flex: <n>` shorthand into
// flexGrow/flexShrink/flexBasis following CSS rules, while React Native
// (Yoga) gives the shorthand its own meaning. In a browser the CSS version
// collapses elements that render fine on a phone, so map it back:
//
//   flex: 1   -> grow, basis 0%   (0px would collapse inside a ScrollView;
//                                  react-native-web uses 0% for StyleSheet too)
//   flex: 0   -> no grow, no shrink, sized by content (Yoga's meaning)
//   flex: -1  -> no grow, may shrink, sized by content (Yoga's meaning)
import transform, {
  getPropertyName,
  getStylesForProperty,
  transformRawValue
} from 'css-to-react-native/index.js'

const fromFlexShorthand = (style) =>
  style && style.flexBasis === 0 && style.flexShrink === 1

const toYogaFlex = (style) => {
  if (!fromFlexShorthand(style)) return style
  if (style.flexGrow > 0) return { ...style, flexBasis: '0%' }
  if (style.flexGrow === 0) {
    return { ...style, flexShrink: 0, flexBasis: 'auto' }
  }
  if (style.flexGrow < 0) {
    return { ...style, flexGrow: 0, flexShrink: 1, flexBasis: 'auto' }
  }
  return style
}

export { getPropertyName, getStylesForProperty, transformRawValue }

export default function transformDeclPairs(declPairs, shorthandBlacklist) {
  return toYogaFlex(transform(declPairs, shorthandBlacklist))
}
