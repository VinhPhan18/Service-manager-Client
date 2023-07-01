import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { useDebounce } from '~/hooks';
import Pagination from '~/components/Pagination/Pagination';
import CustomerDetail from './CustomerDetail';
import { useNavigate } from 'react-router-dom';

import style from './Customer.module.scss';
import * as customerServices from '~/services/customerServices';
import * as staffServices from '~/services/staffServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';
import CustomerType from '~/pages/CustomerType/CustomerType'
import GetCustomerType from '~/components/CustomerType/GetCustomerType';

export default function Customer() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCustomerDetail, setIsModalCustomerDetail] = useState(false);
  const [customerDetail, setCustomerDetail] = useState({})
  const [searchValue, setSearchValue] = useState("")
  
  const [name, setName] = useState('');
  const [diachivp, setDiachivp] = useState('');
  const [sdt, setSdt] = useState('');
  const [email, setEmail] = useState('');
  const [masothue, setMasothue] = useState('');
  const [mota, setMota] = useState('');
  const [website, setWebsite] = useState('');
  const [ngaytaokh, setNgaytaokh] = useState('');
  const [thongtinkhac, setThongtinkhac] = useState('');
  const [stk, setStk] = useState('');
  const [nguoidaidien, setNguoidaidien] = useState('');
  const [sdtndd, setSdtndd] = useState('');
  const [loaikhachhang, setLoaikhachhang] = useState('');
  const [tinh, setTinh] = useState('');
  const [phuong, setPhuong] = useState('');
  const [xa, setXa] = useState('');
  const [chucvundd, setChucvundd] = useState('');
  const [nhanvien, setNhanvien] = useState('');
  const [nguoilienhe, setNguoilienhe] = useState('');

  const [customerId, setCustomerId] = useState("")
  const [openCustomerDetail, setOpenCustomerDetail] = useState("")
  

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [openCustomerTypeModal, setOpenCustomerTypeModal] = useState(false);

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listDistrictSort, setListDistrictSort] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [listWardSort, setListWardSort] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState({});
  const [districtSelected, setDistrictSelected] = useState({});
  const [wardsSelected, setWardsSelected] = useState({});

  const [positions, setPositions] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [session, setSession] = useState({})
  const navigate = useNavigate()

  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    limit: 5,
    sort: "ngaytaokh",
    page: 1,
    q: "",
    chucvundd: null,
    tinh: null,
    phuong: null,
    xa: null,
    nhanvien: null,
    loaikhachhang: null,
    deleted: null,
  }); 
  // Search
  let debounced = useDebounce(searchValue, 500);
  console.log(customerDetail)
