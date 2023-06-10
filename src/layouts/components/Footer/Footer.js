import React from 'react'
import classNames from "classnames/bind";

import style from "./Footer.module.scss"

export default function Footer() {
  const cx = classNames.bind(style)
  return (
    <div className={cx("wrapper")}>
      <div className="footer-content">
        
      </div>
    </div>
  )
}
