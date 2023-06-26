import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Contract.module.scss";
import Pagination from "~/components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as transactionServices from '~/services/transactionServices';
import Modal from "~/components/Modal/Modal";

export default function Contract() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");                
  const [khachhang, setKhachhang] = useState("");
  const [nhanvien, setNhanvien] = useState("");
  const [hinhthuctt, setHinhthuctt] = useState("");
  const [loaitt, setLoaitt] = useState("");
  const [giatrihd, setGiatrihd] = useState("");
  const [sotientt, setSotientt] = useState("");
  const [soquy, setSoquy] = useState("");
  const [donhang, setDonhang] = useState("");
  const [loaihd, setLoaihd] = useState("");
  const [guiemail, setGuiemail] = useState(false);
  const [ngaybatdau, setNgaybatdau] = useState("");
  const [ngayketthuc, setNgayketthuc] = useState("");
  const [ngaytt, setNgaytt] = useState("");
  const [canhbaohh, setCanhbaohh] = useState("");
  const [doanhsotinhcho, setDoanhsotinhcho] = useState("");
  const [ghichu, setGhichu] = useState("");
  const [ghichuthuong, setGhichuthuong] = useState("");
  const [xacnhan, setXacnhan] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [selectedContract, setSelectedContract] = useState(null);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingContract, setEditingContract] = useState(null);

  // const [mahd, setMahd] = useState("");
  const [contractList, setContractList] = useState([]);
  const [filter, setFilter] = useState({
    limit: 10,
    sort: "createdAt",
    page: 1,
    nhanvien: null,
    deleted: null,
    khachhang: null,
    loaigd: null,
    trangthaigd: null,
    deleted: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const getContract = async () => {
      const res = await contractServices.getContract(filter);
      console.log(res.contract);
      if (res?.contract) {
        setContractList(res.contract);
        setCurrentPage(res.currentPage);
        const pageArray = Array.from(
          { length: res.totalPages },
          (_, i) => i + 1
        );
        setTotalPage(pageArray);
        console.log(res);
      } else {
        console.log("error");
      }
    };
    getContract();
  }, [filter]);
  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await contractServices.getStaff();
        setStaffs(response);
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, []);
  useEffect(() => {
    const getContractType = async () => {
      try {
        const response = await contractServices.getContractType();
        setContractTypes(response);
      } catch (error) {
        console.log(error);
      }
    };
    getContractType();
  }, []);
  const handleSubmit = (e) => {
    const newContract = {
      mahd,
      khachhang,
      nhanvien,
      hinhthuctt,
      loaitt,
      giatrihd,
      sotientt,
      soquy,
      donhang,
      loaihd,
      guiemail,
      ngaybatdau,
      ngayketthuc,
      ngaytt,
      canhbaohh,
      doanhsotinhcho,
      ghichu,
      ghichuthuong,
      xacnhan,
    };
    const createContract = async () => {
      const res = await contractServices.createContract(newContract);
      console.log(res);
    };
    createContract();
  };

  const handleUpdateContract = (e) => {
    e.preventDefault();

    const Pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = Pattern.test();

    setIsValid(isValid);
    if (isValid) {
      const updatedContract = {
        _id: editingContract._id,
        mahd: e.target.mahd.value || editingContract.mahd,
        khachhang: e.target.khachhang.value || editingContract.khachhang,
        nhanvien: e.target.nhanvien.value || editingContract.nhanvien,
        hinhthuctt: e.target.hinhthuctt.value || editingContract.hinhthuctt,
        loaitt: e.target.loaitt.value || editingContract.loaitt,
        giatrihd: e.target.giatrihd.value || editingContract.giatrihd,
        sotientt: e.target.sotientt.value || editingContract.sotientt,
        soquy: e.target.soquy.value || editingContract.soquy,
        donhang: e.target.donhang.value || editingContract.donhang,
        loaihd: e.target.loaihd.value || editingContract.loaihd,
        guiemail: e.target.guiemail.value || editingContract.guiemail,
        ngaybatdau: e.target.ngaybatdau.value || editingContract.ngaybatdau,
        ngayketthuc: e.target.ngayketthuc.value || editingContract.ngayketthuc,
        ngaytt: e.target.ngaytt.value || editingContract.ngaytt,
        canhbaohh: e.target.canhbaohh.value || editingContract.canhbaohh,
        doanhsotinhcho:
          e.target.doanhsotinhcho.value || editingContract.doanhsotinhcho,
        ghichu: e.target.ghichu.value || editingContract.ghichu,
        ghichuthuong:
          e.target.ghichuthuong.value || editingContract.ghichuthuong,
        xacnhan: e.target.xacnhan.value || editingContract.xacnhan,
      };
      console.log(editingContract);
      const updatedContractList = contractList.map((contract) => {
        if (contract._id === updatedContract._id) {
          return updatedContract;
        }
        return contract;
      });
      setContractList(updatedContractList);
      e.target.reset();
      toggleModal();
    } else {
      console.log("v");
    }
  };
  const handleEditClick = (contractId) => {
    const editedContract = contractList.find(
      (contract) => contract._id === contractId
    );
    setEditingContract(editedContract);

    setIsModalOpen(true);
  };

  const handleDeleteContract = (contractId) => {
    setContracts((prevContracts) =>
      prevContracts.filter((contract) => contract.id !== contractId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Hợp Đồng</h1>
      <div className={cx("tableActions")}>
        <Button onClick={toggleModal} primary>
          Thêm Hợp Đồng
        </Button>
      </div>
      <h2>Danh sách Hợp Đồng</h2>
      <div className={cx("tableWrapper")}>
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx("content")}
        >
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Mã hợp đồng</th>
                <th>Khách hàng</th>
                <th>Nhân viên</th>
                <th>Hình thức thanh toán</th>
                <th>Loại thanh toán</th>
                <th>Giá trị hợp đồng</th>
                <th>Số tiền thanh toán</th>
                <th>Số quỹ</th>
                <th>Đơn hàng</th>
                <th>Loại hợp đồng</th>
                <th>Gửi email</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Ngày thanh toán</th>
                <th>Cảnh báo hết hạn</th>
                <th>Doanh số tính cho</th>
                <th>Ghi chú</th>
                <th>Ghi chú thưởng</th>
                <th>Xác nhận</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {contractList &&
                contractList.map((contract) => (
                  <tr key={contract._id}>
                    <td>{contract.mahd}</td>
                    <td>{contract.khachhang.name}</td>
                    <td>{contract.nhanvien.hoten}</td>
                    <td>{contract.hinhthuctt}</td>
                    <td>{contract.loaitt}</td>
                    <td>{contract.giatrihd}</td>
                    <td>{contract.sotientt}</td>
                    <td>{contract.soquy}</td>
                    <td>{contract.donhang.madh}</td>
                    <td>{contract.loaihd.loaihd}</td>
                    <td>{contract.guiemail}</td>
                    <td>{contract.ngaybatdau}</td>
                    <td>{contract.ngayketthuc}</td>
                    <td>{contract.ngaytt}</td>
                    <td>{contract.canhbaohh}</td>
                    <td>{contract.doanhsotinhcho.hoten}</td>
                    <td>{contract.ghichu}</td>
                    <td>{contract.ghichuthuong}</td>
                    <td>{contract.xacnhan}</td>

                    <td></td>
                    <td>
                      <button onClick={() => handleEditClick(contract._id)}>
                        <FontAwesomeIcon icon={faEdit} className={cx("icon")} />{" "}
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteContract(contract._id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={cx("icon")}
                        />{" "}
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
        </div>
      </div>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={cx("modalWraper")}>
            <div className={cx("bigTitle")}>
              <h3> {editingContract ? "Sửa Nhân Viên" : "Thêm Nhân Viên"}</h3>
            </div>
            <div className={cx("formContent")}>
              <div className={cx("formGroup")}>
                <label className={cx("formTitle")} htmlFor="mahd">
                  Mã hợp đồng :
                </label>
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
        </Modal>
      )}
    </div>
  );
}
