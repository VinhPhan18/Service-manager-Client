import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { faBan, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import style from './Contact.module.scss'
import Button from '~/components/Button/Button'
import Pagination from '~/components/Pagination/Pagination'
import * as contactServices from "~/services/contactServices"
import Modal from '~/components/Modal/Modal'
import Position from '~/components/Position/Position'
import { useDebounce } from '~/hooks';

export default function Contact() {
  const cx = classNames.bind(style)
  const navigate = useNavigate()
  const [session, setSession] = useState({})
  const [contacts, setContacts] = useState([])
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddContact, setOpenAddContact] = useState(false);
  const [name, setName] = useState("")
  const [sdt, setSdt] = useState("")
  const [email, setEmail] = useState("")
  const [ngaysinh, setNgaysinh] = useState("")
  const [gioitinh, setGioitinh] = useState("")
  const [lienhechinh, setLienhechinh] = useState(false)
  const [trangthai, setTrangthai] = useState("")
  const [position, setPosition] = useState("")
  const [error, setError] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isLienhechinh, setIsLienhechinh] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isTrangthai, setIsTrangthai] = useState("")
  const [contactDetailModal, setContactDetailModal] = useState(false)
  const [contactDetail, setContactDetail] = useState({})
  const [createdContactSuccessfully, setCreatedContactSuccessfully] = useState(false);
  const [filter, setFilter] = useState({
    limit: 10,
    sort: "createAt",
    page: 1,
    q: "",
    lienhechinh: null,
    trangthai: null,
    chucvu: null,
    deleted: false,
  })

  let debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await contactServices.getContact(filter)
      setContacts(result.data)
      setCurrentPage(result.currentPage);
      const pageArray = Array.from(
        { length: result.totalPages },
        (_, i) => i + 1
      );
      setTotalPage(pageArray);
    }
    fetchApi()
  }, [filter])

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

  //NOTI
  const createContactSuccessfully = () => toast("Thêm người liên hệ thành công!");
  useEffect(() => {
    if (createdContactSuccessfully) {
      createContactSuccessfully();

      setTimeout(() => {
        setCreatedContactSuccessfully(false);
      }, 1000);
    }
  }, [createdContactSuccessfully]);
  // SEARCH
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  const handleAddContact = () => {
    setError("")
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        return true;
      }
      return false;
    }

    const validatePhoneNumber = () => {
      const phoneRegex = /^\d{10}$/;
      if (phoneRegex.test(sdt)) {
        return true;
      }
      return false;
    }


    if (validateEmail() && validatePhoneNumber()) {
      const data = {
        name,
        sdt,
        email,
        ngaysinh,
        gioitinh,
        lienhechinh,
        chucvu: position,
        trangthai
      }

      const fetchApi = async () => {
        const result = await contactServices.createContact(data)
        console.log(result)//log 
        if (result.contact) {
          setContacts([result.contact, ...contacts])
          setOpenAddContact(false)
        }
      }

      fetchApi()
    } else {
      setError("Email hoặc số điện thoại không hợp lệ")
    }
  }

  const handelSortByLienhechinh = () => {
    setIsLienhechinh(!isLienhechinh)

    if (!isLienhechinh) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        lienhechinh: true,
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        lienhechinh: null,
      }));
    }
  }

  const handelTrash = () => {
    setIsDeleted(!isDeleted)

    setFilter((prevFilter) => ({
      ...prevFilter,
      deleted: !isDeleted,
    }));
  }

  const handelSortByTrangthai = (e) => {
    let current = e.target.value
    setIsTrangthai(current)
    setFilter((prevFilter) => ({
      ...prevFilter,
      trangthai: current,
    }));
  }

  const handelShowContactDetail = (id) => {
    setContactDetailModal(!contactDetailModal)
    const fetchApi = async () => {
      const result = await contactServices.info(id)
      console.log(result)
      setContactDetail(result)
    }
    fetchApi()
  }

  return (
    <div className={cx("wrapper")}>
       <ToastContainer />
      <h1>Người liên hệ</h1>

      <div className={cx("top-btn")}>
        <input className={cx("inputSearch")} type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Nhập tên muốn tìm' />
        {
          isLienhechinh ? (
            <Button primary onClick={handelSortByLienhechinh}>Liên hệ chính</Button>
          ) : (
            <Button outline onClick={handelSortByLienhechinh}>Liên hệ chính</Button>
          )
        }
        <select value={isTrangthai} onChange={(e) => handelSortByTrangthai(e)} className={cx("selectSort")}>
          <option value="">Chọn trạng thái</option>
          <option value="Làm việc">Làm việc</option>
          <option value="Nghỉ việc">Nghỉ việc</option>
        </select>
        {
          isDeleted ? (
            <Button primary onClick={handelTrash}>Thùng rác</Button>
          ) : (
            <Button outline onClick={handelTrash}>Thùng rác</Button>
          )
        }
        <Button primary onClick={() => setOpenAddContact(true)}>Thêm người liên hệ</Button>
      </div>

      <div className={cx("tableWrapper")}>
        <div className={cx("content")}>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Tên người liên hệ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Liên hệ chính</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                contacts.length > 0 ? (
                  contacts.map(contact => {
                    return (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        key={contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.sdt}</td>
                        <td>{contact.email}</td>
                        <td>{contact.lienhechinh ? "Có" : "Không"}</td>
                        <td>{contact.trangthai}</td>
                        <td>
                          <div className={cx("boxBtns")}>
                            <Tippy content="Xem chi tiết">
                              <div className={cx("btnIconBox")}>
                                <Button outline small text onClick={() => handelShowContactDetail(contact._id)}><FontAwesomeIcon icon={faEye} /></Button>
                              </div>
                            </Tippy>
                            {
                              isDeleted ? (
                                <Tippy content="Xoá vĩnh viễn">
                                  <div className={cx("btnIconBox")}>
                                    <Button outline small text><FontAwesomeIcon icon={faBan} /></Button>
                                  </div>
                                </Tippy>
                              ) : (
                                <Tippy content="Chuyển đến thùng rác">
                                  <div className={cx("btnIconBox")}>
                                    <Button outline small text><FontAwesomeIcon icon={faTrash} /></Button>
                                  </div>
                                </Tippy>
                              )
                            }
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cx("loading")}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </motion.tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPages={totalPage} currentPage={currentPage} setFilter={setFilter} />

      {
        openAddContact && <Modal closeModal={setOpenAddContact}>
          <div className={cx("addContactWrapper")}>
            <h1 className={cx("bigTitle")}>Thêm người liên hệ</h1>
            {error && <span>{error}</span>}

            <div className={cx("content")}>
              <label className={cx("inputBox")} htmlFor='name'>
                Tên người liên hệ:
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' placeholder='Nhập tên người liên hệ'></input>
              </label>
              <label className={cx("inputBox")} htmlFor='sdt'>
                Số điện thoại:
                <input value={sdt} onChange={(e) => setSdt(e.target.value)} type='text' id='sdt' maxLength={10} placeholder='Nhập số điện thoại người liên hệ'></input>
              </label>
              <label className={cx("inputBox")} htmlFor='email'>
                Email:
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' placeholder='Nhập email người liên hệ'></input>
              </label>
              <label className={cx("inputBox")} htmlFor='ngaysinh'>
                Ngày sinh:
                <input value={ngaysinh} onChange={(e) => setNgaysinh(e.target.value)} type='date' id='ngaysinh'></input>
              </label>
              <div className={cx("inputBox", "sex")}>
                Giới tính:

                <div className={cx("sexBox")}>
                  <div className={cx("miniInput")}>
                    <input onChange={(e) => setGioitinh(e.target.value)} type="radio" name='sex' id='nam' value="Nam" />
                    <label htmlFor="nam">Nam</label>
                  </div>
                  <div className={cx("miniInput")}>
                    <input onChange={(e) => setGioitinh(e.target.value)} type="radio" name='sex' id='nu' value="Nữ" />
                    <label htmlFor="nu">Nữ</label>
                  </div>
                  <div className={cx("miniInput")}>
                    <input onChange={(e) => setGioitinh(e.target.value)} type="radio" name='sex' id='khac' value="Khác" />
                    <label htmlFor="khac">Khác</label>
                  </div>
                </div>
              </div>
              <label className={cx("inputBox")}>
                Liên hệ chính:
                <input onChange={(e) => setLienhechinh(e.target.checked)} type="checkbox" />
              </label>
              <div className={cx("inputBox")}>
                Trạng thái:

                <select className={cx("input")} value={trangthai} onChange={(e) => setTrangthai(e.target.value)}>
                  <option value="Làm việc">Làm việc</option>
                  <option value="Nghỉ việc">Nghỉ việc</option>
                </select>
              </div>
              <label className={cx("inputBox")}>
                Chức vụ:
                <Position value={position} setValue={setPosition} />
              </label>
            </div>

            <div className={cx("boxBtns")}>
              <Button primary onClick={handleAddContact}>Thêm</Button>
              <Button outline onClick={() => setOpenAddContact(false)}>Huỷ</Button>
            </div>
          </div>
        </Modal>
      }

      {
        contactDetailModal && <Modal closeModal={setContactDetailModal}>
          <h1>{contactDetail.name}</h1>
        </Modal>
      }
    </div >
  )
}