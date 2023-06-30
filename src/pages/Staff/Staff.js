import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StaffDetail from './StaffDetail';
import style from './Staff.module.scss';
import * as staffServices from '~/services/staffServices';
import Modal from '~/components/Modal/Modal';
import Button from '~/components/Button/Button';
import Pagination from '~/components/Pagination/Pagination';
import { useDebounce } from '~/hooks';
import AddStaff from './component/AddStaff';
import StaffAccount from './StaffAccount/StaffAccount';
import Position from './Position/Position';
import { useNavigate } from 'react-router-dom';

export default function Staff() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openStaffAccountModal, setOpenStaffAccountModal] = useState(false);
  // modal position
  const [openStaffPositionModal, setOpenStaffPositionModal] = useState(false);
  const [openStaffDetail, setOpenStaffDetail] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffDetail, setStaffDetail] = useState({});
  const [editingStaff, setEditingStaff] = useState(null);
  const [isModalStaffDetail, setIsModalStaffDetail] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [createdStaffSuccessfully, setCreatedStaffSuccessfully] = useState(false);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  
  const [sesstionData, setSesstionData] = useState({});
  const [session, setSession] = useState({});
  const navigate = useNavigate();


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

  useEffect(() => {
    const session = sessionStorage.getItem("VNVD_Login")
    const sesstiondata = JSON.parse(session)
    setSesstionData(sesstiondata)
    if (sesstiondata?.role === "Nhân viên") {
      navigate("/")
    }

  },
    [])

  //NOTI
  const createStaffSuccessfully = () => toast("Thêm nhân viên thành công!");

  useEffect(() => {
    if (createdStaffSuccessfully) {
      createStaffSuccessfully();

      setTimeout(() => {
        setCreatedStaffSuccessfully(false);
      }, 1000);
    }
  }, [createdStaffSuccessfully]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingStaff(null);
  };
  // GET STAFFS DATA
  useEffect(() => {
    const getStaffs = async () => {
      console.log("object")
      const response = await staffServices.getStaffs(filter);

      setStaffList(response.staffs);
      setCurrentPage(response.currentPage);
      const pageArray = Array.from(
        { length: response.totalPages },
        (_, i) => i + 1
      );
      setTotalPage(pageArray);
      console.log(response);

    }
    getStaffs();
  }, [filter]);
console.log(staffDetail)


  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      q: debounced,
    }));
  }, [debounced, searchValue]);


  const handleStaffDetailOpen = (id) => {
    setOpenStaffDetail(true);
    setStaffId(id);
  }



  return (
    <div className={cx('wrapper')}>
      <ToastContainer />
      <h1>Nhân Viên</h1>

      <div className={cx("top-btn")}>
        <input className={cx("inputSearch")} type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Nhập tên muốn tìm' />
        <Button primary onClick={() => setOpenStaffAccountModal(true)}>
          Tài khoản
        </Button>

        {/* modal position */}
        <Button primary onClick={() => setOpenStaffPositionModal(true)}>
          Chức vụ
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
                    <button onClick={() => handleStaffDetailOpen(staff._id)} className={cx("icon")} >
                      <Tippy content="Xem chi tiết">
                        <div className={cx("btnIconBox")}>
                          <Button outline small text><FontAwesomeIcon icon={faEye} /></Button>
                        </div>
                      </Tippy>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination totalPages={totalPage} currentPage={currentPage} setFilter={setFilter} />

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <AddStaff
            setStaffList={setStaffList}
            staffList={staffList}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            editingStaff={editingStaff}
            setCreatedStaffSuccessfully={setCreatedStaffSuccessfully}
          />
        </Modal>
      )}
{/* Modal account  */}
      {
        openStaffAccountModal && <StaffAccount data={sesstionData} openStaffAccountModal={setOpenStaffAccountModal} />
      }
      {/* Modal position */}
      {
        openStaffPositionModal && <Position data={sesstionData} openStaffPositionModal={setOpenStaffPositionModal} />
      }

      {
        openStaffDetail && <Modal closeModal={setOpenStaffDetail}>
          <StaffDetail closeModal={setOpenStaffDetail} id={staffId} />
        </Modal>
      }
    </div>
  );
}
