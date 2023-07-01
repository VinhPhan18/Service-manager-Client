import React, { useState, useEffect } from 'react';
import * as locationServices from '~/services/locationService';
import classNames from 'classnames/bind';
import style from "./GetDistrict.module.scss"
import { useDebounce } from '~/hooks';

export default function GetDistricts({ value, setValue, searchValue, fitContent }) {
  const cx = classNames.bind(style)
  const [districts, setdistricts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState({
      q: ""
    });
    let debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    setIsLoading(true)
    const getStaffs = async () => {
      const response = await locationServices.getDistricts(filter)
    setdistricts(response)
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
      <option value="">{isLoading ? ("Loading...") : ("--- Chọn Quận Huyện---")}</option>
      {
        districts && districts.map((district) => {
          return <option key={district._id} value={district._id}>{district.name}</option>
        })
      }
    </select>
  )
}
