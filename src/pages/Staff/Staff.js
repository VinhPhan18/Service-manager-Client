import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Staff.module.scss';
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Staff() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaff(null);
  };

  const handlePhoneNumberInput = (e) => {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateRandomId = () => {
    return Math.floor(100 + Math.random() * 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsEmailValid(isValid);
    if (isValid) {
      const newStaff = {
        _id: generateRandomId(),
        hoten: e.target.hoten.value,
        email: e.target.email.value,
        sdt: e.target.sdt.value,
        diachi: e.target.diachi.value,
        chucvu: e.target.chucvu.value,
        ngaysinh: e.target.ngaysinh.value,
        ngayvaolam: e.target.ngayvaolam.value,
        cccd: e.target.cccd.value,
        phongban: e.target.phongban.value,
        tinh: e.target.tinh.value,
        phuong: e.target.phuong.value,
        xa: e.target.xa.value,
      };

      setStaffList([...staffList, newStaff]);

      e.target.reset();
      setEmail('');
      toggleModal();
    } else {
      console.log('Email không đúng định dạng');
    }
  };

  const handleUpdateStaff = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsEmailValid(isValid);
    if (isValid) {
      const updatedStaff = {
        _id: editingStaff._id,
        hoten: e.target.hoten.value || editingStaff.hoten,
        email: e.target.email.value || editingStaff.email,
        sdt: e.target.sdt.value || editingStaff.sdt,
        diachi: e.target.diachi.value || editingStaff.diachi,
        chucvu: e.target.chucvu.value || editingStaff.chucvu,
        ngaysinh: e.target.ngaysinh.value || editingStaff.ngaysinh,
        ngayvaolam: e.target.ngayvaolam.value || editingStaff.ngayvaolam,
        cccd: e.target.cccd.value || editingStaff.cccd,
        phongban: e.target.phongban.value || editingStaff.phongban,
        tinh: e.target.tinh.value || editingStaff.tinh,
        phuong: e.target.phuong.value || editingStaff.phuong,
        xa: e.target.xa.value || editingStaff.xa,
      };

      const updatedStaffList = staffList.map((staff) => {
        if (staff._id === updatedStaff._id) {
          return updatedStaff;
        }
        return staff;
      });

      setStaffList(updatedStaffList);

      e.target.reset();
      setEmail('');
      toggleModal();
    } else {
      console.log('Email không đúng định dạng');
    }
  };

  const handleEditClick = (staffId) => {
    const editedStaff = staffList.find((staff) => staff._id === staffId);
    setEditingStaff(editedStaff);

    setIsModalOpen(true);
    setEmail(editedStaff.email); // Set the email value when opening the modal for editing
  };

  const handleDeleteStaff = (staffId) => {
    const updatedStaffList = staffList.filter((staff) => staff._id !== staffId);
    setStaffList(updatedStaffList);
  };

  return (
    <div className={cx('wrapper')}>
      <h1>Nhân Viên</h1>
      <div className={cx('tableActions')}>
        <button onClick={toggleModal} style={{borderRadius:'7px',}} >Thêm Nhân Viên</button>       
      </div> 
      <h2 className='lí'>Danh sách Nhân Viên</h2>
      <div className={cx('tableWrapper')}>
        <table className={cx('table')}>
          <thead>
          <tr>
              <th>ID</th>
              <th>Tên nhân viên</th>
              <th>Email</th>
              <th>SDT</th>
              <th>Địa chỉ</th>
              <th>Chức vụ</th>
              <th>Ngày sinh</th>
              <th>Ngày vào làm</th>
              <th>Căn cước công dân</th>
              <th>Phòng ban</th>
              <th>Tỉnh</th>
              <th>Phường</th>
              <th>Xã</th>
              <th>Thao tác</th>
          </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff._id}>
                <td >{staff._id}</td>
                <td>{staff.hoten}</td>
                <td>{staff.email}</td>
                <td>{staff.sdt}</td>
                <td>{staff.diachi}</td>
                <td>{staff.chucvu}</td>
                <td>{staff.ngaysinh}</td>
                <td>{staff.ngayvaolam}</td>
                <td>{staff.cccd}</td>
                <td>{staff.phongban}</td>
                <td>{staff.tinh}</td>
                <td>{staff.phuong}</td>
                <td>{staff.xa}</td>
                <td>
                  <button onClick={() => handleEditClick(staff._id)}>
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} /> Sửa
                  </button>
                  <button onClick={() => handleDeleteStaff(staff._id)}>
                     <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={cx('modal')}>
          <div className={cx('modalContent')}>
              <button
              className={cx("closeButton")}
              onClick={toggleModal}
              style={{ backgroundColor: "white", color: "red", fontSize: '35px', marginLeft: 'auto', marginTop: -30 }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3 style={{marginTop:'-60px',}}> {editingStaff ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h3>
          
            <form onSubmit={editingStaff ? handleUpdateStaff : handleSubmit}>
              <div className={cx('formGroup')}>
                <label htmlFor="hoten">Tên nhân viên:</label>
                <input
                  placeholder="Nhập tên nhân viên..."
                  maxLength={30}
                  type="text"
                  id="hoten"
                  defaultValue={editingStaff ? editingStaff.hoten : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="ngaysinh">Ngày sinh:&emsp;&emsp;</label>
                <input
                  placeholder="Nhập ngày sinh..."
                  type="date"
                  id="ngaysinh"
                  defaultValue={editingStaff ? editingStaff.ngaysinh : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="sdt">Số điện thoại:</label>
                <input
                  placeholder="Nhập số điện thoại..."
                  maxLength={10}
                  type="tel"
                  id="sdt"
                  onKeyPress={handlePhoneNumberInput}
                  defaultValue={editingStaff ? editingStaff.sdt : ''}
                  required
                />
              </div>
              
              <div className={cx('formGroup')}>
                <label htmlFor="diachi">Địa chỉ: &emsp;&emsp;</label>
                <input
                  placeholder="Nhập địa chỉ..."
                  maxLength={100}
                  type="text"
                  id="diachi"
                  defaultValue={editingStaff ? editingStaff.diachi : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="cccd">Căn cước công dân:</label>
                <input
                  placeholder="Nhập căn cước công dân..."
                  type="tel"
                  maxLength={12}
                  id="cccd"
                  onKeyPress={handlePhoneNumberInput}
                  defaultValue={editingStaff ? editingStaff.cccd : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="chucvu">Chức vụ: &nbsp; </label>
                <select id="chucvu" defaultValue={editingStaff ? editingStaff.chucvu : ''} style={{ borderRadius:'25px', height:'25px', fontSize:'13px'}} required>
                  <option value="">Chọn Chức vụ</option>
                  <option value="chucvu1">Chức vụ 1</option>
                  <option value="chucvu2">Chức vụ 2</option>
                  <option value="chucvu3">Chức vụ</option>
                </select>
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="email">Email:&emsp;&emsp;&emsp;&emsp;</label>
                <input
                  placeholder="Nhập email..."
                  maxLength={30}
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={cx({ invalid: !isEmailValid })}
                  required
                />
                {!isEmailValid && <span className={cx('error')}>Email không đúng định dạng</span>}
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="tinh">Tỉnh:  &nbsp; </label>
                <select id="tinh" defaultValue={editingStaff ? editingStaff.tinh : ''} style={{ borderRadius:'25px',  height:'25px', fontSize:'13px'}} required>
                  <option value="">Chọn tỉnh</option>
                  <option value="tinh1">tỉnh 1</option>
                  <option value="tinh2">tỉnh 2</option>
                  <option value="tinh3">tỉnh 3</option>
                </select>
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="phongban">Phòng ban:</label>
                <input
                  placeholder="Nhập phòng ban..."
                  maxLength={50}
                  type="text"
                  id="phongban"
                  defaultValue={editingStaff ? editingStaff.phongban : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="phuong">Phường:&nbsp;  </label>
                <select id="phuong" defaultValue={editingStaff ? editingStaff.phuong : ''} style={{ borderRadius:'25px',  height:'25px', fontSize:'13px'}} required>
                  <option value="">Chọn phường</option>
                  <option value="phuong1">phường 1</option>
                  <option value="phuong2">phường 2</option>
                  <option value="phuong3">phường 3</option>
                </select>
              </div>
              
              <div className={cx('formGroup')}>
                <label htmlFor="ngayvaolam">Ngày vào làm:</label>
                <input
                  placeholder="Nhập ngày vào làm..."
                  type="date"
                  id="ngayvaolam"
                  defaultValue={editingStaff ? editingStaff.ngayvaolam : ''}
                  required
                />
              </div> 
              <div className={cx('formGroup')}>
                <label htmlFor="xa">Xã:&nbsp;  </label>
                <select id="xa" defaultValue={editingStaff ? editingStaff.xa : ''} style={{ borderRadius:'25px',  height:'25px', fontSize:'13px'}} required>
                  <option value="">Chọn xã</option>
                  <option value="xa1">Xã 1</option>
                  <option value="xa2">Xã 2</option>
                  <option value="xa3">Xã 3</option>
                </select>
              </div>
              
              <div className={cx('formGroupbutton')}>
                <button type="submit" className={cx('formGroupsubmit')} >{editingStaff ? 'Cập nhật' : 'Thêm'}</button>&nbsp;&nbsp;&nbsp; &nbsp;
                <button type="button" className={cx('formGroupbuttons')} onClick={toggleModal}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 