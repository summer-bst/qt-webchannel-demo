import qwebchannel, { EE } from "./qwebchannel";
export const on = EE.on.bind(EE);
export const off = EE.off.bind(EE);
export const once = EE.once.bind(EE);
export const emit = EE.emit.bind(EE);
// 只下发
export const qwebApi = async (params: IQtParams) => {
  const channel = await qwebchannel();
  return channel.fetchQt(params, {});
};
// 下发、监听、返回值
export const fetchQwebApi = async (params: IQtParams, config = {}) => {
  const channel = await qwebchannel();
  return channel.fetchQtCallback(params, config);
};
