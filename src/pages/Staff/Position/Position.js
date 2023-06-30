import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './Position.module.scss';
import * as staffServices from '~/services/staffServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';

export default function Position({ data, openStaffPositionModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [positionList, setPositionList] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [IsPositionSuccessfullySet, setIsPositionSuccessfullySet] = useState(false);

  const createPositionSuccessfully = () => toast(error);

  useEffect(() => {
    if (IsPositionSuccessfullySet) {
      createPositionSuccessfully();

      setTimeout(() => {
        setIsPositionSuccessfullySet(false);
      }, 1000);
    }
  }, [IsPositionSuccessfullySet]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setName('');
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await staffServices.getPosition();
        setPositionList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPositions();
  }, []);

  const handleSubmit = async () => {
    const newPosition = {
      name,
    };

    try {
      const res = await staffServices.createPosition(newPosition);
      setError(res.message);
      setIsPositionSuccessfullySet(true);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (positionId) => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal closeModal={openStaffPositionModal}>
        <div className={cx("wrapper")}>
          <ToastContainer />
          <h1>Danh sách chức vụ</h1>
          <div className={cx('tableActions')}>
            <Button onClick={toggleModal} primary>Thêm chức vụ</Button>
          </div>
          <div className={cx('tableWrapper')}>
            <div className={cx("content")}>
              <table className={cx('table')}>
                <thead>
                  <tr>
                    <th>Tên chức vụ</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {positionList && positionList.map((position) => (
                    <tr key={position._id}>
                      <td>{position.name}</td>
                      <td>
                        <button onClick={() => handleEditClick(position._id)} className={cx("icon")}>
                          <FontAwesomeIcon icon={faEdit} /> Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={cx("modalWraper")}>
            <div className={cx("bigTitle")}>
              <h2>Thêm chức vụ</h2>
            </div>
            <div className={cx("formGroup")}>
              <div className={cx("formInputWrapper")}>
                <label className={cx("formTitle")} htmlFor="name">Tên chức vụ:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên chức vụ..."
                  maxLength={30}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={cx("formGroupbutton")}>
              <Button onClick={handleSubmit} primary small>Thêm</Button>
              <Button onClick={toggleModal} primary small>Hủy</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
