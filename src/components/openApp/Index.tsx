import React, { useCallback, useState } from "react";
import { SlidersOutlined } from "@ant-design/icons";

import { Button, Space, Drawer, Form, Input } from "antd";

import { useImmer } from "use-immer";
import style from "./index.module.scss";
import { qwebApi } from "../../tool/qwebApi";
import mockData from "./mock";

const OpenApp: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const [configType, setConfigType] = useState("cloudApp");

  const [config, updateConfig] = useImmer<{ [x: string]: any }>(mockData);

  //   打开游戏
  const _onOpenApp = useCallback(
    (event: string, type: string) => {
      qwebApi({
        event,
        data: JSON.parse(config[type]),
      });
    },
    [config]
  );

  //   打开游戏配置
  const _onOpenAppConfig = useCallback((type: string) => {
    setConfigType(type);
    setVisible(true);
  }, []);

  const _onSubmitSuccess = useCallback(
    (data: any) => {
      console.log(data);
      updateConfig((draft) => {
        Object.keys(data).forEach((key) => {
          draft[key] = data[key];
        });
      });
      setVisible(false);
    },
    [updateConfig]
  );

  return (
    <div className={style.container}>
      <Space size={"middle"} wrap>
        {/* cloud app */}
        <Space>
          <Button
            type="primary"
            onClick={() => _onOpenApp("openCloudGame", "cloudApp")}
          >
            Open Cloud App
          </Button>
          <Button
            shape="circle"
            icon={
              <SlidersOutlined onClick={() => _onOpenAppConfig("cloudApp")} />
            }
          />
        </Space>
        {/* android app */}
        <Space>
          <Button
            type="primary"
            onClick={() => _onOpenApp("installOrPlayAppforVm", "androidApp")}
          >
            Open Android App
          </Button>
          <Button
            shape="circle"
            icon={
              <SlidersOutlined onClick={() => _onOpenAppConfig("androidApp")} />
            }
          />
        </Space>
        {/* pc app */}
        {/* <Space>
          <Button
            type="primary"
            onClick={() => _onOpenApp("openStreamGame", "pcApp")}
          >
            Open Pc App
          </Button>
          <Button
            shape="circle"
            icon={<SlidersOutlined onClick={() => _onOpenAppConfig("pcApp")} />}
          />
        </Space> */}
      </Space>
      <Drawer
        onClose={() => setVisible(false)}
        title="Config Panel"
        width={520}
        visible={visible}
      >
        <Form
          layout="vertical"
          initialValues={config}
          onFinish={_onSubmitSuccess}
          autoComplete="off"
        >
          <Form.Item
            label="Config"
            name={configType}
            rules={[
              { required: true, message: "Please input your config data!" },
              {
                validator: (r, v) => {
                  try {
                    JSON.parse(v);
                    return Promise.resolve();
                  } catch (error) {
                    return Promise.reject();
                  }
                },
                message: "JSON data parsing error,please check the config.",
              },
            ]}
          >
            <Input.TextArea rows={20} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default OpenApp;
