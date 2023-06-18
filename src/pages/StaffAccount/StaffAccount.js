import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import style from "./StaffAccount.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const StaffAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [selectedStaffAccount, setSelectedStaffAccount] = useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách tài khoản nhân viên khi component được load
    fetchStaffAccounts();
  }, []);

  const fetchStaffAccounts = async () => {
    try {
      const response = await axios.get("/api/staff-accounts");
      setStaffAccounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddStaffAccount = async (event) => {
    event.preventDefault();
    const staffAccount = {
      username: event.target.username.value,
      password: event.target.password.value,
      role: event.target.role.value,
      nhanvien: event.target.nhanvien.value,
    };

    try {
      const response = await axios.post("/api/staff-accounts", staffAccount);
      setStaffAccounts([...staffAccounts, response.data]);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStaffAccount = (staffAccount) => {
    setSelectedStaffAccount(staffAccount);
    toggleModal();
  };

  const handleUpdateStaffAccount = async (event) => {
    event.preventDefault();
    const updatedStaffAccount = {
      username: event.target.username.value,
      password: event.target.password.value,
      role: event.target.role.value,
      nhanvien: event.target.nhanvien.value,
    };

    try {
      const response = await axios.put(`/api/staff-accounts/${selectedStaffAccount._id}`, updatedStaffAccount);
      setStaffAccounts((prevStaffAccounts) =>
        prevStaffAccounts.map((staffAccount) =>
          staffAccount._id === selectedStaffAccount._id ? response.data : staffAccount
        )
      );
      setSelectedStaffAccount(null);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStaffAccount = async (staffAccountId) => {
    try {
      await axios.delete(`/api/staff-accounts/${staffAccountId}`);
      setStaffAccounts((prevStaffAccounts) =>
        prevStaffAccounts.filter((staffAccount) => staffAccount._id !== staffAccountId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Tài khoản nhân viên</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm tài khoản
        </button>
      </div>
      <h2>Danh sách tài khoản</h2>
      <div className={cx("tableWrapper")}>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Tên tài khoản</th>
              <th style={{ width: "auto" }}>Mật khẩu</th>
              <th style={{ width: "auto" }}>Vai trò</th>
              <th style={{ width: "auto" }}>Nhân viên</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffAccounts.map((staffAccount) => (
              <tr key={staffAccount.id}>
                <td>{staffAccount.id}</td>
                <td>{staffAccount.username}</td>
                <td>{staffAccount.password}</td>
                <td>{staffAccount.role}</td>
                <td>{staffAccount.nhanvien}</td>
                <td>
                  <button
                    onClick={() => handleEditStaffAccount(staffAccount)}
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
                    onClick={() => handleDeleteStaffAccount(staffAccount.id)}
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
                marginTop: "-40px",
                marginRight:"-810px",
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>
              {selectedStaffAccount ? "Sửa tài khoản nhân viên" : "Thêm tài khoản"}
            </h3>
            <div className={cx("formWrapper")}>
              <form
                onSubmit={
                  selectedStaffAccount
                    ? handleUpdateStaffAccount
                    : handleAddStaffAccount
                }
              >
                <div className={cx("inputWrapper")}>
                  <label htmlFor="username">Tên tài khoản:</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={
                      selectedStaffAccount ? selectedStaffAccount.username : ""
                    }
                    className={cx("form-control")}
                    placeholder="Nhập tên tài khoản"
                    maxLength={30}
                    required
                  />
                </div>
                <div className={cx("inputWrapper")}>
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    type="text" 
                    name="password"
                    defaultValue={
                      selectedStaffAccount ? selectedStaffAccount.password : ""
                    }
                    className={cx("form-control")}
                    placeholder="Nhập mật khẩu"
                    maxLength={30}
                    required
                  />
                </div>
                <div className={cx("inputWrapper")}>
                  <label htmlFor="role">Vai trò:</label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={selectedStaffAccount ? selectedStaffAccount.role : ""}
                    className={cx("form-control")}
                    placeholder="Nhập vai trò"
                    maxLength={30}
                    required
                  />
                </div>
                <div className={cx("inputWrapper")}>
                  <label htmlFor="nhanvien">Nhân viên:  &ensp;</label>
                  {/* Select box for employee */}
                  {/* Replace the options below with your own values */}
                  <select name="nhanvien" className={cx("form-control-staff")} required>
                    <option value="">Chọn nhân viên </option>
                    <option value="nhanvien1">Nhân viên 1</option>
                    <option value="nhanvien2">Nhân viên 2</option>
                    <option value="nhanvien3">Nhân viên 3</option>
                  </select>
                </div>
                <div className={cx("buttonWrapper")}>
                  <button
                    type="submit"
                    className={cx("addButton", "btn")}
                    style={{
                      marginRight: "8px",
                      backgroundColor: "#2e3f50",
                      color: "#FFFFFF",
                      transition: "background-color 0.5s",
                      animation: "buttonClickAnimation 0.4s",
                      marginLeft: "100px", // Added marginLeft property
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#FF9800";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#2e3f50";
                    }}
                  >
                    {selectedStaffAccount ? "Cập nhật" : "Thêm"}
                  </button>
                  <button
                    type="button"
                    className={cx("cancelButton", "btn", "btn-danger")}
                    onClick={toggleModal}
                    style={{
                      backgroundColor: "red",
                      color: "#FFFFFF",
                      transition: "background-color 0.5s",
                      animation: "buttonClickAnimation 0.4s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#FF9800";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#da2912";
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default StaffAccount;
