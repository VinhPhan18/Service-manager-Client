import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import stype from "./AddContract.module.scss"
import GetCustomer from '~/components/GetCustomer/GetCustomer'
import GetOrder from '~/components/GetOrder/GetOrder'

export default function AddContract({ closeModal }) {
  const cx = classNames.bind(stype)

  const [tenhd, setTenhd] = useState("")
  const [giatrihd, setGiatrihd] = useState(0)
  const [ngaybatdau, setNgaybatdau] = useState("")
  const [ngayketthuc, setNgayketthuc] = useState("")
  const [canhbaohh, setCanhbaohh] = useState(false)
  const [hinhthuctt, setHinhthuctt] = useState("Trả trước")
  const [loaitt, setLoaitt] = useState("Tiền mặt")
  const [sotientt, setSotientt] = useState(0)
  const [ngaytt, setNgaytt] = useState("")
  const [soquy, setSoquy] = useState(0)
  const [xacnhan, setXacnhan] = useState(false)
  const [ghichu, setGhichu] = useState("")
  const [loaihd, setLoaihd] = useState("")
  const [guiemail, setGuiemail] = useState(false)
  const [ghichuthuong, setGhichuthuong] = useState("")
  const [loadhd, setLoadhd] = useState("")
  const [nhanvien, setNhanvien] = useState("")
  const [khachhang, setKhachhang] = useState("")
  const [donhang, setDonhang] = useState("")
  const [searchCustomerValue, setSearchCustomerValue] = useState("")
  const [searchOrderValue, setSearchOrderValue] = useState("")
  const [sessionData, setSessionData] = useState({})

  useEffect(() => {
    const staff = JSON.parse(sessionStorage.getItem("VNVD_Login"))

    setNhanvien(staff._id)
    setSessionData(staff)
  }, [])

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("bigTitle")}>
        Thêm hợp đồng
      </h1>

      <div className={cx("formContent")} >

        <div className={cx("left")}>
          {/* TEN HOP DONG */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="tenhd">Tên hợp đồng:</label>
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
            <label className={cx("formTitle")} htmlFor="nhanvien">Tên hợp đồng:</label>
            <input
              className={cx("formInput")}
              placeholder="Nhập tên nhân viên..."
              type="text"
              id="nhanvien"
              disabled
              value={sessionData.hoten}
              required
            />
          </div>

          {/* DOANH SO TINH CHO */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="doanhsotinhcho">Tên hợp đồng:</label>
            <input
              className={cx("formInput")}
              placeholder="Nhập tên nhân viên..."
              type="text"
              id="doanhsotinhcho"
              disabled
              value={sessionData.hoten}
              required
            />
          </div>

          {/* KHACH HANG */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="doanhsotinhcho">Khách hàng:</label>
            <input type="text" placeholder='Nhập tên kách hàng muốn tìm' value={searchCustomerValue} onChange={(e) => setSearchCustomerValue(e.target.value)} className={cx("formInput")} />
            <GetCustomer value={khachhang} setValue={setKhachhang} searchValue={searchCustomerValue} />
          </div>

          {/* DON HANG */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="doanhsotinhcho">Đơn hàng:</label>
            <input type="text" placeholder='Nhập mã đơn hàng muốn tìm' value={searchOrderValue} onChange={(e) => setSearchOrderValue(e.target.value)} className={cx("formInput")} />
            <GetOrder value={donhang} setValue={setDonhang} searchValue={searchOrderValue} />
          </div>

          {/* LOAI HOP DONG */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="loaihd">Loại hợp đồng:</label>
            <select value={loadhd} name="loaihd" id="loaihd" onChange={(e) => setLoadhd(e.target.value)} className={cx("formInput")}>
              <option value="Tiền mặt">Tiền mặt</option>
            </select>
          </div>

          {/* GIA TRI HOP DONG */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="giatrihd">Giá trị hợp đồng:</label>
            <input
              className={cx("formInput")}
              type="number"
              id="giatrihd"
              value={giatrihd}
              onChange={(e) => setGiatrihd(e.target.value)}
              required
            />
          </div>

          {/* NGAY BAT DAU */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="ngaybatdau">Ngày bắt đầu:</label>
            <input
              className={cx("formInput")}
              type="date"
              id="ngaybatdau"
              value={ngaybatdau}
              onChange={(e) => {
                setNgaybatdau(e.target.value)
              }}
              required
            />
          </div>

          {/* NGAY KET THUC */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="ngayketthuc">Ngày kết thúc:</label>
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
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="canhbaohh">Cảnh báo hết hạn:</label>
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
            <label className={cx("formTitle")} htmlFor="ghichu">Ghi chú:</label>
            <textarea value={ghichu} onChange={(e) => setGhichu(e.target.value)} name="ghichu" id="ghichu" cols="30" rows="10"
              className={cx("formInput")}
            ></textarea>
          </div>
        </div>

        <div className={cx("right")}>
          {/* HINH THUC THANH TOAN */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="hinhthuctt">Hình thức thanh toán:</label>

            <select value={hinhthuctt} name="hinhthuctt" id="hinhthuctt" onChange={(e) => setHinhthuctt(e.target.value)} className={cx("formInput")}>
              <option value="Trả trước">Trả trước</option>
              <option value="Trả sau">Trả sau</option>
              <option value="Trả góp">Trả góp</option>
            </select>
          </div>

          {/* LOAI THANH TOAN */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="loaitt">Loại thanh toán:</label>

            <select value={loaitt} name="loaitt" id="loaitt" onChange={(e) => setLoaitt(e.target.value)} className={cx("formInput")}>
              <option value="Tiền mặt">Tiền mặt</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
            </select>
          </div>

          {/* SO TIEN THANH TOAN */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="sotientt">Số tiền thanh toán:</label>
            <input
              className={cx("formInput")}
              placeholder="Nhập số tiền đã thanh toán"
              type="number"
              id="sotientt"
              value={sotientt}
              onChange={(e) => setSotientt(e.target.value)}
              required
            />
          </div>

          {/* NGAY THANH TOAN */}
          <div className={cx('formGroup')}>
            <label className={cx("formTitle")} htmlFor="ngaytt">Ngày thanh toán:</label>
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
            <label className={cx("formTitle")} htmlFor="soquy">Số quỷ:</label>

            <input
              id="soquy"
              value={soquy}
              type="number"
              onChange={(e) => setSoquy(e.target.value)}
              className={cx("formInput")}
              required
            />
          </div>

          {/* XAC NHAN */}
          <div className={cx("formGroup")}>
            <label className={cx("formTitle")} htmlFor="xacnhan">Xác nhận:</label>
            <input
              id="xacnhan"
              type='checkbox'
              value={xacnhan}
              onChange={(e) => setXacnhan(e.target.checked)}
              className={cx("formInput")}
              required
            />
          </div>

          {/* GHI CHU THUONG */}
          <div className={cx("formGroup")}>
            <label className={cx("formTitle")} htmlFor="ghichuthuong">Ghi chú thưởng:</label>
            <textarea value={ghichuthuong} onChange={(e) => setGhichuthuong(e.target.value)} name="ghichuthuong" id="ghichuthuong" cols="30" rows="10"
              className={cx("formInput")}
            ></textarea>
          </div>
        </div>
      </div >
    </div>
  )
}
