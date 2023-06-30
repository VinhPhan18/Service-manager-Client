import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./CommodityUnit.module.scss";
import * as commodityServices from "~/services/commodityServices";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";

export default function CommodityUnit({ data, openCommodityUnitModal }) {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commodityUnitList, setCommodityUnitList] = useState([]);
  const [dvt, setDvt] = useState("");
  const [error, setError] = useState("");
  const [IsCommodityUnitSuccessfullySet, setIsCommodityUnitSuccessfullySet] =
    useState(false);

  const createCommodityUnitSuccessfully = () => toast(error);

  useEffect(() => {
    if (IsCommodityUnitSuccessfullySet) {
      createCommodityUnitSuccessfully();

      setTimeout(() => {
        setIsCommodityUnitSuccessfullySet(false);
      }, 1000);
    }
  }, [IsCommodityUnitSuccessfullySet]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setDvt("");
  };

  useEffect(() => {
    const fetchCommodityUnits = async () => {
      try {
        const response = await commodityServices.getCommodityUnit();
        setCommodityUnitList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommodityUnits();
  }, []);

  const handleSubmit = async () => {
    const newCommodityUnit = {
      dvt,
    };

    try {
      const res = await commodityServices.createCommodityUnit(newCommodityUnit);
      setError(res.message);
      setIsCommodityUnitSuccessfullySet(true);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (commodityUnitId) => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal closeModal={openCommodityUnitModal}>
        <div className={cx("wrapper")}>
          <ToastContainer />
          <h1>Danh sách đơn vị tính</h1>
          <div className={cx("tableActions")}>
            <Button onClick={toggleModal} primary>
              Thêm đơn vị tính
            </Button>
          </div>
          <div className={cx("tableWrapper")}>
            <div className={cx("content")}>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>Tên đơn vị tính</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {commodityUnitList &&
                    commodityUnitList.map((commodityUnit) => (
                      <tr key={commodityUnit._id}>
                        <td>{commodityUnit.dvt}</td>
                        <td>
                          <button
                            onClick={() => handleEditClick(commodityUnit._id)}
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
              <h2>Thêm đơn vị tính</h2>
            </div>
            <div className={cx("formGroup")}>
              <div className={cx("formInputWrapper")}>
                <label className={cx("formTitle")} htmlFor="dvt">
                  Tên đơn vị tính
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên đơn vị tính..."
                  maxLength={30}
                  type="text"
                  id="dvt"
                  value={dvt}
                  onChange={(e) => setDvt(e.target.value)}
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
