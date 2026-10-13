// Web entry point for the Nyxo demo. ./setup must stay the first import.
import './setup'
import { AppRegistry } from 'react-native'
import { DemoAppWrapper } from './DemoAppWrapper'

AppRegistry.registerComponent('Nyxo', () => DemoAppWrapper)
AppRegistry.runApplication('Nyxo', {
  rootTag: document.getElementById('root')
})
