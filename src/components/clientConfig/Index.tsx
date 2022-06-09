import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Space,
  notification,
  Col,
  Row,
  Input,
  Divider,
  message,
} from "antd";

import style from "./index.module.scss";
import { qwebApi, on, off, fetchQwebApi } from "../../tool/qwebApi";

const ClientConfig: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [language, setLanguage] = useState({});
  const [imgUrl, setImgUrl] = useState(
    "https://cdn-bgp.bluestacks.com/bgp/fullhd/com.plarium.mechlegion.jpg"
  );
  const [videoUrl, setVideoUrl] = useState(
    "https://cdn.now.gg/apps-content/com.innersloth.spacemafia/videos/desktop/among-us.mp4"
  );
  const [clientConfig, setClientConfig] = useState({});
  const [pathLocation, setPathLocation] = useState({});
  const [hostConfig, setHostConfig] = useState({});
  const [systemConfig, setSystemConfig] = useState({});
  // 获取client language
  const _onClientLanguage = useCallback(() => {
    qwebApi({ event: "getLanguage", callbackEvent: "updateLanguage" });
  }, []);

  // 获取client user config
  const _onClientUserConfig = useCallback(() => {
    qwebApi({ event: "getUserConfig", callbackEvent: "updateUserConfig" });
  }, []);

  // 获取client host config
  const _onClientHostConfig = useCallback(() => {
    const getHostConfig = async () => {
      const hostConfig = await fetchQwebApi({ event: "getHostConfig" });
      setHostConfig(hostConfig || {});
    };
    getHostConfig();
  }, []);
  // 获取client system config
  const _onClientSystemConfig = useCallback(() => {
    const getHostConfig = async () => {
      const hostConfig = await fetchQwebApi({ event: "getClientConfig" });
      setSystemConfig(hostConfig || {});
    };
    getHostConfig();
  }, []);

  // 开启loading
  const _onBeginLoading = useCallback(() => {
    qwebApi({ event: "openClientLoading" });
    setTimeout(() => {
      qwebApi({ event: "closeClientLoading" });
    }, 2000);
  }, []);

  // 关闭bootloading
  const _onCloseBootLoading = useCallback(() => {
    qwebApi({ event: "closeBootAnimation" });
  }, []);

  // 配置背景（图片、视频）
  const _onConfigBackground = useCallback((data: IBackgroundData | null) => {
    if (data) {
      document.body.style.background = "transparent";
    } else {
      document.body.style.background = "#fff";
    }
    if (data) {
      if (!data.url && !data.video) {
        message.error("Please input resource url.");
        return;
      }
    }
    qwebApi({
      event: "changeBannerBackgroundImage",
      data,
    });
  }, []);

  // 更新回调-language
  const onUpdateLanguage = useCallback(
    (jsonObject: any) => {
      try {
        if (jsonObject) {
          setLanguage(jsonObject);
          api.info({
            duration: 3,
            message: `Notification Language`,
            description: JSON.stringify(jsonObject, null, 4),
            placement: "topRight",
          });
        }
      } catch (error) {
        setLanguage({});
      }
    },
    [api]
  );
  // 更新回调-config
  const onUpdateClientConfig = useCallback(
    (jsonObject: any) => {
      try {
        if (jsonObject) {
          setClientConfig(jsonObject);
          api.info({
            duration: 3,
            message: `Notification Language`,
            description: JSON.stringify(jsonObject, null, 4),
            placement: "topRight",
          });
        }
      } catch (error) {
        setClientConfig({});
      }
    },
    [api]
  );
  // 更新回调-path location
  const onRouterTo = useCallback(
    (jsonObject: any) => {
      try {
        if (jsonObject) {
          setPathLocation(jsonObject);
          api.info({
            duration: 3,
            message: `Notification Path Location`,
            description: JSON.stringify(jsonObject, null, 4),
            placement: "topRight",
          });
        }
      } catch (error) {
        setPathLocation({});
      }
    },
    [api]
  );
  // 监听语言变化
  useEffect(() => {
    on("updateLanguage", onUpdateLanguage);
    on("updateUserConfig", onUpdateClientConfig);
    on("pageRouterTo", onRouterTo);
    return () => {
      off("updateLanguage", onUpdateLanguage);
      off("updateUserConfig", onUpdateClientConfig);
      off("pageRouterTo", onRouterTo);
    };
  }, [onUpdateLanguage, onUpdateClientConfig, onRouterTo]);

  return (
    <div className={style.container}>
      {contextHolder}
      <Space
        direction="vertical"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <Button type="primary" onClick={() => _onConfigBackground(null)}>
          Close Config Background
        </Button>
        <Input.Group compact>
          <Input
            style={{ width: "calc(100% - 200px)" }}
            allowClear={true}
            addonBefore="Background Image Url"
            defaultValue={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() =>
              _onConfigBackground({
                url: imgUrl,
              })
            }
          >
            Config Image
          </Button>
        </Input.Group>
        <Input.Group compact>
          <Input
            style={{ width: "calc(100% - 300px)" }}
            allowClear={true}
            addonBefore="Background Video Url"
            defaultValue={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() =>
              _onConfigBackground({
                video: videoUrl,
              })
            }
          >
            Config Video
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            onClick={() =>
              _onConfigBackground({
                video: videoUrl,
                playCount: 1,
              })
            }
          >
            Config Video 1 count
          </Button>
        </Input.Group>
      </Space>
      <Space wrap>
        {/* get language */}
        <Button type="primary" onClick={_onClientLanguage}>
          Get Language
        </Button>
        {/* get user config */}
        <Button type="primary" onClick={_onClientUserConfig}>
          Get Client User Config
        </Button>
        {/* get client host config */}
        <Button type="primary" onClick={_onClientHostConfig}>
          Get Client Host Config
        </Button>
        {/* get client system config */}
        <Button type="primary" onClick={_onClientSystemConfig}>
          Get Client System Config
        </Button>
        {/* loading */}
        <Button type="primary" onClick={_onBeginLoading}>
          Begin loading 2S
        </Button>
        {/* close boot loading */}
        <Button type="primary" onClick={_onCloseBootLoading}>
          Close boot loading
        </Button>
        {/* config background */}
        {/* <Button
          type="primary"
          onClick={() =>
            _onConfigBackground({
              url: imgUrl,
            })
          }
        >
          Config Background Image
        </Button> */}
        {/* config background video */}
        {/* <Button
          type="primary"
          onClick={() =>
            _onConfigBackground({
              video: videoUrl,
            })
          }
        >
          Config Background Video
        </Button> */}
        {/* config background video */}
        {/* <Button
          type="primary"
          onClick={() =>
            _onConfigBackground({
              video: videoUrl,
              playCount: 1,
            })
          }
        >
          Config Background Video Play 1 count
        </Button> */}
        {/* close config background */}
        {/* <Button type="primary" onClick={() => _onConfigBackground(null)}>
          Close Config Background
        </Button> */}
      </Space>
      <Row gutter={16}>
        <Col span={8}>
          <h2>Language</h2>
          <pre className={style.preText}>
            {Object.keys(language).length > 0
              ? JSON.stringify(language, null, 4)
              : "----"}
          </pre>
        </Col>
        <Col span={8}>
          <h2>Client User Config</h2>
          <pre className={style.preText}>
            {Object.keys(clientConfig).length > 0
              ? JSON.stringify(clientConfig, null, 4)
              : "----"}
          </pre>
        </Col>
        <Col span={8}>
          <h2>Client Host Config</h2>
          <pre className={style.preText}>
            {Object.keys(hostConfig).length > 0
              ? JSON.stringify(hostConfig, null, 4)
              : "----"}
          </pre>
        </Col>
        <Col span={8}>
          <h2>Client System Config</h2>
          <pre className={style.preText}>
            {Object.keys(systemConfig).length > 0
              ? JSON.stringify(systemConfig, null, 4)
              : "----"}
          </pre>
        </Col>
        <Col span={8}>
          <h2>Client page location</h2>
          <pre className={style.preText}>
            {Object.keys(pathLocation).length > 0
              ? JSON.stringify(pathLocation, null, 4)
              : "----"}
          </pre>
        </Col>
      </Row>
    </div>
  );
};

export default ClientConfig;
