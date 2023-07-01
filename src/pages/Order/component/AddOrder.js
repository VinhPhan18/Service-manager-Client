import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";

import style from "./AddOrder.module.scss";
import * as orderServices from "~/services/orderServices";
import Button from "~/components/Button/Button";
import GetCustomer from "~/components/GetCustomer/GetCustomer";
import GetStaff from "~/components/GetStaff/GetStaff";
import OrderItem from "~/components/OrderItem/OrderItem";

export default function AddOrder({
  orderList,
  setOrderList,
  toggleModal,
  // setIsModalOpen,
  editingOrder,
  setCreatedOrderSuccessfully,
}) {
  const cx = classNames.bind(style);
  const [madh, setMadh] = useState("");
  const [ngaybatdau, setNgaybatdau] = useState("");
  const [ngayketthuc, setNgayketthuc] = useState("");
  const [nhanvien, setNhanvien] = useState("");
  const [khachhang, setKhachhang] = useState("");
  const [hanghoa, setHanghoa] = useState("");
  const [soluong, setSoluong] = useState([]);
  const [chietkhau, setChietkhau] = useState([]);
  const [searchCustomerValue, setSearchCustomerValue] = useState("");
  const [searchStaffValue, setSearchStaffValue] = useState("");

  const [error, setError] = useState("");

  //CREATE ORDER
  const handleSubmit = () => {
    const newOrder = {
      madh,
      ngaybatdau,
      ngayketthuc,
      nhanvien,
      khachhang,
      hanghoa,
      soluong,
      chietkhau,
    };
    const createOrder = async () => {
      const res = await orderServices.createOrder(newOrder);
      if (res) {
        setOrderList([res.data, ...orderList]);
        setCreatedOrderSuccessfully(true);
        toggleModal(false);
      } else {
        setError(res);
      }
      console.log(res);
    };
    createOrder();
  };

  //EDIT ORDER
  const handleUpdateOrder = (event) => {
    event.preventDefault();
    const updatedOrder = {
      mahh: event.target.madh.value || editingOrder.madh,
      ngaybatdau: event.target.ngaybatdau.value || editingOrder.ngaybatdau,
      ngayketthuc: event.target.ngayketthuc.value || editingOrder.ngayketthuc,
      nhanvien: event.target.nhanvien.value || editingOrder.nhanvien,
      khachhang: event.target.khachhang.value || editingOrder.khachhang,
      hanghoa: event.target.hanghoa.value || editingOrder.hanghoa,
      soluong: event.target.soluong.value || editingOrder.soluong,
      chietkhau: event.target.chietkhau.value || editingOrder.chietkhau,
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

  return (
    <div className={cx("modalWraper")}>
      <div className={cx("bigTitle")}>
        <h3> {editingOrder ? "Sửa Đơn Hàng" : "Thêm Đơn Hàng"}</h3>
      </div>

      <span>{error}</span>
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

        <div className={cx("formGroup")}>
          <label className={cx("formTitle")} htmlFor="nhanvien">
            Nhân viên phụ trách:
          </label>
          <input
            type="text"
            placeholder="Nhập tên kách hàng muốn tìm"
            value={searchStaffValue}
            onChange={(e) => setSearchStaffValue(e.target.value)}
            className={cx("formInput")}
          />
          <GetStaff
            value={nhanvien}
            setValue={setNhanvien}
            searchValue={searchStaffValue}
          />
        </div>

        <div className={cx("formGroup")}>
          <label className={cx("formTitle")} htmlFor="khachhang">
            Khách hàng:
          </label>
          <input
            type="text"
            placeholder="Nhập tên kách hàng muốn tìm"
            value={searchCustomerValue}
            onChange={(e) => setSearchCustomerValue(e.target.value)}
            className={cx("formInput")}
          />
          <GetCustomer
            value={khachhang}
            setValue={setKhachhang}
            searchValue={searchCustomerValue}
          />
        </div>
        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="hanghoa">Hàng hóa</label>
          <OrderItem value={hanghoa} setValue={setHanghoa} />
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
        <Button onClick={toggleModal} primary small>
          Hủy
        </Button>
      </div>
    </div>
  );
}
