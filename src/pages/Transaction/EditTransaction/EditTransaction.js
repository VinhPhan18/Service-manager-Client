import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./EditTransaction.module.scss";
import Button from "~/components/Button/Button";
import GetTransactionType from "~/components/GetTransactionType/GetTransactionType";
import Modal from "~/components/Modal/Modal";
import { useDateFormat } from "~/hooks";
import * as transactionServices from "~/services/transactionServices";

export default function EditTransaction({
  data,
  modal,
  closeModal,
  session,
  setOpenNoti,
  setNotiContent,
}) {
  const cx = classNames.bind(style);

  const [name, setName] = useState("");
  const [diachigd, setDiachigd] = useState("");
  const [mota, setMota] = useState("");
  const [danhgia, setDanhgia] = useState("");
  const [ngaybatdau, setNgaybatdau] = useState("");
  const [hanhoanthanh, setHanhoanthanh] = useState("");
  const [songaygd, setSongaygd] = useState(0);
  const [ketquagd, setKetquagd] = useState("");
  const [guiemail, setGuiemail] = useState(false);
  const [tailieugiaodich, setTailieugiaodich] = useState("");
  const [loaigd, setLoaigd] = useState("");
  const [trangthaigd, setTrangthaigd] = useState("Thành công");
  const [nhanvien, setNhanvien] = useState("");
  const [nguoilienhe, setNguoilienhe] = useState("");
  const [khachhang, setKhachhang] = useState("");

  const nbd = useDateFormat(data?.ngaybatdau);
  const hht = useDateFormat(data?.hanhoanthanh);

  // INITIAL DATA
  useEffect(() => {
    setName(data?.name);
    setDiachigd(data?.diachigd);
    setMota(data?.mota);
    setDanhgia(data?.danhgia);
    setSongaygd(data?.songaygd);
    setKetquagd(data?.ketquagd);
    setGuiemail(data?.guiemail);
    setTailieugiaodich(data?.tailieugiaodich);
    setLoaigd(data?.loaigd?._id);
    setTrangthaigd(data?.trangthaigd?.name);
    setNhanvien(data?.nhanvien?.hơten);
    setNguoilienhe(data?.nguoilienhe?.name);
    setKhachhang(data?.khachhang);

    setNgaybatdau(nbd);
    setHanhoanthanh(hht);
  });

  const handleEdit = () => {
    const newData = {
      _id: data._id,
      mota,
      ngaybatdau,
      hanhoanthanh,
      danhgia,
      songaygd,
      ketquagd,
      tailieugiaodich,
      loaigd,
      trangthaigd,
      nhanvien,
      khachhang,
      guiemail,
      role: session.role,
    };

    const fetchApi = async () => {
      const res = await transactionServices.editTransaction(newData);
      if (res) {
        setOpenNoti(true);
        setNotiContent(res.message);
        if (res.status) {
          closeModal(false);
        }
      }
    };
    fetchApi();
  };

  return (
    modal && (
      <Modal closeModal={closeModal}>
        <div>
          <div className={cx("container")}>
            <div className={cx("formContent")}>
              <div className={cx("left")}>
                {/* TEN GIA DICH */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="name">
                    Tên giao dịch:
                  </label>
                  <input
                    className={cx("formInput")}
                    placeholder="Nhập tên giao dịch..."
                    maxLength={30}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* NHAN VIEN */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="nhanvien">
                    Nhân viên:
                  </label>

                  <input
                    className={cx("formInput")}
                    type="text"
                    id="nhanvien"
                    disabled
                    value={nhanvien}
                  />
                </div>

                {/* KHACH HANG */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="khachhang">
                    Khách hàng:
                  </label>
                  <input
                    type="text"
                    className={cx("formInput")}
                    id="khachhang"
                    disabled
                    value={khachhang}
                  />
                </div>
                {/* NGUOI LIEN HE */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="nguoilienhe">
                    Người liên hệ:
                  </label>
                  <input
                    className={cx("formInput")}
                    type="text"
                    id="nguoilienhe"
                    disabled
                    value={nguoilienhe}
                  />
                </div>
                {/* KHACH HANG */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="trangthaigd">
                    Trạng thái giao dịch:
                  </label>
                  <input
                    type="text"
                    className={cx("formInput")}
                    id="trangthaigd"
                    disabled
                    value={trangthaigd}
                  />
                </div>
                {/* DIA CHI GIAO DICH */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="diachigd">
                    Địa chỉ giao dịch:
                  </label>
                  <input
                    className={cx("formInput")}
                    type="text"
                    id="diachigd"
                    value={diachigd}
                    onChange={(e) => setDiachigd(e.target.value)}
                  />
                </div>

                {/* NGAY BAT DAU */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="ngaybatdau">
                    Ngày bắt đầu:
                  </label>
                  <input
                    className={cx("formInput")}
                    type="date"
                    id="ngaybatdau"
                    value={ngaybatdau}
                    onChange={(e) => {
                      setNgaybatdau(e.target.value);
                    }}
                  />
                </div>

                {/* HAN HOAN THANH */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="hanhoanthanh">
                    Hạn hoàn thành:
                  </label>
                  <input
                    className={cx("formInput")}
                    type="date"
                    id="hanhoanthanh"
                    value={hanhoanthanh}
                    onChange={(e) => setHanhoanthanh(e.target.value)}
                  />
                </div>
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="songaygd">
                    Số ngày giao dịch:
                  </label>

                  <input
                    id="songaygd"
                    value={songaygd}
                    type="number"
                    onChange={(e) => setSongaygd(e.target.value)}
                    className={cx("formInput")}
                  />
                </div>
                {/* LOAI HOP DONG */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="loaigd">
                    Loại giao dịch:
                  </label>
                  <GetTransactionType value={loaigd} setValue={setLoaigd} />
                </div>
              </div>
              <div className={cx("right")}>
                {/* DANH GIA */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="danhgia">
                    Đánh giá :
                  </label>
                  <textarea
                    value={danhgia}
                    onChange={(e) => setDanhgia(e.target.value)}
                    name="danhgia"
                    id="danhgia"
                    cols="100%"
                    rows="5"
                    className={cx("formInput")}
                  ></textarea>
                </div>
                {/* MO TA */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="mota">
                    Mô tả:
                  </label>
                  <textarea
                    value={mota}
                    onChange={(e) => setMota(e.target.value)}
                    name="mota"
                    id="mota"
                    cols="100%"
                    rows="5"
                    className={cx("formInput")}
                  ></textarea>
                </div>
                {/* KET QUA GIAO DICH */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="ketquagd">
                    Kết quả giao dịch:
                  </label>
                  <textarea
                    value={ketquagd}
                    onChange={(e) => setKetquagd(e.target.value)}
                    name="ketquagd"
                    id="ketquagd"
                    cols="100%"
                    rows="5"
                    className={cx("formInput")}
                  ></textarea>
                </div>
                {/* TAI LIEU GIAO DICH */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="tailieugiaodich">
                    Tài liệu giao dịch:
                  </label>
                  <textarea
                    value={tailieugiaodich}
                    onChange={(e) => setTailieugiaodich(e.target.value)}
                    name="tailieugiaodich"
                    id="tailieugiaodich"
                    cols="100%"
                    rows="5"
                    className={cx("formInput")}
                  ></textarea>
                </div>
                {/* GUI EMAIL */}
                <div className={cx("formGroup")}>
                  <label className={cx("formTitle")} htmlFor="guiemail">
                    Gửi email:
                  </label>
                  <input
                    id="guiemail"
                    type="checkbox"
                    value={guiemail}
                    onChange={(e) => setGuiemail(e.target.checked)}
                    className={cx("formInput")}
                  />
                </div>
              </div>
            </div>
            <div className={cx("boxBtns")}>
              <Button primary onClick={handleEdit}>
                Sửa
              </Button>

              <Button outline onClick={() => closeModal(false)}>
                Huỷ
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
}
