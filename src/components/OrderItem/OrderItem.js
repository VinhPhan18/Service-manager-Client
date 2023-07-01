import { useState, useEffect } from 'react';
import * as orderServices from '~/services/orderServices';
import classNames from 'classnames/bind';

import style from "./OrderItem.module.scss"

export default function OrderItem({ value, setValue }) {
  const cx = classNames.bind(style)
  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await orderServices.getOrderItem()
      if (result > 0) {
        setOrderItems(result)
      }
    }
    fetchApi()
  }, [])
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">---Chọn hàng hóa---</option>
      {
        orderItems && orderItems.map((orderItem) => {
          return <option key={orderItem._id} value={orderItem._id}>{orderItem.hanghoa}</option>
        })
      }
    </select>
  )
}
