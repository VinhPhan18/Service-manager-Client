import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

import style from "./Order.module.scss";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";
import Pagination from "~/components/Pagination/Pagination";
import * as orderServices from "~/services/orderServices";

export default function Order() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [madh, setMadh] = useState("");
  const [ngaybatdau, setNgaybatdau] = useState("");
  const [ngayketthuc, setNgayketthuc] = useState("");
  // const [nhanvien, setNhanvien] = useState("");
  // const [khachhang, setKhachhang] = useState("");
  // const [items, setItems] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  // const [units, setUnits] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState({
    limit: 10,
    sort: "giabanra",
    page: 1,
    q: "",
    loaihh: null,
    trangthai: null,
    dvt: null,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingOrder(null);
  };

  // Get order data
  useEffect(() => {
    const getOrders = async () => {
      const response = await orderServices.getOrders(filter);
      if (response?.data) {
        setOrderList(response.data);
        console.log(response)
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
    getOrders();
  }, [filter]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      madh,
      ngaybatdau,
      ngayketthuc,
      // nhanvien,
      // khachhang,
      // items,
    };
    const createOrder = async () => {
      const res = await orderServices.createOrder(newOrder);
      console.log(res);
    };
    createOrder();
  };

  const handleUpdateOrder = (event) => {
    event.preventDefault();
    const updatedOrder = {
      mahh: event.target.madh.value || editingOrder.madh,
      ngaybatdau: event.target.ngaybatdau.value || editingOrder.ngaybatdau,
      ngayketthuc: event.target.ngayketthuc.value || editingOrder.ngayketthuc,
      nhanvien: event.target.nhanvien.value || editingOrder.nhanvien,
      khachhang: event.target.khachhang.value || editingOrder.khachhang,
      items: event.target.items.value || editingOrder.items,
    };

    const updatedOrderList = orderList.map((order) => {
      if (order._id === updatedOrder._id) {
        return updatedOrder;
      }
      return order;
    });

    setOrderList(updatedOrderList);

    event.target.reset();
    toggleModal();
  };

  const handleEditClick = (orderId) => {
    const editedOrder = orderList.find(
      (order) => order._id === orderId
    );
    setEditingOrder(editedOrder);

    setIsModalOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrderList = orderList.filter(
      (order) => order._id !== orderId
    );
    setOrderList(updatedOrderList);
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Đơn hàng</h1>
      <div className={cx("tableActions")}>
        <Button onClick={toggleModal} primary>Thêm đơn hàng</Button>
      </div>
      <h2>Danh sách đơn hàng</h2>
      <div className={cx("tableWrapper")}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx("content")}
        >
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Nhân viên phụ trách</th>
                <th>Khách hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orderList &&
                orderList.map((order) => (
                  <tr key={order._id}>
                    <td>{order.madh}</td>
                    <td>{order.ngaybatdau}</td>
                    <td>{order.ngayketthuc}</td>
                    <td>{order.nhanvien}</td>
                    <td>{order.khachhang}</td>
                    <td>{order.items}</td>
                    <td>
                      <button onClick={() => handleEditClick(order._id)}>
                        <FontAwesomeIcon icon={faEdit} className={cx("icon")} />{" "}
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
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

          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setFilter={setFilter}
          />
        </motion.div>
      </div>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={cx("modalWraper")}>
            <div className={cx("bigTitle")}>
              <h3>{editingOrder ? "Sửa đơn hàng" : "Thêm đơn hàng"}</h3>
            </div>

            <div className={cx("formContent")}>

            <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="madh">
                  Mã đơn hàng:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập mã đơn hàng"
                  maxLength={30}
                  type="text"
                  id="madh"
                  value={madh}
                  onChange={(e) => setMadh(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngaybatdau">
                  Ngày bắt đầu
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày bắt đầu"
                  maxLength={30}
                  type="date"
                  id="ngaybatdau"
                  value={ngaybatdau}
                  onChange={(e) => setNgaybatdau(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngayketthuc">
                  Ngày kết thúc
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày kết thúc"
                  maxLength={30}
                  type="date"
                  id="ngayketthuc"
                  value={ngayketthuc}
                  onChange={(e) => setNgayketthuc(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={cx("formGroupbutton")}>
              {editingOrder ? (
                <Button onClick={handleUpdateOrder} primary small>
                  Cập nhật
                </Button>
              ) : (
                <Button onClick={handleSubmit} primary small>
                  Thêm
                </Button>
              )}
              <Button onClick={toggleModal} outline small>
                Hủy
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
