import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import {faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from '~/components/Pagination/Pagination'
import Tippy from "@tippyjs/react";

import style from './CustomerType.module.scss';
import * as customerServices from '~/services/customerServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';


export default function CustomerType({openCustomerTypeModal}) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isValid, setIsValid] = useState(true);
  const [newcustomertype, setNewCustomerType] = useState(true);
  
  const [customertypeList, setCustomerTypeList] = useState([]);
  const [customertype, setCustomerType] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [editingCustomerType, setEditingCustomerType] = useState(false);
  const [editingCustomerTypeName, setEditingCustomerTypeName] = useState("");
  const [name, setName] = useState('');
  const [filter, setFilter] = useState({
    q: "",
  })
  useEffect(() => {
    const fetchApi = async () => {
      const result = await customerServices.getCustomers(filter)
      setCustomerType(result.data)
    }
    fetchApi()
  }, [filter])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCustomerType(true);
  };

  // GET STAFFS DATA
  useEffect(() => {
    const getCustomerTypes = async () => {
      const response = await customerServices.getCustomerTypes(filter)
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
      const newCusTomerType = {
        name,

      };

      const createCustometype = async () => {
        const res = await customerServices.createCustomerType(newCusTomerType)
        console.log(res)
      }
      customerServices.createCustomerType()

      // toggleModal();
    }
  };


  // const handleSubmit = (e) => {
    

  //     // toggleModal();
    
  // };

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

  const handleEditClick = (customertypeId) => { 
    setIsModalOpen(true);
    setEditingCustomerType(false);
  };

  // const handleDeleteCustomerType = (customertypeId) => {
  //   const updatedCustomerTypeList = customertypeList.filter((customertype) => customertype._id !== customertypeId);
  //   setCustomerTypeList(updatedCustomerTypeList);
  // };
  console.log( editingCustomerType )
  return (
  <div>
    <Modal closeModal={openCustomerTypeModal}>
      <div className={cx("wrapper")}>
    <h1>Loại khách hàng</h1>
      <div className={cx('tableActions')}>
        <Button onClick={toggleModal} primary>Thêm Loại Khách Hàng</Button>
      </div>
      <h2>Danh sách loại khách hàng</h2>
        <div className={cx('tableWrapper')}>
          <table className={cx('table')}>
            <thead  className={cx("table-title")}>
              <tr>
                <th>Loại khách hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
            {customertypeList && customertypeList.map((customertype) => (
                <tr key={customertype._id}>
                  <td>{customertype.name}</td>
                  <td>
                  <button onClick={() => {
                    setEditingCustomerTypeName(customertype.name)
                    handleEditClick( )
                  }}>
                          <Tippy content="Sửa">
                                <div className={cx("btnIconBox")}>
                                  <Button outline small text> <FontAwesomeIcon icon={faEdit} className={cx("icon")} /></Button>
                                </div>
                            </Tippy>
                      </button>
                      {/* <button onClick={() => handleDeleteCustomerType(customertype._id)}>
                        <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} /> Xóa
                      </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>

      

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
            <div className={cx("modalWraper")}>
              <div className={cx("bigTitle")}>
                <h3> {editingCustomerType ? 'Thêm loại khách hàng' : 'Sửa loại khách hàng'}</h3>
              </div>
              <div className={cx("formContent")} >
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="name">Tên loại khách hàng:</label>
                  {
                    editingCustomerType ?( <input
                      className={cx("formInput")}
                      placeholder="Nhập tên loại khách hàng..."
                      maxLength={30}
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />):

                    ( <input
                      className={cx("formInput")}
                      placeholder="Nhập tên loại khách hàng..."
                      maxLength={30}
                      type="text"
                      id="name"
                      value={editingCustomerTypeName}
                      onChange={(e) => setEditingCustomerTypeName(e.target.value)}
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
