import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Contract.module.scss";
import Pagination from "~/components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


      setContracts((prevContracts) =>
        prevContracts.map((contract) =>
          contract.id === selectedContract.id ? updatedContract : contract
        )
      );
      setSelectedContract(null);
      toggleModal();
    };


                <input
                  className={cx("formInput")}
                  placeholder="Nhập mã hợp đồng..."
                  maxLength={6}
                  type="text"
                  id="mahd"
                  value={mahd}
                  onChange={(e) => setMahd(e.target.value)}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="khachhang">
                  Khách hàng:
                </label>
                <select
                  id="khachhang"
                  value={khachhang || ""}
                  onChange={(e) => {
                    setKhachhang(e.target.value);
                  }}
                  className={cx("formInput")}
                  required
                >
                  <option value="" disabled>
                    Chọn khách hàng
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="nhanvien">
                  Nhân viên: &nbsp;{" "}
                </label>
                <select
                  className={cx("formInput")}
                  id="nhanvien"
                  value={nhanvien}
                  onChange={(e) => setNhanvien(e.target.value)}
                  required
                >
                  <option value="">Chọn Nhân viên</option>
                  {staffs &&
                    staffs.map((staff) => {
                      return (
                        <option key={staff._id} value={staff._id}>
                          {staff.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="hinhthuctt">
                  Hình thức thanh toán:
                </label>
                <select
                  id="hinhthuctt"
                  value={hinhthuctt || ""}
                  onChange={(e) => {
                    setHinhthuctt(e.target.value);
                  }}
                  className={cx("formInput")}
                  required
                >
                  <option value="" disabled>
                    Chọn hình thức thanh toán
                  </option>
                  <option value="tra-truoc">Trả trước</option>
                  <option value="tra-gop">Trả góp</option>
                  <option value="thanh-toan-truc-tiep">
                    Thanh toán trực tiếp
                  </option>
                </select>
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="loaitt">
                  Loại thanh toán:
                </label>
                <select
                  id="loaitt"
                  value={loaitt || ""}
                  onChange={(e) => {
                    setLoaitt(e.target.value);
                  }}
                  className={cx("formInput")}
                  required
                >
                  <option value="" disabled>
                    Chọn loại thanh toán
                  </option>
                  <option value="tien-mat">Tiền mặt</option>
                  <option value="chuyen-khoan">Chuyển Khoản</option>
                </select>
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="giatrihd">
                  Giá trị hợp đồng:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập giá trị hợp đồng..."
                  maxLength={10}
                  type="number"
                  id="giatrihd"
                  value={giatrihd}
                  onChange={(e) => setGiatrihd(e.target.value)}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="sotientt">
                  Số tiền thanh toán:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập số tiền thanh toán..."
                  maxLength={10}
                  type="number"
                  id="sotientt"
                  value={sotientt}
                  onChange={(e) => setSotientt(e.target.value)}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="soquy">
                  Số Quỹ
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập số quỹ..."
                  maxLength={10}
                  type="number"
                  id="soquy"
                  value={soquy}
                  onChange={(e) => setSoquy(e.target.value)}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="donhang">
                  Đơn Hàng:
                </label>
                <select
                  id="donhang"
                  value={donhang || ""}
                  onChange={(e) => {
                    setDonhang(e.target.value);
                  }}
                  className={cx("formInput")}
                  required
                >
                  <option value="" disabled>
                    Chọn đơn hàng
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="loaihd">
                  Loại hợp đồng:
                </label>
                <select
                  className={cx("formInput")}
                  id="loaihd"
                  value={loaihd}
                  onChange={(e) => setLoaihd(e.target.value)}
                  required
                >
                  <option value="">Chọn Loại hợp đồng</option>
                  {contractTypes &&
                    contractTypes.map((contractType) => {
                      return (
                        <option key={contractType._id} value={contractType._id}>
                          {contractType.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="guiemail">
                  Gửi Email:
                </label>
                <input
                  className={cx("formInput")}
                  type="checkbox"
                  id="guiemail"
                  checked={guiemail}
                  onChange={() => {
                    setGuiemail(!guiemail);
                  }}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngaybatdau">
                  Ngày bắt đầu:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày bắt đầu..."
                  type="date"
                  id="ngaybatdau"
                  value={ngaybatdau}
                  onChange={(e) => {
                    setNgaybatdau(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngayketthuc">
                  Ngày kết thúc:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày kết thúc..."
                  type="date"
                  id="ngayketthuc"
                  value={ngayketthuc}
                  onChange={(e) => {
                    setNgayketthuc(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngaytt">
                  Ngày thanh toán:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ngày thanh toán..."
                  type="date"
                  id="ngaytt"
                  value={ngaytt}
                  onChange={(e) => {
                    setNgaytt(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="canhbaohh">
                  Cảnh báo hết hạn:
                </label>
                <input
                  className={cx("formInput")}
                  type="checkbox"
                  id="canhbaohh"
                  checked={canhbaohh}
                  onChange={(e) => {
                    setCanhbaohh(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="doanhsotinhcho">
                  Doanh số tính cho:
                </label>
                <select
                  id="doanhsotinhcho"
                  value={doanhsotinhcho || ""}
                  onChange={(e) => {
                    setDoanhsotinhcho(e.target.value);
                  }}
                  className={cx("formInput")}
                  required
                >
                  <option value="" disabled>
                    Chọn Doanh số tính cho
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ghichu">
                  Ghi chú:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ghi chú..."
                  maxLength={100}
                  type="text"
                  id="ghichu"
                  value={ghichu}
                  onChange={(e) => {
                    setGhichu(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ghichuthuonng">
                  Ghi chú thưởng:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập ghi chú thưởng..."
                  maxLength={10}
                  type="text"
                  id="ghichuthuong"
                  value={ghichuthuong}
                  onChange={(e) => {
                    setGhichuthuong(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="xacnhan">
                  Xác nhận:
                </label>
                <input
                  className={cx("formInput")}
                  type="checkbox"
                  id="xacnhan"
                  checked={xacnhan}
                  onChange={(e) => {
                    setXacnhan(!xacnhan);
                  }}
                  required
                />
              </div>
            </div>

            <div className={cx("formGroupbutton")}>
              {editingContract ? (
                <Button onClick={handleUpdateContract} primary small>
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
