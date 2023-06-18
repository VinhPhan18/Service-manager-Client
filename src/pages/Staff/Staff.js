import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './Staff.module.scss';
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as staffServices from '~/services/staffServices';

export default function Staff() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listDistrictSort, setListDistrictSort] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [listWardSort, setListWardSort] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState({});
  const [districtSelected, setDistrictSelected] = useState('');
  const [wardsSelected, setWardsSelected] = useState('');
  const [positions, setPositions] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaff(null);
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        if (response && response.data) {
          setListProvince(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect (() =>{
    const getPosition = async () => {
      try {
        const response = await staffServices.getPosition();
        setPositions(response)
      } catch (error) {
        console.log(error);
      }
    }
    getPosition();
  },[])

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/d/');
        if (response && response.data) {
          setListDistrict(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDistricts();
  }, []);

  //xax
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/w/');
        if (response && response.data) {
          setListWards(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWards();
  }, []);


  const handleProvinceChange = async (event) => {
    const provinceCode = event.target.value
    const districtList = []

    for (let i = 0; i < listProvince.length; i++) {
      if (listProvince[i].code == provinceCode) {
        for (let j = 0; j < listDistrict.length; j++) {
          if (listDistrict[j].province_code == provinceCode) {
            districtList.push(listDistrict[j])
          }
        }
        setProvinceSelected(listProvince[i]);
        break;
      }
    }
    setListDistrictSort(districtList)
  };

  const handleDistrictChange = (event) => {
    const districtCode = event.target.value
    const wardList = []
    for (let i = 0; i < listDistrict.length; i++) {
      if (listDistrict[i].code == districtCode) {
        for (let j = 0; j < listWards.length; j++) {
          if (listWards[j].district_code == districtCode) {
            wardList.push(listWards[j])
          }
        }
        setDistrictSelected(listDistrict[i]);
        break;
      }
      setListWardSort(wardList);
    }

    
  };

  const handleWardsChange = (event) => {
    const wardCode = event.target.value
    for (let i = 0; i < listWards.length; i++) {
      if (listWards[i].code == wardCode) {
        setWardsSelected(listWards[i]);
          break;
      }
    }
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
                 {positions&&positions.map(position=> {
                  return (
                    <option key={position._id} value={position._id}>{position.name}</option>
                  )
                 })}
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
              <div className="formGroup">
              <label htmlFor="tinh">Tỉnh:</label>
        <select
          id="tinh"
          value={provinceSelected?.code || ""}
          onChange={handleProvinceChange}
          style={{ borderRadius: '25px', height: '40px', padding: '10px', fontSize: '15px' }}
          required
        >
          <option value="" disabled>
            Chọn tỉnh
          </option>
          {listProvince.map((province) => (
            
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
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
              <div className="formGroup">
        <label htmlFor="phuong">Phường:</label>
        <select
          id="phuong"
          value={districtSelected.code || ""}
          onChange={handleDistrictChange}
          style={{ borderRadius: '25px', height: '40px', padding: '10px', fontSize: '15px' }}
          required
        >
          <option value="" disabled>
            Chọn huyện
          </option>
          {listDistrictSort.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
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
              <div className="formGroup">
                <label htmlFor="xa">Xã:</label>
                <select
                  id="xa"
                  value={wardsSelected.code || ""}
                  onChange={handleWardsChange}
                  style={{ borderRadius: '25px', height: '40px', padding: '10px', fontSize: '15px' }}
                  required
                >
                  <option value="" disabled>
                    Chọn Xã
                  </option>
                  {listWardSort.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
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