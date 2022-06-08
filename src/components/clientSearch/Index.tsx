import React, { useCallback, useEffect, useState } from "react";

import { notification, Row, Col, Input } from "antd";

import style from "./index.module.scss";
import { qwebApi, on, off } from "../../tool/qwebApi";

import searchApps from "./mock";

const ClientSearch: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const [searchInput, setSearchInput] = useState({});
  const [gotoSearch, setGotoSearch] = useState({});

  // 更新回调
  const onClientRealSearch = useCallback(
    (jsonObject: IClientQueryData) => {
      setSearchInput(jsonObject);
      api.info({
        duration: 3,
        message: `Notification Client Real Search`,
        description: JSON.stringify(jsonObject, null, 4),
        placement: "topRight",
      });
      qwebApi({ event: "pushRealSearchResult", data: searchApps });
    },
    [api]
  );

  // client search enter listener
  const onClientGotoSearch = useCallback(
    (jsonObject: IClientQueryData) => {
      setGotoSearch(jsonObject);
      api.info({
        duration: 3,
        message: `Notification Client Goto Search`,
        description: JSON.stringify(jsonObject, null, 4),
        placement: "topRight",
      });
    },
    [api]
  );

  // 打开google play 搜索
  const _onSearchInGooglePlay = useCallback((value: string) => {
    qwebApi({
      event: "onSearchInGooglePlay",
      data: { query: value } as IClientQueryData,
    });
  }, []);
  // 监听最近游戏变化
  useEffect(() => {
    on("clientRealSearch", onClientRealSearch);
    on("clientGotoSearch", onClientGotoSearch);
    return () => {
      off("clientRealSearch", onClientRealSearch);
      off("clientGotoSearch", onClientGotoSearch);
    };
  }, [onClientRealSearch, onClientGotoSearch]);

  return (
    <div className={style.container}>
      {contextHolder}
      <Input.Search
        style={{ width: 500 }}
        placeholder="input search string"
        allowClear
        enterButton="Open Search In Google Play"
        size="large"
        onSearch={_onSearchInGooglePlay}
      />
      <Row gutter={16}>
        <Col span={12}>
          <h2>Client Search Input</h2>
          <pre className={style.preText}>
            {Object.keys(searchInput).length > 0
              ? JSON.stringify(searchInput, null, 4)
              : "----"}
          </pre>
        </Col>
        <Col span={12}>
          <h2>Client Goto Search</h2>
          <pre className={style.preText}>
            {Object.keys(gotoSearch).length > 0
              ? JSON.stringify(gotoSearch, null, 4)
              : "----"}
          </pre>
        </Col>
      </Row>
    </div>
  );
};

export default ClientSearch;
