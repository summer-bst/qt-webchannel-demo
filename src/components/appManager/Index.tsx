import React, { useCallback, useEffect, useState } from "react";

import { Button, Space, notification } from "antd";

import style from "./index.module.scss";
import { qwebApi, on, off } from "../../tool/qwebApi";

const AppManager: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [installedApps, setInstalledApps] = useState<Array<string>>([]);
  // 获取已安装apps
  const _onInstalledApps = useCallback(() => {
    qwebApi({
      event: "getInstalledApps",
      callbackEvent: "updateInstalledApps",
    });
  }, []);

  // 更新回调
  const onUpdateInstalledApps = useCallback(
    (jsonObject: IInstalledAppsData) => {
      try {
        if (jsonObject) {
          api.info({
            duration: 3,
            message: `Notification Installed Apps`,
            description: JSON.stringify(jsonObject, null, 4),
            placement: "topRight",
          });
          const { action, package_name, apps } = jsonObject;
          let allApps: Array<string> = [...installedApps];
          if (action === "all") {
            if (apps) {
              allApps = apps.map((app) => app.package_name);
            }
          } else if (package_name) {
            const isExist = installedApps.includes(package_name as never);
            if (action === "install" && !isExist) {
              allApps.push(package_name);
            }
            if (action === "uninstall" && isExist) {
              allApps = allApps.filter((name) => name !== package_name);
            }
          }
          setInstalledApps(allApps);
        }
      } catch (error) {
        setInstalledApps([]);
      }
    },
    [api, installedApps]
  );
  // 监听最近游戏变化
  useEffect(() => {
    on("updateInstalledApps", onUpdateInstalledApps);
    return () => {
      off("updateInstalledApps", onUpdateInstalledApps);
    };
  }, [onUpdateInstalledApps]);

  return (
    <div className={style.container}>
      {contextHolder}
      {/* get AppManager */}
      <Space>
        <Button type="primary" onClick={_onInstalledApps}>
          Get Installed apps
        </Button>
      </Space>
      <pre className={style.preText}>
        {installedApps.length > 0
          ? JSON.stringify(installedApps, null, 4)
          : null}
      </pre>
    </div>
  );
};

export default AppManager;
