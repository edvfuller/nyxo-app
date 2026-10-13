// Wraps react-native-web's ScrollViewBase to tag every scroll container with
// data-scrollview, so web/styles.js can target ScrollViews in production
// builds too (react-native-web's class names are hashed there).
import React, { forwardRef } from 'react'
import ScrollViewBase from 'react-native-web/dist/exports/ScrollView/ScrollViewBase.js'

const TaggedScrollViewBase = forwardRef(function TaggedScrollViewBase(
  props,
  ref
) {
  return (
    <ScrollViewBase
      {...props}
      ref={ref}
      dataSet={{ ...props.dataSet, scrollview: 'true' }}
    />
  )
})

export default TaggedScrollViewBase
