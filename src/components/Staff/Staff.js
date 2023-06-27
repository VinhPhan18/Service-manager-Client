import { useState, useEffect } from 'react';
import * as staffServices from '~/services/staffServices';
import classNames from 'classnames/bind';

import style from "./Staff.module.scss"

export default function Staffs({ value, setValue }) {
  const cx = classNames.bind(style)
  const [staff, setStaff] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await staffServices.getStaffs()
      if (result.length > 0) {
        setStaff(result)
      }
    }
    fetchApi()
  }, [])
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">---Chọn Nhân Viên---</option>
      {
        staff && staff.map((staffs) => {
          return <option key={staffs._id} value={staffs._id}>{staffs.nhanvien}</option>
        })
      }
    </select>
  )
}
