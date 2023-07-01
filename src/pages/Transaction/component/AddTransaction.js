import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import Button from "~/components/Button/Button";
import stype from "./AddTransaction.module.scss";
import GetCustomer from "~/components/GetCustomer/GetCustomer";
import GetContact from "~/components/GetContact/GetContact";
import * as request from "~/utils/request";
import * as transactionServices from "~/services/transactionServices";
import GetStaff from "../../../components/GetStaff/GetStaff";
import GetTransactionType from "../../../components/GetTransactionType/GetTransactionType";
import GetTransactionStatus from "../../../components/GetTransactionStatus/GetTransactionStatus";
export default function AddTransaction({
  closeModal,
  setOpenNoti,
  setNotiContent,
}) {
  const cx = classNames.bind(stype);

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
  const [searchTransactionTypeValue, setSearchTransactionTypeValue] =
    useState("");
  const [searchTransactionStatusValue, setSearchTransactionStatusValue] =
    useState("");
  const [searchStaffValue, setSearchStaffValue] = useState("");
  const [searchCustomerValue, setSearchCustomerValue] = useState("");
  const [searchContactValue, setSearchContactValue] = useState("");

  const handleCreateTransaction = () => {
    const data = {
      name: name.trim(),
      diachihd: diachigd.trim(),
      mota: mota.trim(),
      danhgia: danhgia.trim(),
      ngaybatdau,
      hanhoanthanh,
      songaygd,
      ketquagd: ketquagd.trim(),
      guiemail,
      tailieugiaodich: tailieugiaodich.trim(),
      loaigd,
      trangthaigd,
      khachhang,
      nguoilienhe,
      nhanvien,
    };
    const fetchApi = async () => {
      const createTransaction = await transactionServices.createTransaction(
        data
      );

      if (createTransaction) {
        setOpenNoti(true);
        setNotiContent(createTransaction?.message);
      }
    };
    fetchApi();
  };
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("bigTitle")}>Thêm giao dịch</h1>

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
                Tên nhân viên:
              </label>
              <input
                type="text"
                placeholder="Nhập tên nhân viên muốn tìm"
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
            {/* KHACH HANG */}
            <div className={cx("formGroup")}>
              <label className={cx("formTitle")} htmlFor="doanhsotinhcho">
                Khách hàng:
              </label>
              <input
                type="text"
                placeholder="Nhập tên khách hàng muốn tìm"
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

            {/* NGUOI LIEN HE */}
            <div className={cx("formGroup")}>
              <label className={cx("formTitle")} htmlFor="nguoilienhe">
                Người liên hệ:
              </label>
              <input
                type="text"
                placeholder="Nhập tên người liên hệ muốn tìm"
                value={searchContactValue}
                onChange={(e) => setSearchContactValue(e.target.value)}
                className={cx("formInput")}
              />
              <GetContact
                value={nguoilienhe}
                setValue={setNguoilienhe}
                searchValue={searchContactValue}
              />
            </div>

            {/* LOAI GIAO DICH */}
            <div className={cx("formGroup")}>
              <label className={cx("formTitle")} htmlFor="loaigd">
                Loại giao dịch:
              </label>
              <input
                type="text"
                placeholder="Nhập tên loại giao dịch muốn tìm"
                value={searchTransactionTypeValue}
                onChange={(e) => setSearchTransactionTypeValue(e.target.value)}
                className={cx("formInput")}
              />
              <GetTransactionType
                value={loaigd}
                setValue={setLoaigd}
                searchValue={searchTransactionTypeValue}
              />
            </div>
            {/* LOAI GIAO DICH */}
            <div className={cx("formGroup")}>
              <label className={cx("formTitle")} htmlFor="trangthaigd">
                Trạng thái giao dịch giao dịch:
              </label>
              <input
                type="text"
                placeholder="Nhập trạng thái giao dịch muốn tìm"
                value={searchTransactionStatusValue}
                onChange={(e) =>
                  setSearchTransactionStatusValue(e.target.value)
                }
                className={cx("formInput")}
              />
              <GetTransactionStatus
                value={trangthaigd}
                setValue={setTrangthaigd}
                searchValue={searchTransactionStatusValue}
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            {/* CANH BAO HET HAN */}
            <div className={cx("formGroup")}>
              <label className={cx("formTitle")} htmlFor="guiemail">
                Gửi email:
              </label>
              <input
                className={cx("formInput")}
                type="checkbox"
                id="guiemail"
                value={guiemail}
                onChange={(e) => setGuiemail(e.target.checked)}
                required
              />
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
          </div>
        </div>
        <div className={cx("boxBtns")}>
          <Button primary onClick={handleCreateTransaction}>
            Thêm hợp đồng
          </Button>

          <Button outline onClick={() => closeModal(false)}>
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  );
}
