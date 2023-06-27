import {useState, useEffect} from 'react'
import classNames from 'classnames/bind';
import * as customerServices from '~/services/customerServices';
import style from './GetCustomerType.module.scss';


export default function GetCustomerType({value, setValue}) {
  const cx = classNames.bind(style);

  const [customertypeList, setCustomerTypeList] = useState([]);

    useEffect(() => {
        const getCustomerTypes = async () => {
          const response = await customerServices.getCustomerTypes()
          console.log(response)
          if (response) {
            setCustomerTypeList(response)
          } else {
            console.log('error')
          }
    
        }
        getCustomerTypes()
      }, []);
  return (
    <select className={cx("formInput")} 
                 value={value} 
                 onChange={e => setValue(e.target.value)}
                 required>

                  <option value="">Chọn Loại Khách hàng</option>
                  {customertypeList && customertypeList.map(customerType => {
                    return (
                      <option key={customerType._id} value={customerType._id}>{customerType.name}</option>
                    )
                  })}
                </select>
  )
}
