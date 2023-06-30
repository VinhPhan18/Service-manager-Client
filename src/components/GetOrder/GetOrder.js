import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import style from "./GetOrder.module.scss"
import { useDebounce } from '~/hooks'
import * as request from "~/utils/request";

export default function GetOrder({ value, setValue, searchValue, nhanvien, role, khachhang }) {
  const cx = classNames.bind(style)
  const [orderList, setOrderList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let debounced = useDebounce(searchValue, 1000);

  const [filter, setFilter] = useState({
    q: "",
    deleted: false,
    mini: true,
    nhanvien,
    role,
    khachhang
  });

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      khachhang: khachhang,
    }));
  }, [khachhang])

  const getOrder = async (filter) => {
    try {
      const res = await request.get("order/", {
        params: {
          q: filter.q,
          deleted: filter.deleted,
          mini: filter.mini,
          nhanvien: filter.nhanvien,
          role: filter.role,
          khachhang: filter.khachhang,
        }
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    const getCustomers = async () => {
      const response = await getOrder(filter)
      setOrderList(response.orders)

      setIsLoading(false)
    }
    getCustomers()
  }, [filter])

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">{isLoading ? ("Loading...") : ("---Chọn đơn hàng---")}</option>
      {
        orderList && orderList.map((order) => {
          return <option key={order._id} value={order._id}>{order.madh}</option>
        })
      }
    </select>
  )
}
