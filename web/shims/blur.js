// Web stand-in for @react-native-community/blur: a translucent view using the
// fallback colour the app already provides, plus a CSS backdrop blur.
import React, { forwardRef } from 'react'
import { View } from 'react-native'

export const BlurView = forwardRef(function BlurView(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { reducedTransparencyFallbackColor, blurType, blurAmount, style, ...rest },
  ref
) {
  const tint =
    blurType === 'dark' ? 'rgba(20, 20, 24, 0.82)' : 'rgba(255, 255, 255, 0.82)'
  return (
    <View
      ref={ref}
      style={[
        {
          backgroundColor: tint,
          backdropFilter: `blur(${Math.min(blurAmount || 10, 30)}px)`
        },
        style
      ]}
      {...rest}
    />
  )
})

export const VibrancyView = BlurView
export default BlurView
