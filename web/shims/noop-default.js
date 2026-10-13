// Generic stand-in for native modules that have no web equivalent.
const noop = () => undefined
const handler = {
  get: (_, prop) => (prop === '__esModule' ? false : noop)
}
const stub = new Proxy({}, handler)

export const hide = noop
export const show = noop
export default stub
