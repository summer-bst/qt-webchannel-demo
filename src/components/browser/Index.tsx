import React, { useCallback, useState } from "react";

import { Input, Select, Space } from "antd";

import style from "./index.module.scss";
import { qwebApi } from "../../tool/qwebApi";
const { Option } = Select;

const Browser: React.FC = () => {
  const [linkType, setLinkType] = useState(1);

  // 获取用户信息
  const _onOpenLink = useCallback((data: IOpenBrowserData) => {
    qwebApi({
      event: "openBrowser",
      data,
    });
  }, []);

  const _onSearch = useCallback(
    (value: string) => {
      if (value) {
        _onOpenLink({ url: value, type: linkType } as IOpenBrowserData);
      }
    },
    [_onOpenLink, linkType]
  );

  return (
    <div className={style.container}>
      <Space>
        <Select
          defaultValue={linkType}
          size="large"
          style={{ width: 220 }}
          onChange={(value) => setLinkType(value)}
        >
          <Option value={1}>Open in EmbedBrowser</Option>
          <Option value={2}>Open in SystemBrowser</Option>
        </Select>
        <Input.Search
          style={{ width: 500 }}
          placeholder="input link string"
          allowClear
          enterButton="Open"
          size="large"
          onSearch={_onSearch}
        />
      </Space>
    </div>
  );
};

export default Browser;
