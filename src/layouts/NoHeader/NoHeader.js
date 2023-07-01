import React from 'react'
import classNames from "classnames/bind";
import style from "./NoHeader.module.scss";

function NoHeader({ children }) {
  const cx = classNames.bind(style);
  return (
    <div >
      <div className={cx("wrapper")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default NoHeader;
