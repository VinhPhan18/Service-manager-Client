import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit, faBan, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tippy from "@tippyjs/react";

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
  const [editingTransactionStatusName, setEditingTransactionStatusName] =
    useState("");
  const [editingTransactionStatusID, setEditingTransactionStatusID] =
    useState("");
  const [editingTransactionStatus, setEditingTransactionStatus] =
    useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [filter, setFilter] = useState({
    q: "",
  });
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

  const handelTrash = () => {
    setIsDeleted(!isDeleted);

    setFilter((prevFilter) => ({
      ...prevFilter,
      deleted: !isDeleted,
    }));
  };

  const handleUpdateTransactionStatus = () => {
    const updatedTransactionStatus = {
      _id: editingTransactionStatusID,
      name: editingTransactionStatusName,
    };

    const fetchApi = async () => {
      try {
        const res = await transactionServices.updatedTransactionStatus(
          updatedTransactionStatus
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  };
  const handleEditClick = (TransactionStatusId) => {
    setIsModalOpen(true);
  };
  const handleDeleteClick = async (transactionStatusId) => {
    try {
      const res = await transactionServices.deleteTransactionStatus(
        transactionStatusId
      );
      console.log(res);
      // Update the transaction type list after deletion
      const updatedTransactionStatus = transactionstatusList.filter(
        (transactionStatus) => transactionStatus._id !== transactionStatusId
      );
      setTransactionStatusList(updatedTransactionStatus);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal closeModal={openTransactionStatusModal}>
        <div className={cx("wrapper")}>
          <h1>Trạng Thái Giao Dịch</h1>
          <div className={cx("tableActions")}>
            {isDeleted ? (
              <Button primary onClick={handelTrash}>
                Thùng rác
              </Button>
            ) : (
              <Button outline onClick={handelTrash}>
                Thùng rác
              </Button>
            )}
            <Button onClick={toggleModal} primary>
              Thêm Trạng Thái Giao Dịch
            </Button>
          </div>
          <h2>Danh sách trạng thái giao dịch</h2>
          <div className={cx("tableWrapper")}>
            <table className={cx("table")}>
              <thead className={cx("table-title")}>
                <tr>
                  <th>Trạng thái giao dịch</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {transactionstatusList &&
                  transactionstatusList.map((transactionstatus) => (
                    <tr key={transactionstatus._id}>
                      <td>{transactionstatus.name}</td>
                      <td>
                        <div className={cx("boxBtns")}>
                          <button
                            onClick={() =>
                              handleEditClick(transactionstatus._id)
                            }
                          >
                            <Tippy content="Sửa">
                              <div className={cx("btnIconBox")}>
                                <Button outline small text>
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className={cx("icon")}
                                  />
                                </Button>
                              </div>
                            </Tippy>
                          </button>
                          {isDeleted ? (
                            <Tippy content="Xoá vĩnh viễn">
                              <div className={cx("btnIconBox")}>
                                <Button
                                  outline
                                  small
                                  text
                                  onClick={() =>
                                    handleDeleteClick(transactionstatus._id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faBan} />
                                </Button>
                              </div>
                            </Tippy>
                          ) : (
                            <Tippy content="Chuyển đến thùng rác">
                              <div className={cx("btnIconBox")}>
                                <Button
                                  outline
                                  small
                                  text
                                  onClick={() =>
                                    handleDeleteClick(transactionstatus._id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </div>
                            </Tippy>
                          )}
                        </div>
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
              <h3>
                {editingTransactionStatus
                  ? "Thêm loại giao dịch"
                  : "Sửa loại giao dịch"}
              </h3>
            </div>
            <div className={cx("formContent")}>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="name">
                  Tên loại giao dịch:
                </label>
                {editingTransactionStatus ? (
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập tên loại giao dịch..."
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
                    placeholder="Nhập tên loại giao dịch..."
                    maxLength={30}
                    type="text"
                    id="name"
                    value={editingTransactionStatusName}
                    onChange={(e) =>
                      setEditingTransactionStatusName(e.target.value)
                    }
                    required
                  />
                )}
              </div>
            </div>
            <div className={cx("formGroupbutton")}>
              {editingTransactionStatus ? (
                <Button onClick={handleSubmit} primary small>
                  Thêm
                </Button>
              ) : (
                <Button onClick={handleUpdateTransactionStatus} primary small>
                  Cập nhật
                </Button>
              )}
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
