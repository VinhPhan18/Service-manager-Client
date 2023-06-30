import React, { useState, useEffect } from 'react';
import * as staffServices from '~/services/staffServices';
import classNames from 'classnames/bind';

import style from "./GetStaff.module.scss"
import { useDebounce } from '~/hooks';

export default function GetStaff({ value, setValue, searchValue }) {
  const cx = classNames.bind(style)
  const [staffList, setStaffList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let debounced = useDebounce(searchValue, 500);

  const [filter, setFilter] = useState({
    sort: "createAdd",
    q: "",
    chucvu: null,
    tinh: null,
    phuong: null,
    xa: null,
    deleted: false,
    mini: true,
  });

  useEffect(() => {
    setIsLoading(true)
    const getStaffs = async () => {
      const response = await staffServices.getStaffs(filter)

      setStaffList(response.staffs)

      setIsLoading(false)
    }
    getStaffs()
  }, [filter])

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">{isLoading ? ("Loading...") : ("---Chọn nhân viên---")}</option>
      {
        staffList && staffList.map((staff) => {
          return <option key={staff._id} value={staff._id}>{staff.hoten}</option>
        })
      }
    </select>
  )
}
