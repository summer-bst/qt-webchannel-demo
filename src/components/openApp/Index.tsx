import React, { useCallback } from "react";

import { Button, Form, Input, Space, message } from "antd";

import style from "./index.module.scss";
import { qwebApi } from "../../tool/qwebApi";

type configData = {
  installConfig: string;
};
const installConfigData: configData = {
  installConfig: JSON.stringify(
    {
      action_value: "",
      apk_url:
        "https://cdn3.bluestacks.com/bluestacks-app-store/Internal/com.wt.cryptornado.idle.rpg/DevProvidedApk/1.8/com.wt.cryptornado.idle.rpg.apk",
      package_name: "com.wt.cryptornado.idle.rpg",
      icon_url:
        "https://cloud.bluestacks.com/app/icon?pkg=com.wt.cryptornado.idle.rpg&w=250&use_cdn=true",
      game_name: "CrypTornado for WEMIX",
      action: "InstallCDN",
    },
    null,
    4
  ),
};

const OpenApp: React.FC = () => {
  const [form] = Form.useForm();
  const _onOpenPureApp = useCallback((value: configData) => {
    if (!value.installConfig) {
      message.warn("Please input package config.");
      return;
    }
    qwebApi({
      event: "installOrPlayApp",
      data: value.installConfig,
    });
  }, []);

  const onFormat = () => {
    console.log(form.getFieldsValue());
    const values = form.getFieldsValue();
    values.installConfig = JSON.stringify(
      JSON.parse(values.installConfig),
      null,
      4
    );
    form.setFieldsValue(values);
  };

  return (
    <div className={style.container}>
      <Form
        // layout="vertical"
        initialValues={installConfigData}
        onFinish={_onOpenPureApp}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Config"
          name="installConfig"
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
          <Input.TextArea rows={15} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Install
            </Button>
            <Button type="default" onClick={onFormat}>
              Format
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OpenApp;
