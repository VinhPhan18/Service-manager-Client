import { useState, useEffect } from 'react';
import * as commodityServices from '~/services/commodityServices';
import classNames from 'classnames/bind';

import style from "./CommodityType.module.scss"

export default function CommodityType({ value, setValue }) {
  const cx = classNames.bind(style)
  const [commodityTypes, setCommodityTypes] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await commodityServices.getCommodityType()
      if (result.length > 0) {
        setCommodityTypes(result)
      }
    }
    fetchApi()
  }, [])
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">---Chọn loại hàng hóa---</option>
      {
        commodityTypes && commodityTypes.map((commodityType) => {
          return <option key={commodityType._id} value={commodityType._id}>{commodityType.loaihh}</option>
        })
      }
    </select>
  )
}
