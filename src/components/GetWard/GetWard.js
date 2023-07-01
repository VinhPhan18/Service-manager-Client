import React, { useState, useEffect } from 'react';
import * as locationServices from '~/services/locationService';
import classNames from 'classnames/bind';
import style from "./GetWard.module.scss"
import { useDebounce } from '~/hooks';

export default function GetWards({ value, setValue, searchValue, fitContent }) {
  const cx = classNames.bind(style)
  const [wards, setwards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState({
      q: ""
    });
    let debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    setIsLoading(true)
    const getStaffs = async () => {
      const response = await locationServices.getWards(filter)
    setwards(response)
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
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input", {fitContent:fitContent })}>
      <option value="">{isLoading ? ("Loading...") : ("---Chọn Xã---")}</option>
      {
        wards && wards.map((ward) => {
          return <option key={ward._id} value={ward._id}>{ward.name}</option>
        })
      }
    </select>
  )
}
