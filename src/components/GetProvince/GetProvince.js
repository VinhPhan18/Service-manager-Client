import React, { useState, useEffect } from 'react';
import * as locationServices from '~/services/locationService';
import classNames from 'classnames/bind';

import style from "./GetProvince.module.scss"
import { useDebounce } from '~/hooks';

export default function GetProvence({ value, setValue, searchValue, fitContent }) {
  const cx = classNames.bind(style)
  const [provinces, setprovinces] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let debounced = useDebounce(searchValue, 500);

  const [filter, setFilter] = useState({
    q: ""
  });

  useEffect(() => {
    setIsLoading(true)
    const getStaffs = async () => {
      const response = await locationServices.getProvince(filter)

      setprovinces(response)

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
      <option value="">{isLoading ? ("Loading...") : ("---Chọn tỉnh---")}</option>
      {
        provinces && provinces.map((province) => {
          return <option key={province._id} value={province._id}>{province.name}</option>
        })
      }
    </select>
  )
}
