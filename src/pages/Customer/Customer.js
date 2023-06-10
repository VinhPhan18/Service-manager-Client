import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Customer.module.scss';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

export default function Customer() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCustomer(null);
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
      const newCustomer = {
        _id: generateRandomId(),
        name: e.target.name.value,
        email: e.target.email.value,
        sdt: e.target.sdt.value,
        diachi: e.target.diachi.value,
        masothue: e.target.masothue.value,
        mota: e.target.mota.value,
        website: e.target.website.value,
        ngaytaokh: e.target.ngaytaokh.value,
        thongtinkhac: e.target.thongtinkhac.value,
        stk: e.target.stk.value,
        nguoidaidien: e.target.nguoidaidien.value,
        chucvundd: e.target.chucvundd.value,
        sdtndd: e.target.sdtndd.value,
        loaikhachhang: e.target.loaikhachhang.value,
        tinh: e.target.tinh.value,
        phuong: e.target.phuong.value,
        xa: e.target.xa.value,
        nhanvien: e.target.nhanvien.value,
        nguoilienhe: e.target.nguoilienhe.value,
      };

      setCustomerList([...customerList, newCustomer]);

      e.target.reset();
      setEmail('');
      toggleModal();
    } else {
      console.log('Email không đúng định dạng');
    }
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsEmailValid(isValid);
    if (isValid) {
      const updatedCustomer = {
        _id: editingCustomer._id,
        name: e.target.name.value || editingCustomer.name,
        email: e.target.email.value || editingCustomer.email,
        sdt: e.target.sdt.value || editingCustomer.sdt,
        diachi: e.target.diachi.value || editingCustomer.diachi,
        masothue: e.target.masothue.value || editingCustomer.masothue,
        mota: e.target.mota.value || editingCustomer.mota,
        website: e.target.website.value || editingCustomer.website,
        ngaytaokh: e.target.ngaytaokh.value || editingCustomer.ngaytaokh,
        thongtinkhac: e.target.thongtinkhac.value || editingCustomer.thongtinkhac,
        stk: e.target.stk.value || editingCustomer.stk,
        nguoidaidien: e.target.nguoidaidien.value || editingCustomer.nguoidaidien,
        chucvundd: e.target.chucvundd.value || editingCustomer.chucvundd,
        sdtndd: e.target.sdtndd.value || editingCustomer.sdtndd,
        loaikhachhang: e.target.loaikhachhang.value || editingCustomer.loaikhachhang,
        tinh: e.target.tinh.value || editingCustomer.tinh,
        phuong: e.target.phuong.value || editingCustomer.phuong,
        xa: e.target.xa.value || editingCustomer.xa,
        nhanvien: e.target.nhanvien.value || editingCustomer.nhanvien,
        nguoilienhe: e.target.nguoilienhe.value || editingCustomer.nguoilienhe,
      };
      const updatedCustomerList = customerList.map((customer) => {
        if (customer._id === updatedCustomer._id) {
          return updatedCustomer;
        }
        return customer;
      });

      setCustomerList(updatedCustomerList);

      e.target.reset();
      setEmail('');
      toggleModal();
    } else {
      console.log('Email không đúng định dạng');
    }
  };

  const handleEditClick = (customerId) => {
    const editedCustomer = customerList.find((customer) => customer._id === customerId);
    setEditingCustomer(editedCustomer);

    setIsModalOpen(true);
    setEmail(editedCustomer.email); // Set the email value when opening the modal for editing
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedCustomerList = customerList.filter((customer) => customer._id !== customerId);
    setCustomerList(updatedCustomerList);
  };

  return (
    <div className={cx('wrapper')}>
      <h1>Khách Hàng</h1>
      <div className={cx('tableActions')}>
        <button onClick={toggleModal}>Thêm Khách Hàng</button>
      </div>
      <h2 className='lí'>Danh sách Khách Hàng</h2>
      <div className={cx('tableWrapper')}>
        <table className={cx('table')}>
          <thead>
            <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Mã số thuế</th>
            <th>Mô tả</th>
            <th>Website</th>
            <th>Ngày tạo KH</th>
            <th>Thông tin khác</th>
            <th>Số tài khoản</th>
            <th>Người đại diện</th>
            <th>Chức vụ NĐĐ</th>
            <th>SDT NĐĐ</th>
            <th>Loại khách hàng</th>
            <th>Tỉnh</th>
            <th>Phường</th>
            <th>Xã</th>
            <th>Nhân viên</th>
            <th>Người liên hệ</th>
            <th>Thao tác</th>

            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => (
              <tr key={customer._id}>
                <td>{customer._id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.sdt}</td>
                <td>{customer.diachi}</td>
                <td>{customer.masothue}</td>
                <td>{customer.mota}</td>
                <td>{customer.website}</td>
                <td>{customer.ngaytaokh}</td>
                <td>{customer.thongtinkhac}</td>
                <td>{customer.stk}</td>
                <td>{customer.nguoidaidien}</td>
                <td>{customer.chucvundd}</td>
                <td>{customer.sdtndd}</td>
                <td>{customer.loaikhachhang}</td>
                <td>{customer.tinh}</td>
                <td>{customer.phuong}</td>
                <td>{customer.xa}</td>
                <td>{customer.nhanvien}</td>
                <td>{customer.nguoilienhe}</td>

                <td>
                  <button onClick={() => handleEditClick(customer._id)} className={cx('editButton')}>
                    <FaEdit /> Sửa
                  </button>
                  <button onClick={() => handleDeleteCustomer(customer._id)} className={cx('deleteButton')}>
                    <FaTrash /> Xóa
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
            <h3>{editingCustomer ? 'Sửa Khách Hàng' : 'Thêm Khách Hàng'}</h3>
            <button
              className={cx('closeButton')}
              onClick={toggleModal}
              style={{ backgroundColor: 'white', color: 'red', marginLeft:'1240px', marginTop:'-103px', fontSize:'35px'}}
            >
              <FaTimes />
            </button>
            <form onSubmit={editingCustomer ? handleUpdateCustomer : handleSubmit}>
              <div className={cx('formGroup')}>
                <label htmlFor="name">Tên Khách Hàng:</label>
                <input
                  placeholder="Nhập tên khách hàng..."
                  maxLength={30}
                  type="text"
                  id="name"
                  defaultValue={editingCustomer ? editingCustomer.name : ''}
                  required
                />
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
                <label htmlFor="sdt">Số điện thoại:</label>
                <input
                  placeholder="Nhập số điện thoại..."
                  maxLength={10}
                  type="tel"
                  id="sdt"
                  onKeyPress={handlePhoneNumberInput}
                  defaultValue={editingCustomer ? editingCustomer.sdt : ''}
                  required
                />
              </div>
              
              <div className={cx('formGroup')}>
                <label htmlFor="diachi">Địa chỉ:</label>
                <input
                  placeholder="Nhập địa chỉ văn phòng..."
                  maxLength={100}
                  type="text"
                  id="diachi"
                  defaultValue={editingCustomer ? editingCustomer.diachi : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="masothue">Mã số thuế:</label>
                <input
                  placeholder="Nhập mã số thuế..."
                  maxLength={13}
                  type="tel"
                  id="masothue"
                  onKeyPress={handlePhoneNumberInput}
                  defaultValue={editingCustomer ? editingCustomer.masothue : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="mota">Mô tả:</label>
                <input
                  placeholder="Nhập mô tả..."
                  maxLength={200}
                  type="text"
                  id="mota"
                  defaultValue={editingCustomer ? editingCustomer.mota : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="website">Website:</label>
                <input
                  placeholder="Nhập link..."
                  maxLength={500}
                  type="url"
                  id="website"
                  defaultValue={editingCustomer ? editingCustomer.website : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="ngaytaokh">Ngày tạo:</label>
                <input
                  type="date"
                  id="ngaytaokh"
                  defaultValue={editingCustomer ? editingCustomer.ngaytaokh : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="thongtinkhac">Thông tin khác:</label>
                <input
                  placeholder="Nhập thông tin khách..."
                  type="text"
                  id="thongtinkhac"
                  defaultValue={editingCustomer ? editingCustomer.thongtinkhac : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="stk">Số tài khoản:</label>
                <input
                  placeholder="Nhập số tài khoản..."
                  type="tel"
                  maxLength={15}
                  id="stk"
                  onKeyPress={handlePhoneNumberInput}
                  defaultValue={editingCustomer ? editingCustomer.stk : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="nguoidaidien">Người đại diện:</label>
                <input
                  placeholder="Nhập tên người đại diện..."
                  type="text"
                  maxLength={30}
                  id="nguoidaidien"
                  defaultValue={editingCustomer ? editingCustomer.nguoidaidien : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="chucvundd">Chức vụ người đại điện:  </label>
                <select 
                id="chucvundd" 
                defaultValue={editingCustomer ? editingCustomer.chucvundd : ''} 
                style={{
                  borderRadius:'25px',
                   height:'40px',
                    padding:'10px',
                     fontSize:'15px'
                     }
                    } required>
                  <option value="">Chọn Chức vụ</option>
                  <option value="chucvu1">Chức vụ ndd 1</option>
                  <option value="chucvu2">Chức vụ ndd 2</option>
                  <option value="chucvu3">Chức vụ ndd 3</option>
                </select>
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="sdtndd">SĐT người đại diện:</label>
                <input
                  placeholder="Nhập số điện thoại người đại diện..."
                  maxLength={10}
                  type="tel"
                  id="sdtndd"
                  onKeyPress={handlePhoneNumberInput}
                  defaultValue={editingCustomer ? editingCustomer.sdtndd : ''}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="loaikhachhang">Loại khách hàng:  </label>
                <select id="loaikhachhang" defaultValue={editingCustomer ? editingCustomer.loaikhachhang : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn Loại khách hàng</option>
                  <option value="loaikhachhang1">Loại khách hàng 1</option>
                  <option value="loaikhachhang2">Loại khách hàng 2</option>
                  <option value="loaikhachhang3">Loại khách hàng 3</option>
                </select>
              </div>
              <div className={cx('formGroup')}>
                <label htmlFor="tinh">Tỉnh:  </label>
                <select id="tinh" defaultValue={editingCustomer ? editingCustomer.tinh : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn tỉnh</option>
                  <option value="tinh1">tỉnh 1</option>
                  <option value="tinh2">tỉnh 2</option>
                  <option value="tinh3">tỉnh 3</option>
                </select>
              </div>
             
              <div className={cx('formGroup')}>
                <label htmlFor="nguoilienhe">Người liên hệ: </label>
                <select id="nguoilienhe" defaultValue={editingCustomer ? editingCustomer.nguoilienhe : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn người liên hệ</option>
                  <option value="nguoilienhe1">Người liên hệ 1</option>
                  <option value="nguoilienhe2">Người liên hệ 2</option>
                  <option value="nguoilienhe3">Người liên hệ 3</option>
                </select>
              </div>
              
              <div className={cx('formGroup')}>
                <label htmlFor="phuong">Phường:  </label>
                <select id="phuong" defaultValue={editingCustomer ? editingCustomer.phuong : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn phường</option>
                  <option value="phuong1">phường 1</option>
                  <option value="phuong2">phường 2</option>
                  <option value="phuong3">phường 3</option>
                </select>
              </div>

              <div className={cx('formGroup')}>
                <label htmlFor="nhanvien">Nhân viên: </label>
                <select id="nhanvien" defaultValue={editingCustomer ? editingCustomer.nhanvien : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn xã</option>
                  <option value="nhanvien1">Nhân viên 1</option>
                  <option value="nhanvien2">Nhân viên 2</option>
                  <option value="nhanvien3">Nhân viên 3</option>
                </select>
              </div>
              
              <div className={cx('formGroup')}>
                <label htmlFor="xa">Xã: </label>
                <select id="xa" defaultValue={editingCustomer ? editingCustomer.xa : ''} style={{ borderRadius:'25px', height:'40px', padding:'10px', fontSize:'15px'}} required>
                  <option value="">Chọn xã</option>
                  <option value="xa1">Xã 1</option>
                  <option value="xa2">Xã 2</option>
                  <option value="xa3">Xã 3</option>
                </select>
              </div>

              <div className={cx('formGroupbutton')}>
                <button type="submit" className={cx('formGroupsubmit')} >{editingCustomer ? 'Cập nhật' : 'Thêm'}</button>&nbsp;&nbsp;&nbsp; &nbsp;
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