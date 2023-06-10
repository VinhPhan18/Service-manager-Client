import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './StaffType.module.scss';
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function StaffType() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [StaffTypeList, setStaffTypeList] = useState([]);
  const [editingStaffType, setEditingStaffType] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaffType(null);
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
      const newStaffType= {
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

      setStaffTypeList([...StaffTypeList, newStaffType]);

      e.target.reset();
      setEmail('');
      toggleModal();
    } else {
      console.log('Email không đúng định dạng');
    }
  };

  const handleUpdateStaffType= (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsEmailValid(isValid);
    if (isValid) {
      const updatedStaffType= {
        _id: editingStaffType._id,
        hoten: e.target.hoten.value || editingStaffType.hoten,
        email: e.target.email.value || editingStaffType.email,
        sdt: e.target.sdt.value || editingStaffType.sdt,
        diachi: e.target.diachi.value || editingStaffType.diachi,
        chucvu: e.target.chucvu.value || editingStaffType.chucvu,
        ngaysinh: e.target.ngaysinh.value || editingStaffType.ngaysinh,
        ngayvaolam: e.target.ngayvaolam.value || editingStaffType.ngayvaolam,
        cccd: e.target.cccd.value || editingStaffType.cccd,
        phongban: e.target.phongban.value || editingStaffType.phongban,
        tinh: e.target.tinh.value || editingStaffType.tinh,
        phuong: e.target.phuong.value || editingStaffType.phuong,
        xa: e.target.xa.value || editingStaffType.xa,
      };

      const updatedStaffTypeList = StaffTypeList.map((StaffType) => {
        if (StaffType._id === updatedStaffType._id) {
          return updatedStaffType;
        }
        return StaffType;
      });

      setStaffTypeList(updatedStaffTypeList);

      e.target.reset();
      setEmail('');
      toggleModal();
    } else {
      console.log('Email không đúng định dạng');
    }
  };

  const handleEditClick = (StaffTypeId) => {
    const editedStaffType= StaffTypeList.find((StaffType) => StaffType._id === StaffTypeId);
    setEditingStaffType(editedStaffType);

    setIsModalOpen(true);
    setEmail(editedStaffType.email); // Set the email value when opening the modal for editing
  };

  const handleDeleteStaffTypeType= (StaffTypeId) => {
    const updatedStaffTypeList = StaffTypeList.filter((StaffType) => StaffType._id !== StaffTypeId);
    setStaffTypeList(updatedStaffTypeList);
  };

  return (
    <div className={cx('wrapper')}>
      <h1>gjh </h1>
      <h1>Nhân Viên</h1>
      <div className={cx('tableActions')}>
        <button onClick={toggleModal}>Thêm Nhân Viên</button>       
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
            {StaffTypeList.map((StaffType) => (
              <tr key={StaffType._id}>
                <td>{StaffType._id}</td>
                <td>{StaffType.hoten}</td>
                <td>{StaffType.email}</td>
                <td>{StaffType.sdt}</td>
                <td>{StaffType.diachi}</td>
                <td>{StaffType.chucvu}</td>
                <td>{StaffType.ngaysinh}</td>
                <td>{StaffType.ngayvaolam}</td>
                <td>{StaffType.cccd}</td>
                <td>{StaffType.phongban}</td>
                <td>{StaffType.tinh}</td>
                <td>{StaffType.phuong}</td>
                <td>{StaffType.xa}</td>
                <td>
                  <button onClick={() => handleEditClick(StaffType._id)}>
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} /> Sửa
                  </button>
                  <button onClick={() => handleDeleteStaffTypeType(StaffType._id)}>
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
              style={{ backgroundColor: "white", color: "red", fontSize: '35px', marginLeft: 'auto', marginTop: 0 }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{editingStaffType? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h3>
          
            <form onSubmit={editingStaffType? handleUpdateStaffType: handleSubmit}>
              <div className={cx('formGroup')}>
                <label htmlFor="hoten">Tên nhân viên:</label>
                <input
                  placeholder="Nhập tên nhân viên..."
                  maxLength={30}
                  type="text"
                  id="hoten"
                  defaultValue={editingStaffType? editingStaffType.hoten : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="ngaysinh">Ngày sinh:</label>
                <input
                  placeholder="Nhập ngày sinh..."
                  type="date"
                  id="ngaysinh"
                  defaultValue={editingStaffType? editingStaffType.ngaysinh : ''}
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
                  defaultValue={editingStaffType? editingStaffType.sdt : ''}
                  required
                />
              </div>
              
              <div className={cx('formGroup')}>
                <label htmlFor="diachi">Địa chỉ:</label>
                <input
                  placeholder="Nhập địa chỉ..."
                  maxLength={100}
                  type="text"
                  id="diachi"
                  defaultValue={editingStaffType? editingStaffType.diachi : ''}
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
                  defaultValue={editingStaffType? editingStaffType.cccd : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="chucvu">Chức vụ:  </label>
                <select id="chucvu" defaultValue={editingStaffType? editingStaffType.chucvu : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn Chức vụ</option>
                  <option value="chucvu1">Chức vụ 1</option>
                  <option value="chucvu2">Chức vụ 2</option>
                  <option value="chucvu3">Chức vụ</option>
                </select>
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="email">Email:</label>
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
                <label htmlFor="tinh">Tỉnh:  </label>
                <select id="tinh" defaultValue={editingStaffType ? editingStaffType.tinh : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
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
                  defaultValue={editingStaffType ? editingStaffType.phongban : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="phuong">Phường:  </label>
                <select id="phuong" defaultValue={editingStaffType ? editingStaffType.phuong : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
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
                  defaultValue={editingStaffType ? editingStaffType.ngayvaolam : ''}
                  required
                />
              </div> 
              <div className={cx('formGroup')}>
                <label htmlFor="xa">Xã: </label>
                <select id="xa" defaultValue={editingStaffType ? editingStaffType.xa : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn xã</option>
                  <option value="xa1">Xã 1</option>
                  <option value="xa2">Xã 2</option>
                  <option value="xa3">Xã 3</option>
                </select>
              </div>
              
              <div className={cx('formGroupbutton')}>
                <button type="submit" className={cx('formGroupsubmit')} >{editingStaffType ? 'Cập nhật' : 'Thêm'}</button>&nbsp;&nbsp;&nbsp; &nbsp;
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