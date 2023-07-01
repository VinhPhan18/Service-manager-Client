import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./StaffAccount.module.scss";
import * as staffServices from "~/services/staffServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";
import GetStaff from "~/components/GetStaff/GetStaff";

export default function StaffAccount({ data, openStaffAccountModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [staffs, setStaffs] = useState("");
  const [staffaccountList, setStaffAccountList] = useState([]);
  const [editingStaffAccount, setEditingStaffAccount] = useState("");
  const [editingStaffAccountName, setEditingStaffAccountName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [setsigninstaffaccountsuccessfully, setSigninStaffAccountSuccessfully] =
    useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Nhân viên");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [filter, setFilter] = useState("");
  const [totalPage, setTotalPage] = useState("");

  //NOTI
  const createStaffSuccessfully = () => toast(error);

  useEffect(() => {
    if (setsigninstaffaccountsuccessfully) {
      createStaffSuccessfully();

      setTimeout(() => {
        setSigninStaffAccountSuccessfully(false);
      }, 1000);
    }
  }, [setsigninstaffaccountsuccessfully]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaffAccount(null);
  };

  // GET STAFFS DATA

  useEffect(() => {
    const getStaffAccounts = async () => {
      const response = await staffServices.getStaffAccounts(filter);
      setStaffAccountList(response.accounts);
      setCurrentPage(response.currentPage);
      const pageArray = Array.from(
        { length: response.totalPages },
        (_, i) => i + 1
      );
      setTotalPage(pageArray);
      console.log(response);
    };
    getStaffAccounts();
  }, [filter]);
  // useEffect(() => {
  //   const getstaffAccount = async () => {
  //     const response = await staffServices.getstaffAccount();

  //     setStaffAccountList(response.getstaffAccount)
  //     console.log(response);
  //   }
  //   getstaffAccount();
  // },);

  const handleSubmit = () => {
    const newStaffAccount = {
      username,
      password,
      role,
      nhanvien: staffs,
      chucvu: data.role,
    };

    const signinStaffAccount = async () => {
      const res = await staffServices.signinStaffAccount(newStaffAccount);
      console.log(res);
      console.log(newStaffAccount);
      if (res.status) {
        setError(res.message);
        setSigninStaffAccountSuccessfully(true);
        toggleModal(false);
      } else {
        setError(res.message);
        setSigninStaffAccountSuccessfully(true);
      }
    };
    signinStaffAccount();
  };
// còn sài
  // const handlechangePasswordStaffAccount = () => {
  //   const changePasswordStaffAccount = {
  //     _id: editingStaffAccount,
  //     role: editingStaffAccountName,
  //   };

  //   const fetchApi = async () => {
  //     const res = await staffServices.changePasswordStaffAccount(
  //       changePasswordStaffAccount
  //     );
  //     console.log(res);
  //   };
  //   fetchApi();
  // };

  // const handleEditClick = (staffaccountId) => {
  //   setIsModalOpen(true);
  // };
console.log(staffaccountList)
  return (
    <div>
      <Modal closeModal={openStaffAccountModal}>
        <div className={cx("wrapper")}>
          <ToastContainer />
          <h1>Danh sách tài khoản</h1>
          <div className={cx("tableActions")}>
            <Button onClick={toggleModal} primary>
              Thêm Tài Khoản
            </Button>
          </div>
          <div className={cx("tableWrapper")}>
            <div className={cx("content")}>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>Tài Khoản</th>
                    {/* <th>Mật khẩu</th> */}
                    <th>Quyền</th>
                    <th>Nhân Viên</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {staffaccountList &&
                    staffaccountList.map((staffaccount) => (
                      <tr key={staffaccount._id}>
                        <td>{staffaccount.username}</td>
                        {/* <td>{staffaccount.password}</td>` */}
                        <td>{staffaccount.role}</td>
                        <td>{staffaccount.nhanvien.hoten}</td>
                        

                        <td>
                          <button
                            onClick={() => {
                              setEditingStaffAccount(staffaccount._id);
                              setEditingStaffAccountName(staffaccount.name);
                              // handleEditClick();
                            }}
                            className={cx("icon")}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={cx("modalWraper")}>
            <div className={cx("bigTitle")}>
              <h3>Thêm tài khoản</h3>
            </div>
            <div className={cx("formContent")}>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="name">
                  Tên đăng nhập:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên đăng nhập..."
                  maxLength={30}
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="password">
                  Mật khẩu:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập mật khẩu..."
                  maxLength={30}
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <div className={cx("form")}>
                  Quyền:
                  <select
                    className={cx("formTitle ", "formTitle-select")}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Nhân viên">Nhân viên</option>
                    <option value="Trưởng phòng">Trưởng phòng</option>
                  </select>
                </div>
              </div>

              <div className={cx("formGroup")}>
                <span>Tìm kiếm</span>
                <div className={cx("box")}>
                  <input
                    type="text"
                    placeholder="Nhập tên nhân viên muốn tìm"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("formGroup")}>
                <span>Nhân viên</span>
                <div className={cx("box")}>
                  <GetStaff
                    value={staffs}
                    setValue={setStaffs}
                    searchValue={searchValue}
                  />
                </div>
              </div>
            </div>
            <div className={cx("formGroupbutton")}>
              {editingStaffAccount ? (
                <Button
                  // onClick={handlechangePasswordStaffAccount}
                  primary
                  small
                >
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
