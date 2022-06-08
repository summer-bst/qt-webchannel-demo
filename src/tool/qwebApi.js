import qwebchannel, { EE } from '@/tool/qwebchannel'
export const on = EE.on.bind(EE)
export const off = EE.off.bind(EE)
export const once = EE.once.bind(EE)
export const emit = EE.emit.bind(EE)
// 只下发
export const qwebApi = async ({ event, data, page, callbackEvent, ga }) => {
  const channel = await qwebchannel()
  return channel.fetchQt({ event, data, page, callbackEvent, ga }, {})
}
// 下发、监听、返回值
export const fetchQwebApi = async ({ event, data, page, callbackEvent, ga }, config = {}) => {
  const channel = await qwebchannel()
  return channel.fetchQtCallback({ event, data, page, callbackEvent, ga }, config)
}
