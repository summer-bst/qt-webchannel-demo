import EventEmitter from "eventemitter3";
import { QWebChannel } from "./qwebchannel";
import { assert, isQtClient, __DEV__ } from "./utils";

export const EE = new EventEmitter();

let qWebChannel = null;

const conf = {
  timeout: 10000,
};

// 页面标识符，可进行或操作-》表示qwebchannel事件往目标页面发送
export const PageType = {
  Current: 0x0000,
  Home: 0x0001,
  CloudGames: 0x0002,
  AndroidGames: 0x0004,
};

const loggerToLoConsole = (event, data, type = "request") => {
  const loggerDom = document.getElementById("loggerID");
  if (loggerDom) {
    const loggerBoxDom = document.createElement("div");
    loggerBoxDom.setAttribute("class", `logger-${type} logger`);
    const eventDom = document.createElement("h3");
    eventDom.classList = [];
    eventDom.innerHTML = `${type.toUpperCase()}:qwebApi for ====${event}====`;
    loggerBoxDom.appendChild(eventDom);
    if (data) {
      const dataDom = document.createElement("pre");
      dataDom.innerHTML = `====${event}====(${type.toUpperCase()}-Data):\n${JSON.stringify(
        data,
        null,
        4
      )}\n`;
      loggerBoxDom.appendChild(dataDom);
    }
    loggerDom.appendChild(loggerBoxDom);
    loggerDom.scrollTo({ top: 99999 });
  }
};

// 请求log
const requestLog = (event, data) => {
  try {
    if (data) {
      console.info(
        `%cRequest:qwebApi for <${event}>(Req-Data):`,
        "color:pink;font-size:18px;",
        "\n",
        data
      );
    } else {
      console.info(
        `%cRequest:qwebApi for <${event}>`,
        "color:pink;font-size:18px;"
      );
    }
    loggerToLoConsole(event, data, "request");
  } catch (error) {}
};

// 相应log
const responseLog = (response, isMock) => {
  const { _events } = EE;
  const eventKeys = Object.keys(_events);
  const { event, data } = response;
  if (eventKeys.includes(event)) {
    try {
      console.info(
        `%cResponse:qwebApi for <${event}>${isMock ? " [[MOCK-DATA]]" : ""}:`,
        "color:green;font-size:18px;",
        "\n",
        data
      );
      loggerToLoConsole(event, data, "response");
    } catch (error) {
      console.error(
        "%cqtContext.contentChanged(数据解析出错)",
        "color:red;font-size:18px;",
        "\n",
        error
      );
    }
  }
};
// console.log(EE)
export default function QWC() {
  return new Promise((resolve, reject) => {
    if (!__DEV__) {
      assert(
        window && window.qt && window.qt.webChannelTransport,
        "'qt' or 'qt.webChannelTransport' should be initialized(injected) by QtWebEngine"
      );
    }
    // 用于在浏览器端开发时，模拟 `Qt` 的注入行为
    if (!isQtClient) {
      window.qt = {
        webChannelTransport: {
          send() {
            console.log(`QWebChannel simulator activated !`);
            setTimeout(() => {
              qWebChannel.__apis__ = {
                fetchQt: ({ event, data }) => {
                  requestLog(event, data);
                  return Promise.resolve();
                },
                fetchQtCallback: (
                  { event, data, callbackEvent = `${event}_callback` },
                  { initial }
                ) => {
                  // initial表示初始数据（mock）
                  return qWebChannel.__apis__
                    .fetchQt({ event, data })
                    .then(() => {
                      responseLog(
                        { event: callbackEvent, data: initial },
                        true
                      );
                      EE.emit(callbackEvent, initial);
                      return initial;
                    });
                },
                qtContext: null,
                on: EE.on.bind(EE),
                off: EE.off.bind(EE),
                once: EE.off.bind(EE),
                emit: EE.emit.bind(EE),
              };
              resolve(qWebChannel.__apis__);
            }, 0);
          },
        },
      };
    }
    if (!qWebChannel) {
      qWebChannel = new QWebChannel(
        window.qt.webChannelTransport,
        (channel) => {
          const qtContext = channel.objects.webBridge;
          qtContext.contentChanged.connect((response) => {
            const { event, data } = response;
            responseLog({ event, data });
            EE.emit(event, data);
          });
          qWebChannel.__apis__ = {
            fetchQt: ({
              event,
              data,
              page = PageType.Current,
              callbackEvent,
            }) => {
              requestLog(event, data);
              return qtContext.dataChanged(
                JSON.stringify({ event, data, page, callbackEvent })
              );
            },
            fetchQtCallback: (
              {
                event,
                data,
                page = PageType.Current,
                callbackEvent = `${event}_callback`,
              },
              config = {}
            ) => {
              const options = { ...conf, ...config };
              return new Promise((resolve, reject) => {
                let timer = null;
                const apiHandler = (data) => {
                  clearTimeout(timer);
                  timer = null;
                  resolve(data);
                };
                EE.once(callbackEvent, apiHandler);
                if (options.timeout) {
                  timer = setTimeout(() => {
                    EE.off(callbackEvent, apiHandler);
                    reject({
                      callbackEvent,
                      msg: "Timeout",
                      time: options.timeout,
                    });
                  }, options.timeout);
                }
                qWebChannel.__apis__.fetchQt({
                  event,
                  data,
                  page,
                  callbackEvent,
                });
              });
            },
            qtContext,
            on: EE.on.bind(EE),
            off: EE.off.bind(EE),
            once: EE.off.bind(EE),
            emit: EE.emit.bind(EE),
          };
          resolve(qWebChannel.__apis__);
        }
      );
    } else {
      resolve(qWebChannel.__apis__);
    }
  });
}
