const cloudApp: ICloudApp = {
  package_name: "com.je.supersus",
  icon_url:
    "https://cloud.bluestacks.com/app/icon?pkg=com.je.supersus&use_cdn=true&w=300",
  game_name: "Super Sus",
  is_nowgg_login_required: true,
  cloud_app_url:
    "https://now.gg/lp/pi-productions/9433/super-sus?utm_source=now.gg-partner&utm_medium=client&utm_campaign=BlueStacksX&source=launcher",
};

const androidApp: IAndroidApp = {
  package_name: "com.wt.cryptornado.idle.rpg",
  icon_url:
    "https://cloud.bluestacks.com/app/icon?pkg=com.wt.cryptornado.idle.rpg&use_cdn=true&w=300",
  game_name: "RAID: Shadow Legends",
  action: "",
  action_value: "",
  apk_url: "",
};

const pcApp: IPcApp = {
  steam_appp_url: "https://store.steampowered.com/app/48720",
};
const configData = {
  cloudApp: JSON.stringify(cloudApp, null, 4),
  androidApp: JSON.stringify(androidApp, null, 4),
  pcApp: JSON.stringify(pcApp, null, 4),
  androidAppPure: JSON.stringify("com.wt.cryptornado.idle.rpg", null, 4),
};

export default configData;
