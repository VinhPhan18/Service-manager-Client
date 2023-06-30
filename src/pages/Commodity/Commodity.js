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

export default function Commodity() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCommodity, setEditingCommodity] = useState(null);
  const [commodityList, setCommodityList] = useState([]);
  const [createdCommoditySuccessfully, setCreatedCommoditySuccessfully] =
    useState(false);
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  // const [sesstionData, setSesstionData] = useState({});
  const [filter, setFilter] = useState({
    limit: 5,
    sort: "giabanra",
    page: 1,
    q: "",
    loaihh: null,
    trangthai: null,
    dvt: null,
    deleted: false,
  });

  let debounced = useDebounce(searchValue, 500);

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
      if (response?.data) {
        setCommodityList(response.data);
        console.log(response);
        setCurrentPage(response.currentPage);
        const pageArray = Array.from(
          { length: response.totalPages },
          (_, i) => i + 1
        );
        setTotalPage(pageArray);
        console.log(response);
      } else {
        console.log("error");
      }
    };
    getCommodities();
  }, [filter]);

  useEffect(() => {
    if (!searchValue.trim()) {
      return;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
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
                <th>Trạng thái</th>
                <th>Số lượng trong kho</th>
                <th>Đơn vị tính</th>
                <th>Loại hàng hóa</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {commodityList &&
                commodityList.map((commodity) => (
                  <tr key={commodity._id}>
                    <td>{commodity.mahh}</td>
                    <td>{commodity.name}</td>
                    <td>{commodity.image}</td>
                    <td>{commodity.price}</td>
                    <td>{commodity.giabanra}</td>
                    <td>{commodity.mota}</td>
                    <td>{commodity.thue}</td>
                    <td>{commodity.trangthai}</td>
                    <td>{commodity.soluongtrongkho}</td>
                    <td>{commodity.dvt}</td>
                    <td>{commodity.loaihh}</td>
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
    </div>
  );
}
