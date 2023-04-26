import React, { useCallback, useEffect, useState } from "react";

import { Button, Input, Space, notification } from "antd";

import style from "./index.module.scss";
import { qwebApi, on, off } from "../../tool/qwebApi";

const AppManager: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [installedApps, setInstalledApps] = useState<Array<string>>([]);

  const [width, setWidth] = useState<number>(900);
  const [height, setHeight] = useState<number>(600);
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

  const _settingSize = () => {
    qwebApi({
      event: "setWindowSize",
      data: {
        width,
        height,
      },
    });
  };

  return (
    <div className={style.container}>
      {contextHolder}
      {/* get AppManager */}
      <Space>
        <Button type="primary" onClick={_onInstalledApps}>
          Get Installed apps
        </Button>
      </Space>
      <div style={{marginTop:'20px'}}>
      <Space>
        <Input
          allowClear={true}
          addonBefore="Width"
          defaultValue={900}
          onChange={(e) => setWidth(parseInt(e.target.value))}
        />
        <Input
          allowClear={true}
          addonBefore="Height"
          defaultValue={600}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
        <Button type="primary" onClick={_settingSize}>
          Setting Size
        </Button>
      </Space>
      </div>
      <pre className={style.preText}>
        {installedApps.length > 0
          ? JSON.stringify(installedApps, null, 4)
          : null}
      </pre>
    </div>
  );
};

export default AppManager;
