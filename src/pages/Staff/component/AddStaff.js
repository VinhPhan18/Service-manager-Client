import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import axios from 'axios'

import style from "./AddStaff.module.scss"
import * as staffServices from '~/services/staffServices';
import Button from '~/components/Button/Button';
import Position from '~/components/Position/Position';

export default function AddStaff({ staffList, setStaffList, toggleModal, setIsModalOpen, editingStaff, setCreatedStaffSuccessfully }) {
  const cx = classNames.bind(style)
  const [email, setEmail] = useState('');
  const [hoten, setHoten] = useState('');
  const [sdt, setSdt] = useState('');
  const [chucvu, setChucvu] = useState('');
  const [cccd, setCccd] = useState('');
  const [ngaysinh, setNgaysinh] = useState('');
  const [diachi, setDiachi] = useState('');
  const [phongban, setPhongban] = useState('');
  const [ngayvaolam, setNgayvaolam] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listDistrictSort, setListDistrictSort] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [listWardSort, setListWardSort] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState({});
  const [districtSelected, setDistrictSelected] = useState({});
  const [wardsSelected, setWardsSelected] = useState({});
  const [error, setError] = useState("");



  //GET PROVINCE
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

  //GET DISTRICT
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

  //GET WARDS
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
      if (listProvince[i].code.toString() === provinceCode.toString()) {
        for (let j = 0; j < listDistrict.length; j++) {
          if (listDistrict[j].province_code.toString() === provinceCode.toString()) {
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
      if (listDistrict[i].code.toString() === districtCode.toString()) {
        for (let j = 0; j < listWards.length; j++) {
          if (listWards[j].district_code.toString() === districtCode.toString()) {
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
      if (listWards[i].code.toString() === wardCode.toString()) {
        setWardsSelected(listWards[i]);
        break;
      }
    }
  };

  //CREATE STAFF
  const handleSubmit = () => {
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
        if (res.data) {
          setStaffList([res.data, ...staffList])
          setCreatedStaffSuccessfully(true)
          toggleModal(false)
        } else {
          setError(res.message)
        }
        console.log(res)
      }
      createStaff()

    }
  };

  //EDIT STAFF
  const handleUpdateStaff = (e) => {
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

  return (
    <div className={cx("modalWraper")}>
      <div className={cx("bigTitle")}><h3 > {editingStaff ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h3></div>

      <span>{error}</span>
      <div className={cx("formContent")} >
        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="hoten">Tên nhân viên :</label>
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
          <label className={cx("formTitle")} htmlFor="sdt">Số điện thoại :</label>
          <input
            className={cx("formInput")}
            placeholder="Nhập số điện thoại..."
            maxLength={10}
            type="number"
            id="sdt"
            value={sdt}

            onChange={(e) => {
              setSdt(e.target.value)
            }}
            required
          />
        </div>
        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="cccd">Căn cước công dân :</label>
          <input
            className={cx("formInput")}
            placeholder="Nhập căn cước công dân..."
            type="number"
            maxLength={12}
            id="cccd"
            value={cccd}

            onChange={(e) => setCccd(e.target.value)}
            required
          />
        </div>
        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="ngaysinh">Ngày sinh :</label>
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
          <label className={cx("formTitle")} htmlFor="diachi">Địa chỉ :</label>
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
          <label className={cx("formTitle")} htmlFor="email">Email :</label>
          <input
            placeholder="Nhập email..."
            maxLength={50}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cx("formInput", { invalid: !isEmailValid })}
            required
          />
        </div>

        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="phongban">Phòng ban :</label>
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
          <label className={cx("formTitle")} htmlFor="chucvu">Chức vụ :</label>
          <Position value={chucvu} setValue={setChucvu} />
        </div>
        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="ngayvaolam">Ngày vào làm :</label>
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
          <label className={cx("formTitle")} htmlFor="tinh">Tỉnh/ Thành phố :</label>
          <select
            id="tinh"
            value={provinceSelected?.code || ""}
            onChange={handleProvinceChange}
            className={cx("formInput")}
            required
          >
            <option value="" disabled>
              Chọn Tỉnh
            </option>
            {listProvince.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx("formGroup")}>
          <label className={cx("formTitle")} htmlFor="phuong">Quận/ Huyện :</label>
          <select
            id="phuong"
            value={districtSelected.code || ""}
            onChange={handleDistrictChange}
            className={cx("formInput")}
            required
          >
            <option value="" disabled>
              Chọn Huyện
            </option>
            {listDistrictSort.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className={cx("formGroup")}>
          <label className={cx("formTitle")} htmlFor="xa">Phường/ Xã :</label>
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
  )
}
