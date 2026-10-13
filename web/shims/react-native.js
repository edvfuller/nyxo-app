// `react-native` for the web build: react-native-web plus the legacy
// prop-type exports that older libraries (react-native-calendars,
// react-native-modal) still read at import time.
import PropTypes from 'prop-types'
import * as ReactNativeWeb from 'react-native-web'

export * from 'react-native-web'

const stylePropType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array,
  PropTypes.number,
  PropTypes.bool
])

export const ViewPropTypes = { style: stylePropType }
export const ColorPropType = PropTypes.string
export const EdgeInsetsPropType = PropTypes.object
export const PointPropType = PropTypes.object

export default {
  ...ReactNativeWeb,
  ViewPropTypes,
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType
}
