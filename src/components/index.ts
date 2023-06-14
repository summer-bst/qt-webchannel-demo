import OpenApp from "./openApp/Index";
import UserInfo from "./userInfo/Index";
import ClientConfig from "./clientConfig/Index";
import Browser from "./browser/Index";
import ClientSearch from "./clientSearch/Index";
import AppManager from "./appManager/Index";
import UninstallApp from "./uninstallApp/Index";

const compMap = {
  openApp: OpenApp,
  userInfo: UserInfo,
  clientConfig: ClientConfig,
  browser: Browser,
  clientSearch: ClientSearch,
  appManager: AppManager,
  uninstallApp: UninstallApp,
};

export default compMap;
