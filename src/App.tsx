import React from "react";
import { Layout, Tabs, Button, Space } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import classNames from "classnames";

import "./App.css";

import style from "./app.module.scss";
import { isQtClient } from "./tool/qwebchannel/utils";
import tabs from "./tabs";

import tabCompMap from "./components";

const { Footer, Content } = Layout;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const firstTab = tabs[0];
  return (
    <Layout
      className={classNames([
        style.container,
        { [style.isQtClient]: isQtClient },
      ])}
    >
      <Content
        style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
      >
        <Tabs defaultActiveKey={firstTab.id}>
          {tabs.map((tab) => {
            const Comp = (tabCompMap as any)[tab.id] as React.FC;
            if (!Comp) {
              return null;
            }
            return (
              <TabPane tab={tab.title} key={tab.id}>
                {<Comp />}
              </TabPane>
            );
          })}
        </Tabs>
      </Content>
      <Footer className={style.footer}>
        <h2>
          <Space>
            Logger
            <Button
              shape="circle"
              icon={<ClearOutlined />}
              onClick={() => {
                (document.getElementById("loggerID") as Element).innerHTML = "";
              }}
            />
          </Space>
        </h2>
        <div className={style.loggerInner} id="loggerID"></div>
      </Footer>
    </Layout>
  );
};

export default App;
