import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import style from './CustomerType.module.scss';
import * as customerServices from '~/services/customerServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';


export default function CustomerType() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isValid, setIsValid] = useState(true);
  const [customertypeList, setCustomerTypeList] = useState([]);
  const [updatedCustomerType, setUpdatedCustomerType] = useState([]);
  const [editingCustomerType, setEditingCustomerType] = useState("");
  const [editingCustomerTypeName, setEditingCustomerTypeName] = useState("");

  const [name, setName] = useState('');
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCustomerType(null);
  };

  // GET STAFFS DATA
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
 
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsValid(isValid);
    if (isValid) {
      const newCustomerType = {
        name,
      };

      const createCustomerType = async () => {
        const res = await customerServices.createCustomerType(newCustomerType)
        console.log(res)
      }
      createCustomerType()

      // toggleModal();
    }
  };

  const handleUpdateCustomerType = () => {
      const updatedCustomerType = {
        _id:editingCustomerType,
        name:editingCustomerTypeName
    
      };
      const fetchApi= async () =>{
        const res = await customerServices.updatedCustomerType(updatedCustomerType) 
        console.log(res)



      }
      fetchApi()
    
  };
  console.log(editingCustomerType)

  const handleEditClick = (customertypeId) => { 

    setIsModalOpen(true);
  };

  const handleDeleteCustomerType = (customertypeId) => {
    const updatedCustomerTypeList = customertypeList.filter((customertype) => customertype._id !== customertypeId);
    setCustomerTypeList(updatedCustomerTypeList);
  };
  return (
    <div className={cx("wrapper")}>
      <h1>Loại khách hàng</h1>
      <div className={cx('tableActions')}>
        <Button onClick={toggleModal} primary>Thêm Loại Khách Hàng</Button>
      </div>
      <h2>Danh sách loại khách hàng</h2>
      <div className={cx('tableWrapper')}>
        <table className={cx('table')}>
          <thead>
            <tr>
              <th>Loại khách hàng</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
           {customertypeList && customertypeList.map((customertype) => (
              <tr key={customertype._id}>
                <td>{customertype.id}</td>
                <td>{customertype.name}</td>
                <td>
                <button onClick={() => {
                  setEditingCustomerType(customertype._id)
                  setEditingCustomerTypeName(customertype.name)
                  handleEditClick( )
                }}>
                      <FontAwesomeIcon icon={faEdit} className={cx("icon")} /> Sửa
                    </button>
                    <button onClick={() => handleDeleteCustomerType(customertype._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} /> Xóa
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
            <div className={cx("modalWraper")}>
              <div className={cx("bigTitle")}>
                <h3> {editingCustomerType ? 'Sửa loại khách hàng' : 'Thêm loại khách hàng'}</h3>
              </div>
              <div className={cx("formContent")} >
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="name">Tên loại khách hàng:</label>
                  {
                    editingCustomerType ? ( <input
                      className={cx("formInput")}
                      placeholder="Nhập tên loại khách hàng..."
                      maxLength={30}
                      type="text"
                      id="name"
                      value={editingCustomerTypeName}
                      onChange={(e) => setEditingCustomerTypeName(e.target.value)}
                      required
                    />):( <input
                      className={cx("formInput")}
                      placeholder="Nhập tên loại khách hàng..."
                      maxLength={30}
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />)
                  }
                </div>
              </div>
                <div className={cx("formGroupbutton")}>
                    {
                      editingCustomerType ? (
                        <Button onClick={handleUpdateCustomerType} primary small>Cập nhật</Button>

                      ) : (

                        <Button onClick={handleSubmit} primary small>Thêm</Button>
                      )
                    }
                    <Button onClick={toggleModal} primary small>Hủy</Button>
                </div> 

            </div>
        </Modal>
      )}
    </div>
  );
}
