import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import style from "./GetCustomer.module.scss"
import { useDebounce } from '~/hooks'
import * as customerServices from "~/services/customerServices"

export default function GetCustomer({ value, setValue, searchValue }) {
  const cx = classNames.bind(style)

  const [customerList, setCustomerList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let debounced = useDebounce(searchValue, 1000);

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
    const getCustomers = async () => {
      const response = await customerServices.getCustomers(filter)

      setCustomerList(response.data)

      setIsLoading(false)
    }
    getCustomers()
  }, [filter])

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className={cx("input")}>
      <option value="">{isLoading ? ("Loading...") : ("---Chọn khách hàng---")}</option>
      {
        customerList && customerList.map((customer) => {
          return <option key={customer._id} value={customer._id}>{customer.name}</option>
        })
      }
    </select>
  )
}
