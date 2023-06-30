import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import style from "./GetContractType.module.scss"
import * as contractServices from "~/services/contractServices"

export default function GetContractType({ value, setValue }) {
  const cx = classNames.bind(style)

  const [contractType, setContractType] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getContractType = async () => {
      const response = await contractServices.getContractType()
      console.log(response)
      if (response) {
        setContractType(response)
        setIsLoading(false)
      } else {
        console.log('error')
      }

    }
    getContractType()
  }, []);
  return (
    <select className={cx("formInput")}
      value={value}
      onChange={e => setValue(e.target.value)}
      required>

      <option value="">{isLoading ? ("Loading...") : ("---Chọn loại hợp đồng---")}</option>
      {contractType && contractType.map(type => {
        return (
          <option key={type._id} value={type._id}>{type.loaihd}</option>
        )
      })}
    </select>
  )
}
