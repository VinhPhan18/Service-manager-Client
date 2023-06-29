import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "~/components/Pagination/Pagination";
import Tippy from "@tippyjs/react";

import style from "./TransactionType.module.scss";
import * as transactionServices from "~/services/transactionServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";

export default function TransactionType({ openTransactionTypeModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [newtransactiontype, setNewTransactionType] = useState(true);
  const [transactiontypeList, setTransactionTypeList] = useState([]);
  const [transactiontype, setTransactionType] = useState([]);
  const [editingTransactionType, setEditingTransactionType] = useState(false);
  const [editingTransactionTypeName, setEditingTransactionTypeName] =
    useState("");
  const [name, setName] = useState("");
  const [filter, setFilter] = useState({
    q: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      const result = await transactionServices.getTransactions(filter);
      setTransactionType(result.data);
    };
    fetchApi();
  }, [filter]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingTransactionType(true);
  };

  // GET STAFFS DATA
  useEffect(() => {
    const getTransactionTypes = async () => {
      const result = await transactionServices.getTransactionTypes(filter);
      console.log(result);
      if (result) {
        setTransactionTypeList(result);
      } else {
        console.log("error");
      }
    };
    getTransactionTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsValid(isValid);
    if (isValid) {
      const newTransactionType = {
        name,
      };

      const createTransactiontype = async () => {
        const res = await transactionServices.createTransactionType(
          newTransactionType
        );
        console.log(res);
      };
      transactionServices.createTransactionType();

      // toggleModal();
    }
  };

  // const handleSubmit = (e) => {

  //     // toggleModal();

  // };

  const handleUpdateTransactionType = () => {
    const updatedTransactionType = {
      _id: editingTransactionType,
      name: editingTransactionTypeName,
    };
    const fetchApi = async () => {
      const res = await transactionServices.updatedTransactionType(
        updatedTransactionType
      );
      console.log(updatedTransactionType);
    };
    fetchApi();
  };

  const handleEditClick = (transactiontypeId) => {
    setIsModalOpen(true);
    setEditingTransactionType(false);
  };

  // const handleDeleteCustomerType = (customertypeId) => {
  //   const updatedCustomerTypeList = customertypeList.filter((customertype) => customertype._id !== customertypeId);
  //   setCustomerTypeList(updatedCustomerTypeList);
  // };
  return (
    <div>
      <Modal closeModal={openTransactionTypeModal}>
        <div className={cx("wrapper")}>
          <h1>Loại Giao Dịch</h1>
          <div className={cx("tableActions")}>
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
                        <button
                          onClick={() => {
                            setEditingTransactionTypeName(transactiontype.name);
                            handleEditClick();
                          }}
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
              <h3>
                {" "}
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
                <Button onClick={handleUpdateTransactionType} primary small>
                  Cập nhật
                </Button>
              ) : (
                <Button onClick={handleSubmit} primary small>
                  Thêm
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
