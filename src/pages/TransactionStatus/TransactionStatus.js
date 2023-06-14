import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./TransactionStatus.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const TransactionStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionStatuses, setTransactionStatuses] = useState([]);
  const [selectedTransactionStatus, setSelectedTransactionStatus] =
    useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTransactionStatus = (event) => {
    event.preventDefault();
    const transactionStatus = {
      id: Math.floor(Math.random() * 1000),
      status: event.target.transactionStatus.value,
    };
    setTransactionStatuses([...transactionStatuses, transactionStatus]);
    toggleModal();
  };

  const handleEditTransactionStatus = (transactionStatus) => {
    setSelectedTransactionStatus(transactionStatus);
    toggleModal();
  };

  const handleUpdateTransactionStatus = (event) => {
    event.preventDefault();
    const updatedTransactionStatus = {
      id: selectedTransactionStatus.id,
      status: event.target.transactionStatus.value,
    };

    setTransactionStatuses((prevTransactionStatuses) =>
      prevTransactionStatuses.map((transactionStatus) =>
        transactionStatus.id === selectedTransactionStatus.id
          ? updatedTransactionStatus
          : transactionStatus
      )
    );
    setSelectedTransactionStatus(null);
    toggleModal();
  };

  const handleDeleteTransactionStatus = (transactionStatusId) => {
    setTransactionStatuses((prevTransactionStatuses) =>
      prevTransactionStatuses.filter(
        (transactionStatus) => transactionStatus.id !== transactionStatusId
      )
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Trạng thái giao dịch</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm trạng thái giao dịch
        </button>
      </div>
      <h2>Danh sách trạng thái giao dịch</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Trạng thái giao dịch</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {transactionStatuses.map((transactionStatus) => (
              <tr key={transactionStatus.id}>
                <td>{transactionStatus.id}</td>
                <td>{transactionStatus.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleEditTransactionStatus(transactionStatus)
                    }
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
                      handleDeleteTransactionStatus(transactionStatus.id)
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
              {selectedTransactionStatus
                ? "Sửa trạng thái giao dịch"
                : "Thêm trạng thái giao dịch"}
            </h3>
            <div className={cx("formWrapper")}>
              <form
                onSubmit={
                  selectedTransactionStatus
                    ? handleUpdateTransactionStatus
                    : handleAddTransactionStatus
                }
              >
                <div className={cx("inputWrapper")}>
                  <label htmlFor="transactionType" className={cx("label")}>
                    
                      Tên trạng thái giao dịch:
                    
                  </label>
                  <input
                    type="text"
                    name="transactionStatus"
                    defaultValue={
                      selectedTransactionStatus
                        ? selectedTransactionStatus.status
                        : ""
                    }
                    className={cx("form-control")}
                    placeholder="Nhập trạng thái giao dịch"
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
                      {setSelectedTransactionStatus ? "Cập nhật" : "Thêm"}
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

export default TransactionStatus;
