import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./TransactionStatus.module.scss";
import * as transactionServices from "~/services/transactionServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";

export default function TransactionStatus({
  data,
  openTransactionStatusModal,
}) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const [transactionstatusList, setTransactionStatusList] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [
    IsTransactionStatusSuccessfullySet,
    setIsTransactionStatusSuccessfullySet,
  ] = useState(false);

  const addTransactionStatusSuccessfully = () => toast(error);

  useEffect(() => {
    if (IsTransactionStatusSuccessfullySet) {
      addTransactionStatusSuccessfully();

      setTimeout(() => {
        setIsTransactionStatusSuccessfullySet(false);
      }, 1000);
    }
  }, [IsTransactionStatusSuccessfullySet]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setName("");
  };

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        const response = await transactionServices.getTransactionStatus();
        setTransactionStatusList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactionStatus();
  }, []);

  const handleSubmit = async () => {
    const newTransactionStatus = {
      name,
    };

    try {
      const res = await transactionServices.addTransactionStatus(
        newTransactionStatus
      );
      setError(res.message);
      setIsTransactionStatusSuccessfullySet(true);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (TransactionStatusId) => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal closeModal={openTransactionStatusModal}>
        <div className={cx("wrapper")}>
          <ToastContainer />
          <h1>Danh sách trạng thái </h1>
          <div className={cx("tableActions")}>
            <Button onClick={toggleModal} primary>
              Thêm trạng thái
            </Button>
          </div>
          <div className={cx("tableWrapper")}>
            <div className={cx("content")}>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>Tên trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionstatusList &&
                    transactionstatusList.map((transactionstatus) => (
                      <tr key={transactionstatus._id}>
                        <td>{transactionstatus.name}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleEditClick(transactionstatus._id)
                            }
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
              <h2>Thêm trạng thái</h2>
            </div>
            <div className={cx("formGroup")}>
              <div className={cx("formInputWrapper")}>
                <label className={cx("formTitle")} htmlFor="name">
                  Tên trạng thái:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên trạng thái..."
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
