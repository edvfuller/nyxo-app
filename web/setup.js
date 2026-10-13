// Runs before any app module is evaluated (see index.js).
//
// The app sizes a lot of things from Dimensions.get('window') at import time
// (the sleep clock, cards, carousels). On a desktop browser that would be the
// whole window, so the demo renders inside a phone-sized frame and reports the
// frame's size instead.
import './polyfills'
import { Dimensions } from 'react-native'
import 'react-native-get-random-values'
import 'react-native-gesture-handler'
import { mountDemoPanel } from './panel'
import { injectStyles } from './styles'

const PHONE = { width: 390, height: 844 }

export const isNarrowScreen = () => window.innerWidth <= 520

const frameSize = () =>
  isNarrowScreen()
    ? { width: window.innerWidth, height: window.innerHeight }
    : PHONE

const originalGet = Dimensions.get.bind(Dimensions)
Dimensions.get = (dimension) => {
  const real = originalGet(dimension)
  return { ...real, ...frameSize() }
}

injectStyles()
mountDemoPanel()
