import { useState, useEffect } from 'react';
import * as staffServices from '~/services/staffServices';
import classNames from 'classnames/bind';

import style from "./Position.module.scss"

export default function Position({ value, setValue }) {
  const cx = classNames.bind(style)
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await staffServices.getPosition()
      if (result.length > 0) {
        setPositions(result)
      }
    }
    fetchApi()
  }, [])
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">---Chọn Chức vụ---</option>
      {
        positions && positions.map((position) => {
          return <option key={position._id} value={position._id}>{position.name}</option>
        })
      }
    </select>
  )
}
