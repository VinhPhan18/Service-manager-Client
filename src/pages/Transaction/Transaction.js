import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Transaction.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "~/components/Modal/Modal";

const Transaction = () => {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTransaction = (event) => {
    event.preventDefault();
    const transaction = {
      id: Math.floor(Math.random() * 1000),
      name: event.target.transactionName.value,
      address: event.target.address.value,
      contactName: event.target.contactName.value,
      startDate: event.target.startDate.value,
      description: event.target.description.value,
      dueDate: event.target.dueDate.value,
      rating: event.target.rating.value,
      duration: event.target.duration.value,
      result: event.target.transactionResult.value,
      docs: event.target.transactionDocs.value,
      transactionType: event.target.transactionType.value, // Thêm trường loại giao dịch
      customer: event.target.customer.value, // Thêm trường khách hàng
      employee: event.target.employee.value, // Thêm trường nhân viên
      transactionStatus: event.target.transactionStatus.value, // Thêm trường trạng thái giao dịch
    };
    setTransactions([...transactions, transaction]);
    toggleModal();
  };
  const handleAddTransactionType = (event) => {
    event.preventDefault();
  }
  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    toggleModal();
  };

  const handleUpdateTransaction = (event) => {
    event.preventDefault();
    const updatedTransaction = {
      id: selectedTransaction.id,
      name: event.target.transactionName.value,
      address: event.target.address.value,
      contactName: event.target.contactName.value,
      startDate: event.target.startDate.value,
      description: event.target.description.value,
      dueDate: event.target.dueDate.value,
      rating: event.target.rating.value,
      duration: event.target.duration.value,
      result: event.target.transactionResult.value,
      docs: event.target.transactionDocs.value,
      transactionType: event.target.transactionType.value, // Thêm trường loại giao dịch
      customer: event.target.customer.value, // Thêm trường khách hàng
      employee: event.target.employee.value, // Thêm trường nhân viên
      transactionStatus: event.target.transactionStatus.value,
    };

    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === selectedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setSelectedTransaction(null);
    toggleModal();
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Giao dịch</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm giao dịch
        </button>
        <button
          onClick={() => setIsTypeModalOpen(!isTypeModalOpen)}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm loại giao dịch
        </button>
        <select
         
        >
          <option value="">Chọn loại giao dịch</option>
          <option value="income">
            <span>Thu nhập</span>
          <span><button>xóa</button></span>
          </option>
          <option value="expense">Chi tiêu</option>
        </select>
      </div>
      <h2>Danh sách giao dịch</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên giao dịch</th>
              <th>Tên người liên hệ</th>
              <th>Địa chỉ</th>
              <th>Mô tả</th>
              <th>Đánh giá</th>
              <th>Ngày bắt đầu</th>
              <th>Hạn thanh toán</th>
              <th>Kết quả giao dịch</th>
              <th>Số ngày giao</th>
              <th>Tư liệu giao dịch</th>
              <th>Loại giao dịch</th> {/* Thêm cột loại giao dịch */}
              <th>Khách hàng</th> {/* Thêm cột khách hàng */}
              <th>Nhân viên</th> {/* Thêm cột nhân viên */}
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.name}</td>
                <td>{transaction.contactName}</td>
                <td>{transaction.address}</td>
                <td>{transaction.description}</td>
                <td>{transaction.rating}</td>
                <td>{transaction.startDate}</td>
                <td>{transaction.dueDate}</td>
                <td>{transaction.result}</td>
                <td>{transaction.duration}</td>
                <td>{transaction.docs}</td>
                <td>{transaction.transactionType}</td>{" "}
                {/* Hiển thị trường loại giao dịch */}
                <td>{transaction.customer}</td>{" "}
                {/* Hiển thị trường khách hàng */}
                <td>{transaction.employee}</td>{" "}
                {/* Hiển thị trường nhân viên */}
                <td>{transaction.transactionStatus}</td>
                <td>
                  <div className={cx("actionButtons")}>
                    <button
                      onClick={() => handleEditTransaction(transaction)}
                      className={cx("btn", "btn-outline-primary", "mr-2")}
                    >
                      <FontAwesomeIcon icon={faEdit} className={cx("icon")} />
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      className={cx("btn", "btn-outline-danger")}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className={cx("icon")}
                      />
                    </button>
                  </div>
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
            <h3>{selectedTransaction ? "Sửa giao dịch" : "Thêm giao dịch"}</h3>
            <form
              onSubmit={
                selectedTransaction
                  ? handleUpdateTransaction
                  : handleAddTransaction
              }
            >
              <div>
                <label htmlFor="transactionName">Tên giao dịch:</label>
                <input
                  type="text"
                  id="transactionName"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.name : ""
                  }
                  placeholder="Nhập tên giao dịch"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.address : ""
                  }
                  placeholder="Nhập địa chỉ"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactName">Tên người liên hệ:</label>
                <input
                  type="text"
                  id="contactName"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.contactName : ""
                  }
                  placeholder="Nhập tên người liên hệ"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate">Ngày bắt đầu:</label>
                <input
                  type="date"
                  id="startDate"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.startDate : ""
                  }
                  placeholder="Nhập ngày bắt đầu"
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Mô tả:</label>
                <input
                  type="text"
                  id="description"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.description : ""
                  }
                  placeholder="Nhập mô tả"
                  maxLength="300"
                  required
                />
              </div>
              <div>
                <label htmlFor="dueDate">Hạn thanh toán:</label>
                <input
                  type="date"
                  id="dueDate"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.dueDate : ""
                  }
                  placeholder="Nhập hạn thanh toán"
                  required
                />
              </div>
              <div>
                <label htmlFor="rating">Đánh giá:</label>
                <input
                  type="text"
                  id="rating"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.rating : ""
                  }
                  placeholder="Nhập đánh giá"
                  maxLength="300"
                  required
                />
              </div>
              <div>
                <label htmlFor="duration">Số ngày giao:</label>
                <input
                  type="number"
                  id="duration"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.duration : ""
                  }
                  placeholder="Nhập số ngày giao"
                  maxLength="3"
                  required
                />
              </div>
              <div>
                <label htmlFor="transactionDocs">Tư liệu giao dịch:</label>
                <input
                  type="text"
                  id="transactionDocs"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.docs : ""
                  }
                  placeholder="Nhập tư liệu giao dịch"
                  maxLength="300"
                  required
                />
              </div>
              <div>
                <label htmlFor="transactionType">Loại giao dịch:</label>
                <input
                  type="text"
                  id="transactionType"
                  defaultValue={
                    selectedTransaction
                      ? selectedTransaction.transactionType
                      : ""
                  }
                  placeholder="Nhập loại giao dịch"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="customer">Khách hàng:</label>
                <input
                  type="text"
                  id="customer"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.customer : ""
                  }
                  placeholder="Nhập tên khách hàng"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="employee">Nhân viên:</label>
                <input
                  type="text"
                  id="employee"
                  defaultValue={
                    selectedTransaction ? selectedTransaction.employee : ""
                  }
                  placeholder="Nhập tên nhân viên"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="transactionStatus">Trạng thái:</label>
                <input
                  type="text"
                  id="transactionStatus"
                  defaultValue={
                    selectedTransaction
                      ? selectedTransaction.transactionStatus
                      : ""
                  }
                  placeholder="Nhập trạng thái giao dịch"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="transactionResult">Kết quả giao dịch:</label>
                <select
                  id="transactionResult"
                  className={cx("resultSelect", "resultSelectVertical")}
                  defaultValue={
                    selectedTransaction ? selectedTransaction.result : ""
                  }
                  required
                >
                  <option value="Thành công" className={cx("successOption")}>
                    Thành công
                  </option>
                  <option value="Thất bại" className={cx("failureOption")}>
                    Thất bại
                  </option>
                </select>
              </div>
              <div className={cx("add")}>
                <button
                  type="submit"
                  className={cx("addButton", "btn", "btn-success")}
                >
                  {selectedTransaction ? "Cập nhật" : "Thêm"}
                </button>
                <button
                  type="button"
                  className={cx("cancelButton", "btn", "btn-secondary")}
                  onClick={toggleModal}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isTypeModalOpen && (
        <div className={cx("modal")}>
          <div className={cx("modalContent")}>
            <button
              className={cx("closeButton")}
              onClick={() => setIsTypeModalOpen(false)}
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
            <h1>Thêm loại giao dịch</h1>
            <form onSubmit={handleAddTransactionType}>
              <div>
                <label htmlFor="transactionType">Loại giao dịch:</label>
                <input
                  type="text"
                  id="transactionType"
                  defaultValue={
                    selectedTransaction
                      ? selectedTransaction.transactionType
                      : ""
                  }
                  placeholder="Nhập loại giao dịch"
                  maxLength="100"
                  required
                />
              </div>
              <div className={cx("add")}>
                <button
                  type="submit"
                  className={cx("addButton", "btn", "btn-success")}
                >
                  Thêm
                </button>
                <button
                  type="button"
                  className={cx("cancelButton", "btn", "btn-secondary")}
                  onClick={() => setIsTypeModalOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
