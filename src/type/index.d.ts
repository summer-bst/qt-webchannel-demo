interface ITabsItem {
  title: string;
  id: string;
  desc?: string;
}

// cloud app
interface ICloudApp {
  package_name: string;
  icon_url: string;
  game_name: string;
  cloud_app_url: string;
  is_nowgg_login_required?: boolean;
  game_play_preference: array<"cloud" | "local">;
  cloud_supported: boolean;
  ga?: any;
}

// android app
interface IAndroidApp extends ICloudApp {
  action?: string;
  section?: string;
  apk_url?: string;
}

// pc app
interface IPcApp {
  steam_appp_url: string;
}

interface IAppList {
  [index: number]: IPcApp | IAndroidApp | ICloudApp | any;
}

interface IQtParams {
  event: string;
  data?: any;
  page?: any;
  callbackEvent?: string;
}

interface IBackgroundData {
  url?: string;
  video?: string;
  playCount?: number;
}

interface IOpenBrowserData {
  url: string;
  type: 1 | 2;
}

interface IClientQueryData {
  query: string;
}

interface IInstalledAppsData {
  action?: "install" | "uninstall" | "all";
  apps?: Array<{ package_name: string }>;
  package_name?: string;
}
