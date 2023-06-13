import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./CustomerType.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const CustomerType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [selectedCustomerType, setSelectedCustomerType] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddCustomerType = (event) => {
    event.preventDefault();
    const customerType = {
      id: Math.floor(Math.random() * 1000),
      type: event.target.customerType.value,
    };
    setCustomerTypes([...customerTypes, customerType]);
    toggleModal();
  };

  const handleEditCustomerType = (customerType) => {
    setSelectedCustomerType(customerType);
    toggleModal();
  };

  const handleUpdateCustomerType = (event) => {
    event.preventDefault();
    const updatedCustomerType = {
      id: selectedCustomerType.id,
      type: event.target.customerType.value,
    };

    setCustomerTypes((prevCustomerTypes) =>
      prevCustomerTypes.map((customerType) =>
        customerType.id === selectedCustomerType.id ? updatedCustomerType : customerType
      )
    );
    setSelectedCustomerType(null);
    toggleModal();
  };

  const handleDeleteCustomerType = (customerTypeId) => {
    setCustomerTypes((prevCustomerTypes) =>
      prevCustomerTypes.filter((customerType) => customerType.id !== customerTypeId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Loại khách hàng</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm loại khách hàng
        </button>
      </div>
      <h2>Danh sách loại khách hàng</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Loại khách hàng</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customerTypes.map((customerType) => (
              <tr key={customerType.id}>
                <td>{customerType.id}</td>
                <td>{customerType.type}</td>
                <td>
                  <button
                    onClick={() => handleEditCustomerType(customerType)}
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
                    onClick={() => handleDeleteCustomerType(customerType.id)}
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
              {selectedCustomerType ? "Sửa loại khách hàng" : "Thêm loại khách hàng"}
            </h3>
            <div className={cx("formWrapper")}>
              <form
                onSubmit={
                  selectedCustomerType
                    ? handleUpdateCustomerType
                    : handleAddCustomerType
                }
              >
                <div className={cx("inputWrapper")}>
                <label htmlFor="customerType">Tên loại khách hàng:</label>
                  <input
                    type="text"
                    name="customerType"
                    defaultValue={
                      selectedCustomerType ? selectedCustomerType.type : ""
                    }
                    className={cx("form-control")}
                    placeholder="Nhập loại khách hàng"
                    maxLength={50}
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
                      {selectedCustomerType ? "Cập nhật" : "Thêm"}
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

export default CustomerType;
