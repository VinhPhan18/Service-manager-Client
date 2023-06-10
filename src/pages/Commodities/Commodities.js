import React from 'react'
import classNames from "classnames/bind";

import style from "./Commodities.module.scss"

export default function Commodities() {
  const cx = classNames.bind(style)

  return (
    <div className={cx("wrapper")}>
      {/* Code vào đây */}
      Commodities
    </div>
  )
}
