import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit, faBan, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tippy from "@tippyjs/react";
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
  const [editingTransactionTypeName, setEditingTransactionTypeName] =
    useState("");
  const [editingCustomerType, setEditingCustomerType] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);
  const [editingTransactionType, setEditingTransactionType] = useState(false);
  const [editingTransactionTypeID, setEditingTransactionTypeID] = useState("");
  const [error, setError] = useState("");
  const [
    isTransactionTypeSuccessfullySet,
    setIsTransactionTypeSuccessfullySet,
  ] = useState(false);

  const addTransactionTypeSuccessfully = () => toast(error);
  const [filter, setFilter] = useState({
    q: "",
  });
  useEffect(() => {
    if (isTransactionTypeSuccessfullySet) {
      addTransactionTypeSuccessfully();

      setTimeout(() => {
        setIsTransactionTypeSuccessfullySet(false);
      }, 1000);
    }
  }, [isTransactionTypeSuccessfullySet]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setName("");
  };

  const handleUpdateTransactionType = () => {
    const updatedTransactionType = {
      _id: editingTransactionTypeID,
      name: editingTransactionTypeName,
    };

    const fetchApi = async () => {
      try {
        const res = await transactionServices.updatedTransactionType(
          updatedTransactionType
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
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

  const handelTrash = () => {
    setIsDeleted(!isDeleted);

    setFilter((prevFilter) => ({
      ...prevFilter,
      deleted: !isDeleted,
    }));
  };

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

  const handleEditClick = (transactionTypeId) => {
    const transactionType = transactiontypeList.find(
      (transactiontype) => transactiontype._id === transactionTypeId
    );
    setEditingTransactionTypeID(transactionTypeId);
    setEditingTransactionTypeName(transactionType.name);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (transactionTypeId) => {
    try {
      const res = await transactionServices.deleteTransactionType(
        transactionTypeId
      );
      console.log(res);
      // Update the transaction type list after deletion
      const updatedTransactionTypes = transactiontypeList.filter(
        (transactionType) => transactionType._id !== transactionTypeId
      );
      setTransactionTypeList(updatedTransactionTypes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal closeModal={openTransactionTypeModal}>
        <div className={cx("wrapper")}>
          <h1>Loại Giao Dịch</h1>
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
              Thêm Loại Giao Dịch
            </Button>
          </div>
          <h2>Danh sách loại giao dịch</h2>
          <div className={cx("tableWrapper")}>
            <table className={cx("table")}>
              <thead className={cx("table-title")}>
                <tr>
                  <th>Loại giao dịch</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {transactiontypeList &&
                  transactiontypeList.map((transactiontype) => (
                    <tr key={transactiontype._id}>
                      <td>{transactiontype.name}</td>
                      <td>
                        <div className={cx("boxBtns")}>
                          <button
                            onClick={() => handleEditClick(transactiontype._id)}
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
                                    handleDeleteClick(transactiontype._id)
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
                                    handleDeleteClick(transactiontype._id)
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
                {editingTransactionType
                  ? "Thêm loại giao dịch"
                  : "Sửa loại giao dịch"}
              </h3>
            </div>
            <div className={cx("formContent")}>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="name">
                  Tên loại giao dịch:
                </label>
                {editingTransactionType ? (
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
                    value={editingTransactionTypeName}
                    onChange={(e) =>
                      setEditingTransactionTypeName(e.target.value)
                    }
                    required
                  />
                )}
              </div>
            </div>
            <div className={cx("formGroupbutton")}>
              {editingTransactionType ? (
                <Button onClick={handleSubmit} primary small>
                  Thêm
                </Button>
              ) : (
                <Button onClick={handleUpdateTransactionType} primary small>
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
