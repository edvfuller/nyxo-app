// Replacement for react-native-web's Modal/ModalPortal. The original mounts
// modals on document.body, which puts them outside the demo's phone frame;
// this one mounts them inside #device (whose transform makes it the
// containing block for the modal's fixed positioning).
import * as React from 'react'
import ReactDOM from 'react-dom'

const host = () => document.getElementById('device') || document.body

function ModalPortal({ children }) {
  const elementRef = React.useRef(null)

  if (typeof document !== 'undefined' && !elementRef.current) {
    const element = document.createElement('div')
    host().appendChild(element)
    elementRef.current = element
  }

  React.useEffect(
    () => () => {
      const element = elementRef.current
      if (element && element.parentNode) {
        element.parentNode.removeChild(element)
      }
      elementRef.current = null
    },
    []
  )

  return elementRef.current
    ? ReactDOM.createPortal(children, elementRef.current)
    : null
}

export default ModalPortal
