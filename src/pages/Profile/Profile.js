import React from 'react'
import classNames from "classnames/bind";

import style from "./Profile.module.scss"

export default function Profile() {
  const cx = classNames.bind(style)

  return (
    <div className={cx("wrapper")}>
      {/* Code vào đây */}
      Profile
    </div>
  )
}
