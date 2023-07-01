import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import style from "./GetTransactionType.module.scss";
import * as transactionServices from "~/services/transactionServices";

export default function GetTransactionType({ value, setValue }) {
  const cx = classNames.bind(style);
  const [transactiontypeList, setTransactionTypeList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getTransactionTypes = async () => {
      const response = await transactionServices.getTransactionTypes();
      console.log(response);
      if (response) {
        setTransactionTypeList(response);
        setIsLoading(false);
      } else {
        console.log("error");
      }
    };
    getTransactionTypes();
  }, []);
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cx("input")}
    >
      <option value="">
        {isLoading ? "Loading..." : "---Chọn loại giao dịch---"}
      </option>
      {transactiontypeList &&
        transactiontypeList.map((transactionType) => {
          return (
            <option key={transactionType._id} value={transactionType._id}>
              {transactionType.name}
            </option>
          );
        })}
    </select>
  );
}