// Moadal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCustomer(null);
  };
  // UF Search
  useEffect(() => {
    if (!searchValue.trim()) {
      return;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  //Login page
    useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("VNVD_Login"))

    if (session) {
      setSession(session)
    } else {
      navigate("/staffs/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // GET STAFFS DATA
  useEffect(() => {
    const getCustomers = async () => {
      const response = await  customerServices.getCustomers(filter)
      if (response?.data) {
        setCustomerList(response.data)
        setCurrentPage(response.currentPage);
        const pageArray = Array.from(
          { length: response.totalPages },
          (_, i) => i + 1
        );
        setTotalPage(pageArray);
      } else {
        console.log('error')
      }

    }
    getCustomers()
  }, [filter])

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
//customertype
    useEffect(() => {
    const getCustomerTypes = async () => {
      try {
        const response = await customerServices.getCustomerTypes();
        setCustomerTypes(response)
      } catch (error) {
        console.log(error);
      }
    }
    getCustomerTypes();
  }, [])
//customertype
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

  const handleSubmit = () => {
      const newCustomer = {
        name,
        diachivp,
        sdt,
        email,
        masothue,
        mota,
        website,
        ngaytaokh,
        thongtinkhac,
        stk,
        nguoidaidien,
        sdtndd,
        loaikhachhang,
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
        },
        chucvundd,
        nhanvien:'64897b625550b49164f8f47e',
        nguoilienhe:'648b1ceae86c9f78f537c48a'
      };
 
//neww
        
          const createCustomer = async () => {
            const res = await customerServices.createCustomer(newCustomer)
            console.log(res)
          }
          createCustomer()
          // toggleModal();
      }
      const handleUpdateCustomer = (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(email);

        setIsEmailValid(isValid);
        if (isValid) {
          const updatedCustomer = {
            _id: editingCustomer._id,
            name: e.target.name.value || editingCustomer.name,
            diachivp: e.target.diachivp.value || editingCustomer.diachivp,
            sdt: e.target.sdt.value || editingCustomer.sdt,
            email: e.target.email.value || editingCustomer.email,
            masothue: e.target.masothue.value || editingCustomer.masothue,
            mota: e.target.mota.value || editingCustomer.mota,
            website: e.target.website.value || editingCustomer.website,
            ngaytaokh: e.target.ngaytaokh.value || editingCustomer.ngaytaokh,
            thongtinkhac: e.target.thongtinkhac.value || editingCustomer.thongtinkhac,
            stk: e.target.stk.value || editingCustomer.stk,
            nguoidaidien: e.target.nguoidaidien.value || editingCustomer.nguoidaidien,
            sdtndd: e.target.sdtndd.value || editingCustomer.sdtndd,
            loaikhachhang: e.target.loaikhachhang.value || editingCustomer.loaikhachhang,
            tinh: e.target.tinh.value || editingCustomer.tinh,
            phuong: e.target.phuong.value || editingCustomer.phuong,
            xa: e.target.xa.value || editingCustomer.xa,
            chucvundd: e.target.chucvundd.value || editingCustomer.chucvundd,
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
        }

      };

     const handleCustomerDetailOpen = (id) =>{
      const fetchApi=async () =>{
        const res = await customerServices.info(id)
        if(res) {
          setCustomerDetail(res)
          setIsModalCustomerDetail(true)
        }
        console.log(res)

      }
      fetchApi()
     }

//end


const handelCustomerDetail = (id) => {
  setOpenCustomerDetail(true)
  setCustomerId(id)
}

console.log(GetCustomerType)
  return (
    <div className={cx('wrapper')}>
      <h1>Khách Hàng</h1>

      <div className={cx("top-btn")}>
        <input className={cx("inputSearch")} type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Nhập tên muốn tìm' />
          <Button primary onClick={setOpenCustomerTypeModal}>
              Loại khách hàng
          </Button>
          <Button onClick={toggleModal} primary>Thêm khách hàng</Button>
        </div>

      <div className={cx('tableWrapper')}>
        <div
            className={cx("content")}
          >
          <table className={cx('table')}>
            <thead>
              <tr>
              {/* <th>ID</th> */}
              <th>Tên khách hàng</th>
              <th>Địa chỉ VP</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Mã số thuế</th>
              {/* <th>Mô tả</th> */}
              {/* <th>Website</th> */}
              <th>Ngày tạo KH</th>
              {/* <th>Thông tin khác</th> */}
              {/* <th>Số tài khoản</th> */}
              <th>Người đại diện</th>
              <th>SDT NĐĐ</th>
              <th>Loại khách hàng</th>
              <th>Tỉnh</th>
              <th>Phường</th>
              <th>Xã</th>
              {/* <th>Chức vụ NĐĐ</th> */}
              <th>Nhân viên</th>
              {/* <th>Người liên hệ</th> */}
              <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer) => (
                <tr key={customer._id}>
                  {/* <td>{customer._id}</td> */}
                  <td>{customer.name}</td>
                  <td>{customer.diachivp}</td>
                  <td>{customer.sdt}</td>
                  <td>{customer.email}</td>
                  <td>{customer.masothue}</td>
                  {/* <td>{customer.mota}</td> */}
                  {/* <td>{customer.website}</td> */}
                  <td>{customer.ngaytaokh}</td>
                  {/* <td>{customer.thongtinkhac}</td> */}
                  {/* <td>{customer.stk}</td> */}
                  <td>{customer.nguoidaidien}</td>
                  <td>{customer.sdtndd}</td>
                  <td>{customer.loaikhachhang.name}</td>
                  <td>{customer.tinh.name}</td>
                  <td>{customer.phuong.name}</td>
                  <td>{customer.xa.name}</td>
                  {/* <td>{customer.chucvundd?.name}</td> */}
                  <td>{customer.nhanvien.hoten}</td>
                  {/* <td>{customer.nguoilienhe.name}</td> */}

                  <td>
                  <Tippy content="Xem chi tiết">
                                <div className={cx("btnIconBox")}>
                                  <Button outline small text onClick={() => handelCustomerDetail(customer._id)}><FontAwesomeIcon icon={faEye} /></Button>
                                </div>
                              </Tippy>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        </div>

        <Pagination totalPages={totalPage} currentPage={currentPage} setFilter={setFilter} />
        {isModalOpen && ( //start modal
        <Modal closeModal={toggleModal}>
          <div className={cx('modalWraper')}>
            <div className={cx("bigTitle")}>
              <h3 >
                {editingCustomer? 'Sửa khách hàng' : 'Thêm Khách hàng'}
              </h3>
            </div>
            <div className={cx("formContent")} >
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="name">Tên Khách Hàng:</label>
                  <input
                  className={cx("formInput")}
                    placeholder="Nhập tên khách hàng..."
                    maxLength={30}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
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
                  {/* {!isEmailValid && <span className={cx('error')}>Email không đúng định dạng</span>} */}
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
                    onChange={(e) => setSdt(e.target.value)}
                    required
                  />
                </div>
                
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="diachivp">Địa chỉ:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập địa chỉ văn phòng..."
                    maxLength={100}
                    type="text"
                    id="diachivp"
                    value={diachivp}
                    onChange={(e) => setDiachivp(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="masothue">Mã số thuế:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập mã số thuế..."
                    maxLength={13}
                    type="tel"
                    id="masothue"
                    value={masothue}
                    onChange={(e) => setMasothue(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="mota">Mô tả:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập mô tả..."
                    maxLength={200}
                    type="text"
                    id="mota"
                    value={mota}
                    onChange={(e) => setMota(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="website">Website:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập link..."
                    maxLength={500}
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="ngaytaokh">Ngày tạo:</label>
                  <input
                    className={cx("formInput")}
                    type="date"
                    id="ngaytaokh"
                    value={ngaytaokh}
                    onChange={(e) => setNgaytaokh(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="thongtinkhac">Thông tin khác:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập thông tin khách..."
                    type="text"
                    id="thongtinkhac"
                    value={thongtinkhac}
                    onChange={(e) => setThongtinkhac(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="stk">Số tài khoản:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập số tài khoản..."
                    type="tel"
                    maxLength={15}
                    id="stk"
                    value={stk}
                    onChange={(e) => setStk(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")}  htmlFor="nguoidaidien">Người đại diện:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập tên người đại diện..."
                    type="text"
                    maxLength={30}
                    id="nguoidaidien"
                    value={nguoidaidien}
                    onChange={(e) => setNguoidaidien(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="sdtndd">SĐT người đại diện:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập số điện thoại người đại diện..."
                    maxLength={10}
                    type="tel"
                    id="sdtndd"
                    value={sdtndd}
                    onChange={(e) => setSdtndd(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="nguoilienhe">Người liên hệ:</label>
                  <input
                    className={cx("formInput")}
                    placeholder="Tên người liên hệ..."
                    maxLength={30}
                    type="text"
                    id="nguoilienhe"
                    value={nguoilienhe}
                    onChange={(e) => setNguoilienhe(e.target.value)}
                    required
                  />
                </div>
                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="loaikhachhang">Loại khách hàng:</label>
                  <GetCustomerType value={loaikhachhang} setValue={setLoaikhachhang}/>
                </div>

                <div className={cx('formGroup')}>
                  <label className={cx("formTitle")} htmlFor="chucvundd">Chức vụ người đại điện:</label>
                  <select 
                  className={cx("formInput")}
                  id="chucvundd" 
                  value={chucvundd}
                    onChange={(e) => setChucvundd(e.target.value)}
                  required>
                  <option value="">Chọn Chức vụ</option>
                    {positions && positions.map(position => {
                      return (
                        <option key={position._id} value={position._id}>{position.name}</option>
                      )
                    })}
                  </select>
                </div>
                
                
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="tinh">Tỉnh/Thành phố:</label>
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
                  <label className={cx("formTitle")} htmlFor="phuong">Quận/Huyện:</label>
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
                  <label className={cx("formTitle")} htmlFor="xa">Phường/Xã:</label>
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
                      </div>
                      <div className={cx("formGroupbutton")}>
                {
                  editingCustomer ? (
                    <Button onClick={handleUpdateCustomer} primary small>Cập nhật</Button>

                  ) : (

                    <Button onClick={handleSubmit} primary small>Thêm</Button>
                  )
                }
                <Button onClick={toggleModal} outline small>Hủy</Button>
              </div>
            </div>
          </Modal>
        )}

        {
          openCustomerTypeModal&&<CustomerType openCustomerTypeModal={setOpenCustomerTypeModal}/>
        }

{
  openCustomerDetail && <Modal closeModal={setOpenCustomerDetail}>
    <CustomerDetail closeModal={setOpenCustomerDetail} id={customerId} />
  </Modal>
}
  </div>
  );
} 