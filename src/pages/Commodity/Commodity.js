import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

import style from "./Commodity.module.scss";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";
import Pagination from "~/components/Pagination/Pagination";
import * as commodityServices from "~/services/commodityServices";

export default function Commodity() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahh, setMahh] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gianhap, setGianhap] = useState("");
  const [giabanra, setGiabanra] = useState("");
  const [mota, setMota] = useState("");
  const [thue, setThue] = useState("");
  const [trangthai, setTrangthai] = useState("");
  const [soluongtrongkho, setSoluongtrongkho] = useState("");
  const [commodityList, setCommodityList] = useState([]);
  const [editingCommodity, setEditingCommodity] = useState(null);
  const [dvt, setDvt] = useState([]);
  const [loaihh, setLoaihh] = useState("");
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);
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
    setEditingCommodity(null);
  };

  // Get commodity data
  useEffect(() => {
    const getCommodities = async () => {
      const response = await commodityServices.getCommodities(filter);
      if (response?.data) {
        setCommodityList(response.data);
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
    getCommodities();
  }, [filter]);

  useEffect(() => {
    const getCommodityType = async () => {
      try {
        const response = await commodityServices.getCommodityType();
        setTypes(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getCommodityType();
  }, []);
  useEffect(() => {
    const getDvt = async () => {
      try {
        const response = await commodityServices.getDvt();
        setUnits(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDvt();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCommodity = {
      mahh,
      name,
      image,
      gianhap,
      giabanra,
      mota,
      thue,
      trangthai,
      soluongtrongkho,
      dvt,
      loaihh,
    };
    const createCommodity = async () => {
      const res = await commodityServices.createCommodity(newCommodity);
      console.log(res);
    };
    createCommodity();
  };

  const handleUpdateCommodity = (event) => {
    event.preventDefault();
    const updatedCommodity = {
      mahh: event.target.mahh.value || editingCommodity.mahh,
      name: event.target.name.value || editingCommodity.name,
      image: event.target.image.value || editingCommodity.image,
      price: event.target.price.value || editingCommodity.price,
      giabanra: event.target.giabanra.value || editingCommodity.giabanra,
      mota: event.target.mota.value || editingCommodity.mota,
      thue: event.target.thue.value || editingCommodity.thue,
      trangthai: event.target.trangthai.value || editingCommodity.trangthai,
      soluongtrongkho:
        event.target.soluongtrongkho.value || editingCommodity.soluongtrongkho,
      dvt: event.target.dvt.value || editingCommodity.dvt,
      loaihh: event.target.loaihh.value || editingCommodity.loaihh,
    };

    const updatedCommodityList = commodityList.map((commodity) => {
      if (commodity._id === updatedCommodity._id) {
        return updatedCommodity;
      }
      return commodity;
    });

    setCommodityList(updatedCommodityList);

    event.target.reset();
    toggleModal();
  };

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
      <h1>Hàng hóa</h1>
      <div className={cx("tableActions")}>
        <Button onClick={toggleModal} primary>Thêm hàng hóa</Button>
      </div>
      <h2>Danh sách hàng hóa</h2>
      <div className={cx("tableWrapper")}>
        <motion.div
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
                    <td>{commodity.dvt.map(unit=>{
                      return <span>{unit.dvt}</span>
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
              <h3>{editingCommodity ? "Sửa hàng hóa" : "Thêm hàng hóa"}</h3>
            </div>

            <div className={cx("formContent")}>

            <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="mahh">
                  Mã hàng hóa:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập mã hàng hóa"
                  maxLength={30}
                  type="text"
                  id="mahh"
                  value={mahh}
                  onChange={(e) => setMahh(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="name">
                  Tên hàng hóa:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên hàng hóa"
                  maxLength={30}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="image">
                  Hình ảnh:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Tải ảnh lên"
                  maxLength={30}
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="gianhap">
                  Giá nhập vào:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập giá nhập vào"
                  maxLength={30}
                  type="number"
                  id="gianhap"
                  value={gianhap}
                  onChange={(e) => setGianhap(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="giabanra">
                  Giá bán ra:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập giá bán ra"
                  maxLength={30}
                  type="text"
                  id="giabanra"
                  value={giabanra}
                  onChange={(e) => setGiabanra(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="mota">
                  Mô tả:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập mô tả"
                  maxLength={30}
                  type="text"
                  id="mota"
                  value={mota}
                  onChange={(e) => setMota(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="thue">
                  Thuế:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập thuế"
                  maxLength={30}
                  type="text"
                  id="thue"
                  value={thue}
                  onChange={(e) => setThue(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="trangthai">
                  Trạng thái:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập trạng thái"
                  maxLength={30}
                  type="text"
                  id="trangthai"
                  value={trangthai}
                  onChange={(e) => setTrangthai(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="soluongtrongkho">
                  Số lượng trong kho:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập số lượng trong kho"
                  maxLength={30}
                  type="text"
                  id="soluongtrongkho"
                  value={soluongtrongkho}
                  onChange={(e) => setSoluongtrongkho(e.target.value)}
                  required
                />
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="dvt">
                  Đơn vị tính &nbsp;{" "}
                </label>
                <select
                  className={cx("formInput")}
                  id="dvt"
                  value={dvt}
                  onChange={(e) => setDvt(e.target.value)}
                  required
                >
                  <option value="">Chọn Đơn vị tính</option>
                  {units &&
                    units.map((unit) => {
                      return (
                        <option key={unit._id} value={unit._id}>
                          {unit.dvt}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="loaihh">
                  Loại hàng hóa &nbsp;{" "}
                </label>
                <select
                  className={cx("formInput")}
                  id="loaihh"
                  value={loaihh}
                  onChange={(e) => setLoaihh(e.target.value)}
                  required
                >
                  <option value="">Chọn loại hàng hóa</option>
                  {types &&
                    types.map((type) => {
                      return (
                        <option key={type._id} value={type._id}>
                          {type.loaihh}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className={cx("formGroupbutton")}>
              {editingCommodity ? (
                <Button onClick={handleUpdateCommodity} primary small>
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
