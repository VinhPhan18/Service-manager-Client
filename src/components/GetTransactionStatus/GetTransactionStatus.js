import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import style from "./GetTransactionStatus.module.scss";
import * as transactionServices from "~/services/transactionServices";

export default function GetTransactionStatus({ value, setValue }) {
  const cx = classNames.bind(style);
  const [transactionstatusList, setTransactionStatusList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getTransactionStatus = async () => {
      const response = await transactionServices.getTransactionStatus();
      console.log(response);
      if (response) {
        setTransactionStatusList(response);
        setIsLoading(false);
      } else {
        console.log("error");
      }
    };
    getTransactionStatus();
  }, []);
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cx("input")}
    >
      <option value="">
        {isLoading ? "Loading..." : "---Chọn trạng thái---"}
      </option>
      {transactionstatusList &&
        transactionstatusList.map((transactionStatus) => {
          return (
            <option key={transactionStatus._id} value={transactionStatus._id}>
              {transactionStatus.name}
            </option>
          );
        })}
    </select>
  );
}
