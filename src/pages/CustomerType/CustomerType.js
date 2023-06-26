import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { motion } from "framer-motion";

import style from './CustomerType.module.scss';
import * as customertypeServices from '~/services/customertypeServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';


export default function CustomerType() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isValid, setIsValid] = useState(true);
  const [customertypeList, setCustomerTypeList] = useState([]);
  // const [customertype, setCustomerType] = useState([]);
  const [editingCustomerType, setEditingCustomerType] = useState(null);
  // const [selectedCustomerType, setSelectedCustomerType] = useState(null);

  const [name, setName] = useState('');
  const [mota, setMota] = useState('');
  const [totalpage, setTotalPage] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  // const [filter, setFilter] = useState({
  //   limit:10,
  //   create: "createadd",
  //   page: 1
  // });
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCustomerType(null);
  };

  // GET STAFFS DATA
  useEffect(() => {
    const getCustomerTypes = async () => {
      const response = await customertypeServices.getCustomerTypes()
      if (response?.customertype) {
        setCustomerTypeList(response.customertypes)
        setCurrentPage(response.currentPage);
        const pageArray = Array.from(
          { length: response.totalPages },
          (_, i) => i + 1
        );
        setTotalPage(pageArray);
        console.log(response)
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
        mota,
      };

      const createCustomerType = async () => {
        const res = await customertypeServices.createCustomerType(newCustomerType)
        console.log(res)
      }
      createCustomerType()

      // toggleModal();
    }
  };

  const handleUpdateCustomerType = (e) => {
    e.preventDefault();

    setIsValid(isValid);
    if (isValid) {
      const updatedCustomerType = {
        _id: editingCustomerType._id,
        hoten: e.target.hoten.value || editingCustomerType.hoten,
        email: e.target.email.value || editingCustomerType.email,
    
      };

      const updatedCustomerTypeList = customertypeList.map((customertype) => {
        if (customertype._id === updatedCustomerType._id) {
          return updatedCustomerType;
        }
        return customertype;
      });

      setCustomerTypeList(updatedCustomerTypeList);

      e.target.reset();
  
      toggleModal();
    }
  };

  const handleEditClick = (customertypeId) => {
    const editedCustomerType = customertypeList.find((customertype) => customertype._id === customertypeId);
    setEditingCustomerType(editedCustomerType);

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
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
           {customertypeList && customertypeList.map((customertype) => (
              <tr key={customertype._id}>
                <td>{customertype.id}</td>
                <td>{customertype.name}</td>
                <td>{customertype.mota}</td>
                <td>
                <button onClick={() => handleEditClick(customertype._id)}>
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
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập tên loại khách hàng..."
                    maxLength={30}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="name">Mô tả:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập mô tả..."
                    maxLength={30}
                    type="text"
                    id="mota"
                    value={mota}
                    onChange={(e) => setMota(e.target.value)}
                    required
                  />
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
