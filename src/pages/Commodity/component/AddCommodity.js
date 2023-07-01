import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./AddCommodity.module.scss";
import * as commodityServices from "~/services/commodityServices";
import Button from "~/components/Button/Button";
import CommodityType from '~/components/CommodityType/CommodityType';
import CommodityUnit from '~/components/CommodityUnit/CommodityUnit';

export default function AddCommodity({
  commodityList,
  setCommodityList,
  toggleModal,
  // setIsModalOpen,
  editingCommodity,
  setCreatedCommoditySuccessfully,
}) {
  const cx = classNames.bind(style);
  const [mahh, setMahh] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gianhap, setGianhap] = useState("");
  const [giabanra, setGiabanra] = useState("");
  const [mota, setMota] = useState("");
  const [thue, setThue] = useState("");
  const [trangthai, setTrangthai] = useState("");
  const [soluongtrongkho, setSoluongtrongkho] = useState("");

  const [dvt, setDvt] = useState([]);
  const [loaihh, setLoaihh] = useState("");

  const [error, setError] = useState("");

  //CREATE COMMODITY
  const handleSubmit = () => {
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

      if (res) {
        setCommodityList([res.data, ...commodityList])
        setCreatedCommoditySuccessfully(true)
        toggleModal(false)
      } else {
        setError(res.message)

      }
      console.log(res);
    };
    createCommodity();
  };

  //EDIT COMMODITY
  const handleUpdateCommodity = (event) => {
    event.preventDefault();
    const updatedCommodity = {
      mahh: event.target.mahh.value || editingCommodity.mahh,
      name: event.target.name.value || editingCommodity.name,
      image: event.target.image.value || editingCommodity.image,
      gianhap: event.target.gianhap.value || editingCommodity.gianhap,
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

  return (
    <div className={cx("modalWraper")}>
      <div className={cx("bigTitle")}>
        <h3> {editingCommodity ? "Sửa Hàng Hóa" : "Thêm Hàng Hóa"}</h3>
      </div>

      <span>{error}</span>
      <div className={cx("formContent")}>
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

        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="dvt">Đơn vị tính:</label>
          <CommodityUnit value={dvt} setValue={setDvt} />
        </div>

        <div className={cx('formGroup')}>
          <label className={cx("formTitle")} htmlFor="loaihh">Loại hàng hóa:</label>
          <CommodityType value={loaihh} setValue={setLoaihh} />
        </div>
      </div>

      <div className={cx("formGroupbutton")}>

        {
          editingCommodity ? (
            <Button onClick={handleUpdateCommodity} primary small>Cập nhật</Button>

          ) : (

            <Button onClick={handleSubmit} primary small>Thêm</Button>
          )
        }
        <Button onClick={toggleModal} primary small>Hủy</Button>
      </div>
    </div>
  );
}
