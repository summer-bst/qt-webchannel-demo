import React, { useCallback, useState } from "react";
import { SlidersOutlined } from "@ant-design/icons";

import { Button, Space, Drawer, Form, Input, message } from "antd";

import { useImmer } from "use-immer";
import style from "./index.module.scss";
import { qwebApi } from "../../tool/qwebApi";
import mockData from "./mock";

const OpenApp: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const [configType, setConfigType] = useState("cloudApp");

  const [config, updateConfig] = useImmer<{ [x: string]: any }>(mockData);

  //   卸载游戏
  const _onUninstallApp = useCallback(
    (event: string, type: string) => {
      qwebApi({
        event,
        data: JSON.parse(config[type]),
      });
    },
    [config]
  );

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
  const _onUninstallPureApp = useCallback((value: string) => {
    if (!value) {
      message.warn("Please input package name.");
      return;
    }
    qwebApi({
      event: "uninstallApp",
      data: value,
    });
  }, []);

  return (
    <div className={style.container}>
      <Space size={"middle"} wrap>
        <Space>
          <Input.Search
            style={{ width: 500 }}
            placeholder="Input Package Name"
            allowClear
            enterButton="Open"
            size="large"
            defaultValue="com.wt.cryptornado.idle.rpg"
            onSearch={_onUninstallPureApp}
          />
        </Space>
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
