import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./TransactionType.module.scss";
import * as transactionServices from "~/services/transactionServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";

export default function TransactionType({ data, openTransactionTypeModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactiontypeList, setTransactionTypeList] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [
    IsTransactionTypeSuccessfullySet,
    setIsTransactionTypeSuccessfullySet,
  ] = useState(false);

  const addTransactionTypeSuccessfully = () => toast(error);

  useEffect(() => {
    if (IsTransactionTypeSuccessfullySet) {
      addTransactionTypeSuccessfully();

      setTimeout(() => {
        setIsTransactionTypeSuccessfullySet(false);
      }, 1000);
    }
  }, [IsTransactionTypeSuccessfullySet]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setName("");
  };

  useEffect(() => {
    const fetchTransactionTypes = async () => {
      try {
        const response = await transactionServices.getTransactionTypes();
        setTransactionTypeList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactionTypes();
  }, []);

  const handleSubmit = async () => {
    const newTransactionType = {
      name,
    };

    try {
      const res = await transactionServices.addTransactionType(
        newTransactionType
      );
      setError(res.message);
      setIsTransactionTypeSuccessfullySet(true);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (TransactionTypeId) => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal closeModal={openTransactionTypeModal}>
        <div className={cx("wrapper")}>
          <ToastContainer />
          <h1>Danh sách loại giao dịch </h1>
          <div className={cx("tableActions")}>
            <Button onClick={toggleModal} primary>
              Thêm loại giao dịch
            </Button>
          </div>
          <div className={cx("tableWrapper")}>
            <div className={cx("content")}>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>Tên loại giao dịch</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {transactiontypeList &&
                    transactiontypeList.map((transactiontypes) => (
                      <tr key={transactiontypes._id}>
                        <td>{transactiontypes.name}</td>
                        <td>
                          <button
                            onClick={() => handleEditClick(transactiontypes._id)}
                            className={cx("icon")}
                          >
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
              <h2>Thêm loại giao dịch</h2>
            </div>
            <div className={cx("formGroup")}>
              <div className={cx("formInputWrapper")}>
                <label className={cx("formTitle")} htmlFor="name">
                  Tên loại giao dịch:
                </label>
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
              <Button onClick={handleSubmit} primary small>
                Thêm
              </Button>
              <Button onClick={toggleModal} primary small>
                Hủy
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
