import React from 'react'
import classNames from "classnames/bind";

import style from "./Order.module.scss"

export default function Order() {
  const cx = classNames.bind(style)

  return (
    <div className={cx("wrapper")}>
      {/* Code vào đây */}
      Order
    </div>
  )
}
