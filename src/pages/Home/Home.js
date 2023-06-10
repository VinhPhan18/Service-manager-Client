import React from "react";

import classNames from "classnames/bind";
import style from "./Home.module.scss";

const cx = classNames.bind(style);

export default function Home() {
  return (
    <div className={cx("wrapper")}>
      <h1>Home</h1>
    </div>
  );
}
