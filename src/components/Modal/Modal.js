import React, { memo, useEffect } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

import style from "./Modal.module.scss";

function Modal({ closeModal, children }) {
  const cx = classNames.bind(style);
  const handleKeyPress = (event) => {
    if (event.keyCode === 27) {
      closeModal(false)
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={cx("wrapper")}
    >
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <div className={cx("overlay")} onClick={() => closeModal(false)}></div>
    </motion.div>
  );
}

export default memo(Modal);