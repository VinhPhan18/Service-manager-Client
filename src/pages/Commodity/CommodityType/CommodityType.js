import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./CommodityType.module.scss";
import * as commodityServices from "~/services/commodityServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";

export default function CommodityType({ data, openCommodityTypeModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commodityTypeList, setCommodityTypeList] = useState([]);
  const [loaihh, setLoaihh] = useState("");
  const [error, setError] = useState("");
  const [IsCommodityTypeSuccessfullySet, setIsCommodityTypeSuccessfullySet] =
    useState(false);

  const createCommodityTypeSuccessfully = () => toast(error);

  useEffect(() => {
    if (IsCommodityTypeSuccessfullySet) {
      createCommodityTypeSuccessfully();

      setTimeout(() => {
        setIsCommodityTypeSuccessfullySet(false);
      }, 1000);
    }
  }, [IsCommodityTypeSuccessfullySet]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setLoaihh("");
  };

  useEffect(() => {
    const fetchCommodityTypes = async () => {
      try {
        const response = await commodityServices.getCommodityType();
        setCommodityTypeList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommodityTypes();
  }, []);

  const handleSubmit = async () => {
    const newCommodityType = {
      loaihh,
    };

    try {
      const res = await commodityServices.createCommodityType(newCommodityType);
      setError(res.message);
      setIsCommodityTypeSuccessfullySet(true);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (commoditytypeId) => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal closeModal={openCommodityTypeModal}>
        <div className={cx("wrapper")}>
          <ToastContainer />
          <h1>Danh sách loại hàng hóa</h1>
          <div className={cx("tableActions")}>
            <Button onClick={toggleModal} primary>
              Thêm loại hàng hóa
            </Button>
          </div>
          <div className={cx("tableWrapper")}>
            <div className={cx("content")}>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>Tên loại hàng hóa</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {commodityTypeList &&
                    commodityTypeList.map((commodityType) => (
                      <tr key={commodityType._id}>
                        <td>{commodityType.loaihh}</td>
                        <td>{commodityType.mota}</td>
                        <td>
                          <button
                            onClick={() => handleEditClick(commodityType._id)}
                            className={cx("icon")}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={cx("modalWraper")}>
            <div className={cx("bigTitle")}>
              <h2>Thêm loại hàng hóa</h2>
            </div>
            <div className={cx("formGroup")}>
              <div className={cx("formInputWrapper")}>
                <label className={cx("formTitle")} htmlFor="loaihh">
                  Tên loại hàng hóa
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên loại hàng hóa..."
                  maxLength={30}
                  type="text"
                  id="loaihh"
                  value={loaihh}
                  onChange={(e) => setLoaihh(e.target.value)}
                  required
                />
              </div>

            </div>
            <div className={cx("formGroupbutton")}>
              <Button onClick={handleSubmit} primary small>
                Thêm
              </Button>
              <Button onClick={toggleModal} primary small>
                Hủy
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
