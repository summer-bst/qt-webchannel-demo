import React, { useCallback, useEffect, useState } from "react";
import { MinusOutlined, CloseOutlined, FullscreenOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Button, Space, notification } from "antd";

import style from "./index.module.scss";
import { qwebApi, on, off } from "../../tool/qwebApi";

const Header: React.FC = () => {
    // closeWindow  关闭窗口
    // miniWindow    最小化窗口
    // maxWindow    最大化窗口
    // restoreWindow 恢复窗口大小

    const _onMinWindow = useCallback(() => {
        qwebApi({ event: "miniWindow" });
    }, []);
    const _onRestoreWindow = useCallback(() => {
        qwebApi({ event: "restoreWindow" });
    }, []);
    const _onMaxWindow = useCallback(() => {
        qwebApi({ event: "maxWindow" });
    }, []);
    const _onCloseWindow = useCallback(() => {
        qwebApi({ event: "closeWindow" });
    }, []);
  return (
    <div className={style.container}>
      <div title={"minimize window"} className={style.item} onClick={_onMinWindow}><MinusOutlined /></div>
      <div title={"restore window"} className={style.item} onClick={_onRestoreWindow}><ShrinkOutlined /></div>
      <div title={"maximize window"} className={style.item} onClick={_onMaxWindow}><FullscreenOutlined /></div>
      <div title={"close window"} className={style.item} onClick={_onCloseWindow}><CloseOutlined /></div>
    </div>
  );
};

export default Header;
