const cloudApp: ICloudApp = {
  package_name: "com.je.supersus",
  icon_url:
    "https://cloud.bluestacks.com/app/icon?pkg=com.je.supersus&use_cdn=true&w=300",
  game_name: "Super Sus",
  is_nowgg_login_required: true,
  game_play_preference: ["cloud"],
  cloud_supported: true,
  cloud_app_url:
    "https://now.gg/lp/pi-productions/9433/super-sus?utm_source=now.gg-partner&utm_medium=client&utm_campaign=BlueStacksX&source=launcher",
};

const androidApp: IAndroidApp = {
  package_name: "com.plarium.raidlegends",
  icon_url:
    "https://cloud.bluestacks.com/app/icon?pkg=com.plarium.raidlegends&use_cdn=true&w=300",
  game_name: "RAID: Shadow Legends",
  is_nowgg_login_required: true,
  game_play_preference: ["local"],
  cloud_supported: false,
  action: "",
  apk_url: "",
  section: "",
  cloud_app_url:
    "https://now.gg/lp/plarium/6886/raid-legends?utm_source=now.gg-partner&utm_medium=client&utm_campaign=BlueStacksX&source=launcher",
};

const pcApp: IPcApp = {
  steam_appp_url: "https://store.steampowered.com/app/48720",
};
const configData = {
  cloudApp: JSON.stringify(cloudApp, null, 4),
  androidApp: JSON.stringify(androidApp, null, 4),
  pcApp: JSON.stringify(pcApp, null, 4),
  androidAppPure: JSON.stringify("com.plarium.raidlegends", null, 4),
};

export default configData;
