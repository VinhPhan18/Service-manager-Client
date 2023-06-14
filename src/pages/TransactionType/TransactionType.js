import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./TransactionType.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const TransactionType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [selectedTransactionType, setSelectedTransactionType] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTransactionType = (event) => {
    event.preventDefault();
    const transactionType = {
      id: Math.floor(Math.random() * 1000),
      type: event.target.transactionType.value,
    };
    setTransactionTypes([...transactionTypes, transactionType]);
    toggleModal();
  };

  const handleEditTransactionType = (transactionType) => {
    setSelectedTransactionType(transactionType);
    toggleModal();
  };

  const handleUpdateTransactionType = (event) => {
    event.preventDefault();
    const updatedTransactionType = {
      id: selectedTransactionType.id,
      type: event.target.transactionType.value,
    };

    setTransactionTypes((prevTransactionTypes) =>
      prevTransactionTypes.map((transactionType) =>
        transactionType.id === selectedTransactionType.id
          ? updatedTransactionType
          : transactionType
      )
    );
    setSelectedTransactionType(null);
    toggleModal();
  };

  const handleDeleteTransactionType = (transactionTypeId) => {
    setTransactionTypes((prevTransactionTypes) =>
      prevTransactionTypes.filter(
        (transactionType) => transactionType.id !== transactionTypeId
      )
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Loại giao dịch</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm loại giao dịch
        </button>
      </div>
      <h2>Danh sách loại giao dịch</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Loại giao dịch</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {transactionTypes.map((transactionType) => (
              <tr key={transactionType.id}>
                <td>{transactionType.id}</td>
                <td>{transactionType.type}</td>
                <td>
                  <button
                    onClick={() => handleEditTransactionType(transactionType)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                    }}
                    className={cx("btn", "btn-outline-primary", "mr-2")}
                  >
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteTransactionType(transactionType.id)
                    }
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                    }}
                    className={cx("btn", "btn-outline-danger")}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={cx("modal")}>
          <div className={cx("modalContent")}>
            <button
              className={cx("closeButton")}
              onClick={toggleModal}
              style={{
                backgroundColor: "white",
                color: "red",
                fontSize: "35px",
                marginLeft: "auto",
                marginTop: -30,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>
              {selectedTransactionType
                ? "Sửa loại giao dịch"
                : "Thêm loại giao dịch"}
            </h3>
            <div className={cx("formWrapper")}>
              <form
                onSubmit={
                  selectedTransactionType
                    ? handleUpdateTransactionType
                    : handleAddTransactionType
                }
              >
                <div className={cx("inputWrapper")}>
                  <label htmlFor="transactionType" className={cx("label")}>
                    Tên loại giao dịch:
                  </label>
                  <input
                    type="text"
                    name="transactionType"
                    defaultValue={
                      selectedTransactionType
                        ? selectedTransactionType.type
                        : ""
                    }
                    className={cx("form-control")}
                    placeholder="Nhập loại giao dịch"
                    required
                  />
                  <div className={cx("buttonWrapper")}>
                    <button
                      type="submit"
                      className={cx("addButton", "btn")}
                      style={{
                        marginRight: "8px",
                        backgroundColor: "#2e3f50",
                      }}
                    >
                      {setSelectedTransactionType ? "Cập nhật" : "Thêm"}
                    </button>

                    <button
                      type="button"
                      className={cx("cancelButton", "btn", "btn-danger")}
                      onClick={toggleModal}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionType;
