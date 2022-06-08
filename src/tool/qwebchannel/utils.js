export const isQtClient = (function () {
  return navigator.userAgent.includes('QtWebEngine')
})()

export function assert(condition, msg) {
  if (!condition) console.error(msg || `[ASSERT]: ${condition} is a falsy value.`)
}

export const __DEV__ = process.env.NODE_ENV === 'development'
