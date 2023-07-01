import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import classNames from 'classnames/bind';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";

import style from './CustomerType.module.scss';
import * as customerServices from '~/services/customerServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';

export default function CustomerType({ openCustomerTypeModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [newCustomerType, setNewCustomerType] = useState(true);
  const [customerTypeList, setCustomerTypeList] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [editingCustomerType, setEditingCustomerType] = useState(false);
  const [editingCustomerTypeName, setEditingCustomerTypeName] = useState("");
  const [editingCustomerTypeID, setEditingCustomerTypeID] = useState("");
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const [filter, setFilter] = useState({
    q: "",
  });
//   const [IsCustomerTypeSuccessfully, setIsCustomerTypeSuccessfully] = useState(false);

//   const createCustomerTypeSuccessfully = () => toast("Thêm người liên hệ thành công!");

//   useEffect(() => {
//     if (IsCustomerTypeSuccessfully) {
//       createCustomerTypeSuccessfully();

//       setTimeout(() => {
//         setIsCustomerTypeSuccessfully(false);
//       }, 1000);
//     }
//   }, [IsCustomerTypeSuccessfully]);

  //NOTI
  const createCustomerTypeSuccessfully = () => toast("Thêm nhân viên thành công!");
  useEffect(() => {
    const fetchApi = async () => {
      const result = await customerServices.getCustomers(filter);
      setCustomerType(result.data);
    };
    fetchApi();
  }, [filter]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCustomerType(true);
  };

  useEffect(() => {
    const getCustomerTypes = async () => {
      const response = await customerServices.getCustomerTypes(filter);
      console.log(response);
      if (response) {
        setCustomerTypeList(response);
      } else {
        console.log('error');
      }
    };
    getCustomerTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsValid(isValid);
    if (isValid) {
      const newCustomerType = {
        name,
      };

      try {
        const res = await customerServices.createCustomerType(newCustomerType);
        console.log(res);
      
        // Kiểm tra xem kết quả trả về có thông báo lỗi hay không
        if (res && res.status) {
          // Thêm thành công
          toast.success('Thêm loại khách hàng thành công');
        } else {
          // Thêm không thành công
          toast.error('Thêm loại khách hàng không thành công');
        }
      } catch (error) {
        console.log(error);
      
        if (error.response && error.response.status === 409) {
          // Lỗi: Loại khách hàng đã tồn tại
          toast.error('Loại khách hàng đã tồn tại');
        }  
      }
    }
  };
// Update CustomerType 
  const handleUpdateCustomerType = () => {
    const updatedCustomerType = {
      _id:editingCustomerTypeID,
      name: editingCustomerTypeName,
    };
    console.log(editingCustomerTypeName)

    const fetchApi = async () => {
      const res = await customerServices.updatedCustomerType(updatedCustomerType);
      console.log(res);
    };
    fetchApi();
  };
// Update CustomerType 
  const handleEditClick = (customerTypeId) => {
    setIsModalOpen(true);
    setEditingCustomerType(false);
  };

  return (
    <div>
      <Modal closeModal={openCustomerTypeModal}>
        <div className={cx("wrapper")}>
        <ToastContainer />
          <h1>Loại khách hàng</h1>
          <div className={cx('tableActions')}>
            <Button onClick={toggleModal} primary>Thêm Loại Khách Hàng</Button>
          </div>
          <h2>Danh sách loại khách hàng</h2>
          <div className={cx('tableWrapper')}>
            <table className={cx('table')}>
              <thead className={cx("table-title")}>
                <tr>
                  <th>Loại khách hàng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {customerTypeList && customerTypeList.map((customerType) => (
                  <tr key={customerType._id}>
                    <td>{customerType.name}</td>
                    <td>
                      <button onClick={() => {
                        setEditingCustomerTypeName(customerType.name);// Update CustomerType 
                        setEditingCustomerTypeID(customerType._id);// Update CustomerType 
                        handleEditClick();
                      }}>
                        <Tippy content="Sửa">
                          <div className={cx("btnIconBox")}>
                            <Button outline small text> <FontAwesomeIcon icon={faEdit} className={cx("icon")} /></Button>
                          </div>
                        </Tippy>
                      </button>
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
                {editingCustomerType ? (
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
                ) : (
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập tên loại khách hàngxx..."
                    maxLength={30}
                    type="text"
                    id="name"
                    value={editingCustomerTypeName}
                    onChange={(e) => setEditingCustomerTypeName(e.target.value)}
                    required
                  />
                )}
              </div>
            </div>
            <div className={cx("formGroupbutton")}>
              {editingCustomerType ? (
                <Button onClick={handleSubmit} primary small>Thêm</Button>
              ) : (
                <Button onClick={handleUpdateCustomerType} primary small>Cập nhật</Button>// Update CustomerType 
              )}
              <Button onClick={toggleModal} primary small>Hủy</Button>
            </div>
          </div>
        </Modal>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </div>
  );
}
