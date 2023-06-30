import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Tippy from "@tippyjs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import style from "./Commodity.module.scss";
import * as commodityServices from "~/services/commodityServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";
import Pagination from "~/components/Pagination/Pagination";
import { useDebounce } from "~/hooks";
import AddCommodity from "./component/AddCommodity";
import { useNavigate } from "react-router-dom";
import CommodityType from "./CommodityType/CommodityType";
import CommodityUnit from "./CommodityUnit/CommodityUnit";

export default function Commodity() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [commodityId, setCommodityId] = useState("");
  const [openCommodityTypeModal, setOpenCommodityTypeModal] = useState(false);
  const [openCommodityUnitModal, setOpenCommodityUnitModal] = useState(false);

  // const [types, setTypes] = useState([]);
  // const [units, setUnits] = useState([]);

  const [editingCommodity, setEditingCommodity] = useState(null);
  const [commodityList, setCommodityList] = useState([]);
  const [createdCommoditySuccessfully, setCreatedCommoditySuccessfully] =
    useState(false);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [session, setSession] = useState({});

  const [filter, setFilter] = useState({
    limit: 10,
    sort: "giabanra",
    page: 1,
    q: "",
    loaihh: null,
    trangthai: null,
    dvt: null,
    deleted: false,
  });

  let debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("VNVD_Login"))

    if (session) {
      setSession(session)
    } else {
      navigate("/staffs/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createCommoditySuccessfully = () => toast("Thêm hàng hóa thành công!");

 

  useEffect(() => {
    if (createdCommoditySuccessfully) {
      createCommoditySuccessfully();

      setTimeout(() => {
        setCreatedCommoditySuccessfully(false);
      }, 1000);
    }
  }, [createdCommoditySuccessfully]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingCommodity(null);
  };

  // GET COMMODITY DATA
  useEffect(() => {
    const getCommodities = async () => {
      const response = await commodityServices.getCommodities(filter);
      setCommodityList(response.data);
      setCurrentPage(response.currentPage);
      const pageArray = Array.from(
        { length: response.totalPages },
        (_, i) => i + 1
      );
      setTotalPage(pageArray);
      console.log(response);
    };
    getCommodities();
  }, [filter]);

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  const handleEditClick = (commodityId) => {
    const editedCommodity = commodityList.find(
      (commodity) => commodity._id === commodityId
    );
    setEditingCommodity(editedCommodity);

    setIsModalOpen(true);
  };

  // useEffect(() => {
  //   const getCommodityType = async () => {
  //     try {
  //       const response = await commodityServices.getCommodityType();
  //       setTypes(response);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCommodityType();
  // }, []);

  

  const handleDeleteCommodity = (commodityId) => {
    const updatedCommodityList = commodityList.filter(
      (commodity) => commodity._id !== commodityId
    );
    setCommodityList(updatedCommodityList);
  };

  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <h1>Hàng hóa</h1>

      <div className={cx("top-btn")}>
        <input
          className={cx("inputSearch")}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Nhập tên muốn tìm"
        />

        <Button primary onClick={() => setOpenCommodityTypeModal(true)}>
          Loại hàng hóa
        </Button>

        <Button primary onClick={() => setOpenCommodityUnitModal(true)}>
          Đơn vị tính
        </Button>

        <Button onClick={toggleModal} primary>
          Thêm hàng hóa
        </Button>
      </div>

      <div className={cx("tableWrapper")}>
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx("content")}
        >
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Mã hàng hóa</th>
                <th>Tên hàng hóa</th>
                <th>Hình ảnh</th>
                <th>Giá nhập vào</th>
                <th>Giá bán ra</th>
                <th>Mô tả</th>
                <th>Thuế</th>
                {/* <th>Trạng thái</th> */}
                <th>Số lượng trong kho</th>
                <th>Đơn vị tính</th>
                <th>Loại hàng hóa</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {commodityList && commodityList.map((commodity) => (
                  <tr key={commodity._id}>
                    <td>{commodity.mahh}</td>
                    <td>{commodity.name}</td>
                    <td>{commodity.image}</td>
                    <td>{commodity.gianhap}</td>
                    <td>{commodity.giabanra}</td>
                    <td>{commodity.mota}</td>
                    <td>{commodity.thue}</td>
                    {/* <td>{commodity.trangthai}</td> */}
                    <td>{commodity.soluongtrongkho}</td>
                    <td>{commodity.dvt.map((unit) => {
                          return <span>{unit.dvt}</span>;
                        })}</td>
                    <td>{commodity.loaihh.loaihh}</td>
                    <td>
                      <button onClick={() => handleEditClick(commodity._id)}>
                        <FontAwesomeIcon icon={faEdit} className={cx("icon")} />{" "}
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteCommodity(commodity._id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={cx("icon")}
                        />
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        setFilter={setFilter}
      />

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <AddCommodity
            setCommodityList={setCommodityList}
            commodityList={commodityList}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            editingCommodity={editingCommodity}
            setCreatedCommoditySuccessfully={setCreatedCommoditySuccessfully}
          />
        </Modal>
      )}

      {openCommodityTypeModal && (
        <CommodityType
          data={session}
          openCommodityTypeModal={setOpenCommodityTypeModal}
        />
      )}

      {openCommodityUnitModal && (
        <CommodityUnit
          data={session}
          openCommodityUnitModal={setOpenCommodityUnitModal}
        />
      )}
    </div>
  );
}
