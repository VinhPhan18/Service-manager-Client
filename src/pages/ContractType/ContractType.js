import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./ContractType.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const ContractType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractTypes, setContractTypes] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddContractType = (event) => {
    event.preventDefault();
    const contractType = {
      id: Math.floor(Math.random() * 1000),
      type: event.target.contractType.value,
    };
    setContractTypes([...contractTypes, contractType]);
    toggleModal();
  };

  const handleEditContractType = (contractType) => {
    setSelectedContractType(contractType);
    toggleModal();
  };

  const handleUpdateContractType = (event) => {
    event.preventDefault();
    const updatedContractType = {
      id: selectedContractType.id,
      type: event.target.contractType.value,
    };

    setContractTypes((prevContractTypes) =>
      prevContractTypes.map((contractType) =>
        contractType.id === selectedContractType.id
          ? updatedContractType
          : contractType
      )
    );
    setSelectedContractType(null);
    toggleModal();
  };

  const handleDeleteContractType = (contractTypeId) => {
    setContractTypes((prevContractTypes) =>
      prevContractTypes.filter(
        (contractType) => contractType.id !== contractTypeId
      )
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Loại hợp đồng</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm loại hợp đồng
        </button>
      </div>
      <h2>Danh sách loại hợp đồng</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Loại hợp đồng</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contractTypes.map((contractType) => (
              <tr key={contractType.id}>
                <td>{contractType.id}</td>
                <td>{contractType.type}</td>
                <td>
                  <button
                    onClick={() => handleEditContractType(contractType)}
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
                    onClick={() => handleDeleteContractType(contractType.id)}
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
              {selectedContractType
                ? "Sửa loại hợp đồng"
                : "Thêm loại hợp đồng"}
            </h3>
            <div className={cx("formWrapper")}>
              <form
                onSubmit={
                  selectedContractType
                    ? handleUpdateContractType
                    : handleAddContractType
                }
              >
                <div className={cx("inputWrapper")}>
                     <label htmlFor="transactionType" className={cx("label")}>
                    
                      Tên loại hợp đồng:
                    
                  </label>
                  <input
                    type="text"
                    name="contractType"
                    defaultValue={
                      selectedContractType ? selectedContractType.type : ""
                    }
                    className={cx("form-control")}
                    placeholder="Nhập loại hợp đồng"
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
                      {setSelectedContractType ? "Cập nhật" : "Thêm"}
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

export default ContractType;
