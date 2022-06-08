import React, { useCallback, useEffect, useState } from "react";

import { Button, Space, notification } from "antd";

import style from "./index.module.scss";
import { qwebApi, on, off } from "../../tool/qwebApi";

const UserInfo: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [userInfo, setUserInfo] = useState({});
  // 获取用户信息
  const _onGetUserInfo = useCallback(() => {
    qwebApi({
      event: "getUserToken",
      callbackEvent: "updateUserToken",
    });
  }, []);

  // 触发登录
  const _onTriggerLogin = useCallback(() => {
    qwebApi({ event: "callClientToLogin" });
  }, []);

  // 刷新token
  const _onRefreshLogin = useCallback(() => {
    qwebApi({ event: "refreshAccessToken" });
  }, []);

  // 更新回调
  const onUpdateUserToken = useCallback(
    (jsonObject: any) => {
      try {
        if (jsonObject) {
          setUserInfo(jsonObject);
          api.info({
            duration: 3,
            message: `Notification User Info`,
            description: JSON.stringify(jsonObject, null, 4),
            placement: "topRight",
          });
        }
      } catch (error) {
        setUserInfo({});
      }
    },
    [api]
  );
  // 监听最近游戏变化
  useEffect(() => {
    on("updateUserToken", onUpdateUserToken);
    return () => {
      off("updateUserToken", onUpdateUserToken);
    };
  }, [onUpdateUserToken]);

  return (
    <div className={style.container}>
      {contextHolder}
      <Space size={"middle"}>
        {/* get UserInfo */}
        <Space>
          <Button type="primary" onClick={_onGetUserInfo}>
            Get Userinfo
          </Button>
        </Space>
        {/* trigger Login */}
        <Space>
          <Button type="primary" onClick={_onTriggerLogin}>
            Trigger Login
          </Button>
        </Space>
        {/* refresh token */}
        <Space>
          <Button type="primary" onClick={_onRefreshLogin}>
            Refresh Token
          </Button>
        </Space>
      </Space>
      <pre className={style.preText}>
        {Object.keys(userInfo).length > 0
          ? JSON.stringify(userInfo, null, 4)
          : null}
      </pre>
    </div>
  );
};

export default UserInfo;
