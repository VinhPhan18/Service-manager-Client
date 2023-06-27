import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";

import style from './Staff.module.scss';
import * as staffServices from '~/services/staffServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';
import Pagination from '~/components/Pagination/Pagination';
import StaffType from '../StaffType/StaffType';
import { useDebounce } from '~/hooks';

export default function Staff() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openStaffAccountModal, setOpenStaffAccountModal] = useState(false);

  const [email, setEmail] = useState('');
  const [hoten, setHoten] = useState('');
  const [sdt, setSdt] = useState('');
  const [chucvu, setChucvu] = useState('');
  const [cccd, setCccd] = useState('');
  const [ngaysinh, setNgaysinh] = useState('');
  const [diachi, setDiachi] = useState('');
  const [phongban, setPhongban] = useState('');
  const [ngayvaolam, setNgayvaolam] = useState('');
  const [openStaffModal, setOpenStaffModal] = useState(false);
  const [staffDetail, setStaffDetail] = useState({})
  const [isModalStaffDetail, setIsModalStaffDetail] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listDistrictSort, setListDistrictSort] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [listWardSort, setListWardSort] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState({});
  const [districtSelected, setDistrictSelected] = useState({});
  const [wardsSelected, setWardsSelected] = useState({});
  const [positions, setPositions] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("")
  const [filter, setFilter] = useState({
    limit: 5,
    sort: "createadd",
    page: 1,
    q: "",
    chucvu: null,
    tinh: null,
    phuong: null,
    xa: null,
    deleted: false
  });
  let debounced = useDebounce(searchValue, 500);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaff(null);
  };

  // GET STAFFS DATA
  useEffect(() => {
    const getStaffs = async () => {
      console.log("object")
      const response = await staffServices.getStaffs(filter)
       
        setStaffList(response.staffs)
        setCurrentPage(response.currentPage);
        const pageArray = Array.from(
          { length: response.totalPages },
          (_, i) => i + 1
        );
        setTotalPage(pageArray);
        console.log(response)

    }
    getStaffs()
  }, [filter])
  useEffect(() => {
    if (!searchValue.trim()) {
      return;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);


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

  useEffect(() => {
    const getPosition = async () => {
      try {
        const response = await staffServices.getPosition();
        setPositions(response)
      } catch (error) {
        console.log(error);
      }
    }
    getPosition();
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsEmailValid(isValid);
    if (isValid) {
      const newStaff = {
        hoten,
        email,
        sdt,
        diachi,
        chucvu,
        ngaysinh,
        ngayvaolam,
        cccd,
        phongban,
        tinh: {
          name: provinceSelected.name,
          code: provinceSelected.code
        },
        phuong: {
          name: districtSelected.name,
          code: districtSelected.code,
          province_code: districtSelected.province_code,
          province: districtSelected.province
        },
        xa: {
          name: wardsSelected.name,
          code: wardsSelected.code,
          district_code: wardsSelected.district_code,
          district: wardsSelected.district
        }

      };

      const createStaff = async () => {
        const res = await staffServices.createStaff(newStaff)
        console.log(res)
      }
      createStaff()

      // toggleModal();
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
    } 
  };

  const handleEditClick = (staffId) => {
    const editedStaff = staffList.find((staff) => staff._id === staffId);
    setEditingStaff(editedStaff);

    setIsModalOpen(true);
    setEmail(editedStaff.email); // Set the email value when opening the modal for editing
  };

 
  const handleStaffDetailOpen = (id) =>{
    const fetchApi=async () =>{
      const res = await staffServices.profile(id)
      if(res) {
        setStaffDetail(res)
        setIsModalStaffDetail(true)
      }

    }
    fetchApi()
   }

  return (
    <div className={cx('wrapper')}>
      <h1>Nhân Viên</h1>

      <div className={cx("top-btn")}>
        <input className={cx("inputSearch")} type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Nhập tên muốn tìm' />
        <Button primary onClick={setOpenStaffAccountModal}>
           Tài khoản
        </Button>

        <Button onClick={toggleModal} primary>Thêm nhân viên</Button>
      </div>
     
      <div className={cx('tableWrapper')}>
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx("content")}
        >
          <table className={cx("table")}>
            <thead>
              <tr>
                {/* <th>Mã nhân viên</th> */}
                <th>Tên nhân viên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Chức vụ</th>
                {/* <th>Ngày sinh</th> */}
                {/* <th>Ngày vào làm</th> */}
                {/* <th>CCCD</th> */}
                <th>Phòng ban</th>
                {/* <th>Địa chỉ</th> */}
                <th>Tỉnh</th>
                <th>Phường</th>
                <th>Xã</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {staffList && staffList.map((staff) => (
                <tr key={staff._id}>
                  {/* <td >{staff._id}</td> */}
                  <td>{staff.hoten}</td>
                  <td>{staff.email}</td>
                  <td>{staff.sdt}</td>
                  <td>{staff.chucvu.name}</td>
                  {/* <td>{staff.ngaysinh}</td> */}
                  {/* <td>{staff.ngayvaolam}</td> */}
                  {/* <td>{staff.cccd}</td> */}
                  <td>{staff.phongban}</td>
                  {/* <td>{staff.diachi}</td> */}
                  <td>{staff.tinh.name}</td>
                  <td>{staff.phuong.name}</td>
                  <td>{staff.xa.name}</td>
                  <td>
                  <button onClick={() => handleStaffDetailOpen (staff._id) } className={cx("icon")} >
                  <Tippy content="Xem chi tiết">
                              <div className={cx("btnIconBox")}>
                                <Button outline small text><FontAwesomeIcon icon={faEye} /></Button>
                              </div>
                            </Tippy>
                    </button>
                    {/* <button onClick={() => handleDeleteStaff(staff._id)} className={cx("icon")} >
                      <FontAwesomeIcon icon={faTrashAlt} /> Xóa
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>       
      </div>
      {
        isModalStaffDetail&& <Modal closeModal={setIsModalStaffDetail}>
          <div>
            <h3>
              Chi tiết khách hàng
            </h3>
          </div>

        </Modal>
      }
      <Pagination totalPages={totalPage} currentPage={currentPage} setFilter={setFilter} />
      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={cx("modalWraper")}>
            <div className={cx("bigTitle")}><h3 > {editingStaff ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h3></div>
           
            <div className={cx("formContent")} >
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="hoten">Tên nhân viên:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên nhân viên..."
                  maxLength={30}
                  type="text"
                  id="hoten"
                  value={hoten}
                  onChange={(e) => setHoten(e.target.value)}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="ngaysinh">Ngày sinh:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày sinh..."
                  type="date"
                  id="ngaysinh"
                  value={ngaysinh}

                  onChange={(e) => setNgaysinh(e.target.value)}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="sdt">Số điện thoại:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập số điện thoại..."
                  maxLength={10}
                  type="tel"
                  id="sdt"
                  value={sdt}

                  onChange={(e) => {
                    setSdt(e.target.value)
                  }}
                  required
                />
              </div>

              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="diachi">Địa chỉ:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập địa chỉ..."
                  maxLength={100}
                  type="text"
                  id="diachi"
                  value={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="cccd">Căn cước công dân:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập căn cước công dân..."
                  type="tel"
                  maxLength={12}
                  id="cccd"
                  value={cccd}

                  onChange={(e) => setCccd(e.target.value)}
                  required
                />
              </div>
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="chucvu">Chức vụ:</label>
                <select className={cx("formInput")} 
                id="chucvu"
                 value={chucvu} 
                 onChange={e => setChucvu(e.target.value)}
                 required>
                  <option value="">Chọn Chức vụ</option>
                  {positions && positions.map(position => {
                    return (
                      <option key={position._id} value={position._id}>{position.name}</option>
                    )
                  })}
                </select>
              </div>

              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="email">Email:</label>
                <input
                  placeholder="Nhập email..."
                  maxLength={30}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cx("formInput", { invalid: !isEmailValid })}
                  required
                />
               
              </div>
            
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="phongban">Phòng ban:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập phòng ban..."
                  maxLength={50}
                  type="text"
                  id="phongban"
                  value={phongban}
                  onChange={(e) => setPhongban(e.target.value)}
                  required
                />
              </div>
              
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="ngayvaolam">Ngày vào làm:</label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày vào làm..."
                  type="date"
                  id="ngayvaolam"
                  value={ngayvaolam}
                  onChange={(e) => setNgayvaolam(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="tinh">Tỉnh\Thành phố:</label>
                <select
                  id="tinh"
                  value={provinceSelected?.code || ""}
                  onChange={handleProvinceChange}
                  className={cx("formInput")}
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

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="phuong">Quận\Huyện:</label>
                <select
                  id="phuong"
                  value={districtSelected.code || ""}
                  onChange={handleDistrictChange}
                  className={cx("formInput")}
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

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="xa">Phường\Xã:</label>
                <select
                  id="xa"
                  value={wardsSelected.code || ""}
                  onChange={handleWardsChange}
                  required
                  className={cx("formInput")}
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
            </div >

            <div className={cx("formGroupbutton")}>
              {
                editingStaff ? (
                  <Button onClick={handleUpdateStaff} primary small>Cập nhật</Button>

                ) : (

                  <Button onClick={handleSubmit} primary small>Thêm</Button>
                )
              }
              <Button onClick={toggleModal} primary small>Hủy</Button>
            </div>
          </div>
        </Modal>
      )}

      {
        openStaffAccountModal&&<StaffType openStaffAccountModal={setOpenStaffModal}/>
      }

    </div>
  );
} 