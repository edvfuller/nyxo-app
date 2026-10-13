// Globals React Native provides that browsers don't.
if (typeof window.setImmediate === 'undefined') {
  window.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args)
  window.clearImmediate = (id) => clearTimeout(id)
}
