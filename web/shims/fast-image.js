// Web stand-in for react-native-fast-image built on the regular Image.
import React, { Component } from 'react'
import { Image } from 'react-native'

const resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center'
}

const priority = { low: 'low', normal: 'normal', high: 'high' }
const cacheControl = {
  immutable: 'immutable',
  web: 'web',
  cacheOnly: 'cacheOnly'
}

class FastImage extends Component {
  render() {
    const {
      source,
      resizeMode: mode,
      children,
      tintColor,
      ...rest
    } = this.props
    const imageSource =
      source && typeof source === 'object' && source.uri !== undefined
        ? { uri: source.uri }
        : source
    return (
      <Image
        {...rest}
        source={imageSource}
        resizeMode={mode || 'cover'}
        style={[this.props.style, tintColor ? { tintColor } : null]}>
        {children}
      </Image>
    )
  }
}

FastImage.resizeMode = resizeMode
FastImage.priority = priority
FastImage.cacheControl = cacheControl
FastImage.preload = () => undefined

export default FastImage
