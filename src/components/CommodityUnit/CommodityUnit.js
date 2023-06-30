import { useState, useEffect } from 'react';
import * as commodityServices from '~/services/commodityServices';
import classNames from 'classnames/bind';

import style from "./CommodityUnit.module.scss"

export default function CommodityUnit({ value, setValue }) {
  const cx = classNames.bind(style)
  const [commodityUnits, setCommodityUnits] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await commodityServices.getCommodityUnit()
      if (result.length > 0) {
        setCommodityUnits(result)
      }
    }
    fetchApi()
  }, [])
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">---Chọn đơn vị tính---</option>
      {
        commodityUnits && commodityUnits.map((commodityUnit) => {
          return <option key={commodityUnit._id} value={commodityUnit._id}>{commodityUnit.dvt}</option>
        })
      }
    </select>
  )
}
