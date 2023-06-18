import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./StaffType.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import * as staffServices from '~/services/staffServices';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = classNames.bind(style);

const StaffType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffTypes, setStaffTypes] = useState([]);
  const [positionValue, setPositionValue] = useState('');
  const [selectedStaffType, setSelectedStaffType] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddStaffType = () => {
    console.log("add")
    const addPosition = async () => {
      const data = {
        name: positionValue
      }
      console.log(data)
      const res = await staffServices.createPosition(data)
      console.log(res)
    }
    addPosition()
  };

  const handleEditStaffType = (staffType) => {
    setSelectedStaffType(staffType);
    toggleModal();
  };

  const handleUpdateStaffType = (event) => {
    event.preventDefault();
    const updatedStaffType = {
      id: selectedStaffType.id,
      type: event.target.staffType.value,
    };

    setStaffTypes((prevStaffTypes) =>
      prevStaffTypes.map((staffType) =>
        staffType.id === selectedStaffType.id ? updatedStaffType : staffType
      )
    );
    setSelectedStaffType(null);
    toggleModal();
  };

  const handleDeleteStaffType = (staffTypeId) => {
    setStaffTypes((prevStaffTypes) =>
      prevStaffTypes.filter((staffType) => staffType.id !== staffTypeId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Chức vụ</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm chức vụ
        </button>
      </div>
      <h2 style={{ marginLeft: '10px', }}>Danh sách chức vụ</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Chức vụ</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffTypes.map((staffType) => (
              <tr key={staffType.id}>
                <td>{staffType.id}</td>
                <td>{staffType.type}</td>
                <td>
                  <button
                    onClick={() => handleEditStaffType(staffType)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#2e3f50",
                    }}
                    className={cx("btn", "btn-primary", "mr-2")}
                  >
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} />
                  </button>
                  <button
                    onClick={() => handleDeleteStaffType(staffType.id)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "Red",
                    }}
                    className={cx("btn", "btn-primary")}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={cx("icon")}
                    />
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
              {selectedStaffType ? "Sửa chức vụ" : "Thêm chức vụ"}
            </h3>
            <div className={cx("formWrapper")}>
              <div
              >
                <div className={cx("inputWrapper")}>
                  <label htmlFor="chucvu">Tên chức vụ:</label>
                  <input
                    type="text"
                    name="staffType"
                    onChange={(e) => { setPositionValue(e.target.value) }
                    }
                    value={positionValue}
                    className={cx("form-control")}
                    placeholder="Nhập chức vụ"
                    maxLength={50}
                    required
                  />
                  <div className={cx("buttonWrapper")}>
                    {
                      selectedStaffType ? (
                        <button
                          className={cx("addButton", "btn")}
                          style={{
                            marginRight: "8px",
                            backgroundColor: "#2e3f50",
                          }}
                          onClick={handleUpdateStaffType}
                        >
                          Sửa
                        </button>
                      ) : (<button
                        className={cx("addButton", "btn")}
                        style={{
                          marginRight: "8px",
                          backgroundColor: "#2e3f50",
                        }}
                        onClick={handleAddStaffType}
                      >
                        Thêm
                      </button>)
                    }



                    <button
                      type="button"
                      className={cx("cancelButton", "btn", "btn-danger")}
                      onClick={toggleModal}

                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffType;
