import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import style from './EditContract.module.scss'
import Button from '~/components/Button/Button'
import GetContractType from '~/components/GetContractType/GetContractType'
import Modal from '~/components/Modal/Modal'
import { useDateFormat } from '~/hooks'


export default function EditContract({ data, modal, closeModal }) {

  const cx = classNames.bind(style)

  const [tenhd, setTenhd] = useState(data.tenhd)
  const [giatrihd, setGiatrihd] = useState("")
  const [giatrihdFormatted, setGiatrihdFormatted] = useState("")
  const [ngaybatdau, setNgaybatdau] = useState("")
  const [ngayketthuc, setNgayketthuc] = useState("")
  const [canhbaohh, setCanhbaohh] = useState(false)
  const [hinhthuctt, setHinhthuctt] = useState("")
  const [loaitt, setLoaitt] = useState("")
  const [sotienconthieu, setSotienconthieu] = useState()
  const [sotienconthieuFormatted, setSotienconthieuFormatted] = useState("")
  const [sotientt, setSotientt] = useState(0)
  const [sotienttFormatted, setSotienttFormatted] = useState("")
  const [nhanvien, setNhanvien] = useState("")
  const [ngaytt, setNgaytt] = useState("")
  const [soquy, setSoquy] = useState(0)
  const [xacnhan, setXacnhan] = useState(false)
  const [ghichu, setGhichu] = useState("")
  const [loaihd, setLoaihd] = useState("")
  const [guiemail, setGuiemail] = useState(false)
  const [ghichuthuong, setGhichuthuong] = useState("")
  const [khachhang, setKhachhang] = useState("")
  const [orderPreview, setOrderPreview] = useState([])

  const nbd = useDateFormat(data?.ngaybatdau)
  const nkt = useDateFormat(data?.ngayketthuc)
  const ntt = useDateFormat(data?.ngaytt)


  useEffect(() => {
    setTenhd(data?.tenhd)
    setGiatrihd(data?.giatrihopdong)
    setCanhbaohh(data?.canhbaohh)
    setHinhthuctt(data?.hinhthuctt)
    setLoaitt(data?.loaitt)
    setSotientt(data?.sotientt)
    setSotienconthieu(data?.sotienconthieu)
    setNhanvien(data?.nhanvien)
    setSoquy(data?.soquy)
    setXacnhan(data?.xacnhan)
    setGhichu(data?.ghichu)
    setLoaihd(data?.loaihd?._id)
    setGuiemail(data?.guiemail)
    setGhichuthuong(data?.ghichuthuong)
    setKhachhang(data?.khachhang)
    setOrderPreview(data?.items)

    setNgaybatdau(nbd)
    setNgayketthuc(nkt)
    setNgaytt(ntt)

    if (data?.sotientt && data?.giatrihopdong && data?.sotienconlai) {
      const gthd = data?.giatrihopdong.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setGiatrihdFormatted(gthd)

      const sttt = data?.sotientt.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienttFormatted(sttt)

      const stcl = data?.sotienconlai.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienconthieuFormatted(stcl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleChangePayment = (e) => {
    const paymentValue = parseFloat(e.target.value);

    if (paymentValue > giatrihd) {
      setSotientt(giatrihd);
      setSotienconthieu(0);
      const formattedCost1 = giatrihd.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienttFormatted(formattedCost1);

      const formattedCost2 = (0).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienconthieuFormatted(formattedCost2);
    } else if (isNaN(paymentValue)) {
      setSotientt(0);
      setSotienconthieu(giatrihd);

      const formattedCost1 = (0).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienttFormatted(formattedCost1);

      const formattedCost2 = giatrihd.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienconthieuFormatted(formattedCost2);
    } else {
      setSotientt(paymentValue);
      setSotienconthieu(giatrihd - paymentValue);

      const formattedCost1 = paymentValue.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienttFormatted(formattedCost1);

      const formattedCost2 = (giatrihd - paymentValue).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSotienconthieuFormatted(formattedCost2);
    }
  };

  return (
    modal && <Modal closeModal={closeModal}>
      <div>
        <div className={cx("container")}>
          <div className={cx("formContent")}>
            <div className={cx("left")}>
              {/* TEN HOP DONG */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="tenhd">
                  Tên hợp đồng:
                </label>
                <input
                  className={cx("formInput")}
                  placeholder="Nhập tên hợp đồng..."
                  maxLength={30}
                  type="text"
                  id="tenhd"
                  value={tenhd}
                  onChange={(e) => setTenhd(e.target.value)}
                  required
                />
              </div>

              {/* NHAN VIEN */}
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="nhanvien">Nhân viên:</label>

                <input
                  className={cx("formInput")}
                  type="text"
                  id="nhanvien"
                  disabled
                  value={nhanvien}
                  required
                />
              </div>

              {/* DOANH SO TINH CHO */}
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="doanhsotinhcho">Doanh số tính cho:</label>
                <input
                  className={cx("formInput")}
                  type="text"
                  id="doanhsotinhcho"
                  disabled
                  value={nhanvien}
                  required
                />
              </div>

              {/* KHACH HANG */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="doanhsotinhcho">
                  Khách hàng:
                </label>
                <input type="text" className={cx("formInput")} disabled value={khachhang} />
              </div>

              {/* LOAI HOP DONG */}
              <div className={cx('formGroup')}>
                <label className={cx("formTitle")} htmlFor="loaihd">Loại hợp đồng:</label>
                <GetContractType value={loaihd} setValue={setLoaihd} />
              </div>

              {/* GIA TRI HOP DONG */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="giatrihd">
                  Giá trị hợp đồng:
                </label>
                <input
                  className={cx("formInput")}
                  type="text"
                  id="giatrihd"
                  value={giatrihdFormatted}
                  disabled
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

              {/* NGAY KET THUC */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngayketthuc">
                  Ngày kết thúc:
                </label>
                <input
                  className={cx("formInput")}
                  type="date"
                  id="ngayketthuc"
                  value={ngayketthuc}
                  onChange={(e) => setNgayketthuc(e.target.value)}
                  required
                />
              </div>

              {/* CANH BAO HET HAN */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="canhbaohh">
                  Cảnh báo hết hạn:
                </label>
                <input
                  className={cx("formInput")}
                  type="checkbox"
                  id="canhbaohh"
                  value={canhbaohh}
                  onChange={(e) => setCanhbaohh(e.target.checked)}
                  required
                />
              </div>

              {/* GHI CHU */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ghichu">
                  Ghi chú:
                </label>
                <textarea
                  value={ghichu}
                  onChange={(e) => setGhichu(e.target.value)}
                  name="ghichu"
                  id="ghichu"
                  cols="100%"
                  rows="5"
                  className={cx("formInput")}
                ></textarea>
              </div>
            </div>

            <div className={cx("right")}>


              {/* HINH THUC THANH TOAN */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="hinhthuctt">
                  Hình thức thanh toán:
                </label>

                <select
                  value={hinhthuctt}
                  name="hinhthuctt"
                  id="hinhthuctt"
                  onChange={(e) => setHinhthuctt(e.target.value)}
                  className={cx("formInput")}
                >
                  <option value="Trả trước">Trả trước</option>
                  <option value="Trả sau">Trả sau</option>
                  <option value="Trả góp">Trả góp</option>
                </select>
              </div>

              {/* LOAI THANH TOAN */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="loaitt">
                  Loại thanh toán:
                </label>

                <select
                  value={loaitt}
                  name="loaitt"
                  id="loaitt"
                  onChange={(e) => setLoaitt(e.target.value)}
                  className={cx("formInput")}
                >
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                </select>
              </div>

              {/* SO TIEN THANH TOAN */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="sotientt">
                  Số tiền thanh toán:
                </label>
                <div className={cx("formInput")}>
                  <input
                    placeholder="Nhập số tiền đã thanh toán"
                    type="text"
                    id="sotientt"
                    value={sotientt}
                    onChange={(e) => handleChangePayment(e)}
                    required
                    className={cx("hiddenInput")}
                  />
                  <span className={cx("hiddenText")}>{sotienttFormatted}</span>
                </div>
              </div>

              {/* SO TIEN CON THIEU */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="sotienconlai">
                  Số tiền còn lại:
                </label>
                <input
                  placeholder="Nhập số tiền đã thanh toán"
                  type="text"
                  id="sotienconlai"
                  value={sotienconthieuFormatted}
                  required
                  disabled
                  className={cx("formInput")}
                />
              </div>

              {/* NGAY THANH TOAN */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ngaytt">
                  Ngày thanh toán:
                </label>
                <input
                  className={cx("formInput")}
                  type="date"
                  id="ngaytt"
                  value={ngaytt}
                  onChange={(e) => setNgaytt(e.target.value)}
                  required
                />
              </div>

              {/* SO QUY */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="soquy">
                  Số quỷ:
                </label>

                <input
                  id="soquy"
                  value={soquy}
                  type="number"
                  onChange={(e) => setSoquy(e.target.value)}
                  className={cx("formInput")}
                  required
                  disabled
                />
              </div>

              {/* XAC NHAN */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="xacnhan">
                  Xác nhận:
                </label>
                <input
                  id="xacnhan"
                  type="checkbox"
                  value={xacnhan}
                  onChange={(e) => setXacnhan(e.target.checked)}
                  className={cx("formInput")}
                  required
                />
              </div>

              {/* GUI EMAIL */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="guiemail">Gửi email:</label>
                <input
                  id="guiemail"
                  type='checkbox'
                  value={guiemail}
                  onChange={(e) => setGuiemail(e.target.checked)}
                  className={cx("formInput")}
                  required
                />
              </div>

              {/* GHI CHU THUONG */}
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="ghichuthuong">
                  Ghi chú thưởng:
                </label>
                <textarea
                  value={ghichuthuong}
                  onChange={(e) => setGhichuthuong(e.target.value)}
                  name="ghichuthuong"
                  id="ghichuthuong"
                  cols="100%"
                  rows="5"
                  className={cx("formInput")}
                ></textarea>
              </div>
            </div>
          </div>

          <div className={cx("preview")}>
            {
              orderPreview && (
                <div className={cx("tableWrapper")}>
                  <div className={cx("tableContent")}>
                    <table className={cx('table')}>
                      <thead>
                        <tr>
                          <th>Tên hàng hoá</th>
                          <th>Số lượng</th>
                          <th>Giá bán ra</th>
                          <th>Thuế</th>
                          <th>Chiết khấu</th>
                          <th>Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orderPreview && (
                            orderPreview.map(item => {
                              return (
                                <motion.tr
                                  layout
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  key={item._id}>
                                  <td>{item.tenhh}</td>
                                  <td>{item.soluong}</td>
                                  <td>{item.giabanra}</td>
                                  <td>{item.thue}</td>
                                  <td>{item.chietkhau}</td>
                                  <td>{item.tongtien}</td>
                                </motion.tr>
                              )
                            })
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </div>

          <div className={cx("boxBtns")}>
            <Button primary >
              Sửa
            </Button>

            <Button outline onClick={() => closeModal(false)}>
              Huỷ
            </Button>
          </div>
        </div >
      </div>
    </Modal>

  )
}
