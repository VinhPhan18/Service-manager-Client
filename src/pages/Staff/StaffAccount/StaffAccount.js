import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './StaffAccount.module.scss';
import * as staffServices from '~/services/staffServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';
import GetStaff from '~/components/GetStaff/GetStaff';


export default function StaffAccount({ openStaffAccountModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [staffs, setStaffs] = useState("")
  const [staffaccountList, setStaffAccountList] = useState([]);
  const [editingStaffAccount, setEditingStaffAccount] = useState("");
  const [editingStaffAccountName, setEditingStaffAccountName] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [nhanvien, setNhanvien] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaffAccount(null);
  };

  // GET STAFFS DATA


  const handleSubmit = () => {

    const newStaffAccount = {
      username,
      password,
      role,
      nhanvien
    };

    const loginStaffAccount = async () => {
      const res = await staffServices.loginStaffAccount(newStaffAccount)
      console.log(res)
    }
    loginStaffAccount()

  };

  const handlechangePasswordStaffAccount = () => {
    const changePasswordStaffAccount = {
      _id: editingStaffAccount,
      username: editingStaffAccountName,
      password: editingStaffAccountName,
      role: editingStaffAccountName,
      nhanvien: editingStaffAccountName

    };
    const fetchApi = async () => {
      const res = await staffServices.changePasswordStaffAccount(changePasswordStaffAccount)
      console.log(res)
    }
    fetchApi()

  };

  const handleEditClick = (staffaccountId) => {

    setIsModalOpen(true);
  };

  return (
    <div >

      <Modal closeModal={openStaffAccountModal}>
        <div className={cx("wrapper")}>

          <h1>Loại </h1>
          <div className={cx('tableActions')}>
            <Button onClick={toggleModal} primary>Thêm Tài Khoản</Button>
          </div>
          <h2>Danh sách Tài Khoản</h2>
          <div className={cx('tableWrapper')}>
            <table className={cx('table')}>
              <thead>
                <tr>
                  <th>Tài Khoản</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {staffaccountList && staffaccountList.map((staffaccount) => (
                  <tr key={staffaccount._id}>
                    <td>{staffaccount.id}</td>
                    <td>{staffaccount.name}</td>
                    <td>
                      <button onClick={() => {
                        setEditingStaffAccount(staffaccount._id)
                        setEditingStaffAccountName(staffaccount.name)
                        handleEditClick()
                      }} className={cx("icon")}>
                        <FontAwesomeIcon icon={faEdit} /> Chi tiết
                      </button>
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
              <h3>Thêm tài khoản</h3>
            </div>
            <div className={cx("formContent")} >
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="name">Tên đăng nhập:</label>
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
                <label className={cx("formTitle")} htmlFor="password">Mật khẩu:</label>
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
                Quyền:
                <select className={cx("formTitle")} value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Trưởng phòng">Trưởng phòng</option>
                  <option value="Nhân viên">Nhân viên</option>
                </select>
              </div>

              <div className={cx("formGroup")}>
                <span>Nhân viên</span>
                <div className={cx("box")}>
                  <input type="text" placeholder='Nhập tên nhân viên muốn tìm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                  <GetStaff value={staffs} setValue={setStaffs} searchValue={searchValue} />
                </div>
              </div>
            </div>
            {/* <div className={cx("formGroupbutton")}>
              {
                editingStaffAccount ? (
                  <Button onClick={handlechangePasswordStaffAccount} primary small>Cập nhật</Button>

                ) : (

                  <Button onClick={handleSubmit} primary small>Thêm</Button>
                )
              }
              <Button onClick={toggleModal} primary small>Hủy</Button>
            </div> */}

          </div>
        </Modal>
      )}
    </div>
  );
}
