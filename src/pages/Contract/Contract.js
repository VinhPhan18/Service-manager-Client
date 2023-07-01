import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faEye,
  faMagnifyingGlass,
  faRotateLeft,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./Contract.module.scss";
import * as contractServices from "~/services/contractServices";
import Pagination from "~/components/Pagination/Pagination";
import Button from "~/components/Button/Button";
import ContractDetail from "./component/ContractDetail/ContractDetail";
import Modal from "~/components/Modal/Modal";
import AddContract from "./component/AddContract/AddContract";
import GetCustomer from "~/components/GetCustomer/GetCustomer";
import GetStaff from "~/components/GetStaff/GetStaff";

export default function Contract() {
  const cx = classNames.bind(style);

  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [session, setSession] = useState({});
  const [contractId, setContractId] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openContractDetail, setOpenContractDetail] = useState(false);
  const [openAddContract, setOpenAddContract] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [notiContent, setNotiContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [destroyID, setDestroyID] = useState("");
  const [sortCustomer, setSortCustomer] = useState("");
  const [sortStaff, setSortStaff] = useState("");
  const [sortCustomerSearch, setSortCustomerSearch] = useState("");
  const [sortStaffSearch, setSortStaffSearch] = useState("");
  const [openSort, setOpenSort] = useState(false);
  const [filter, setFilter] = useState({
    limit: 10,
    sort: "createAt",
    page: 1,
    nhanvien: null,
    khachhang: null,
    loaihd: null,
    deleted: false,
  });

  const noti = () => toast(notiContent);

  const handleKeyPress = (event) => {
    if (event.keyCode === 27) {
      setOpenSort(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //NOTI
  useEffect(() => {
    if (openNoti) {
      noti();

      setTimeout(() => {
        setOpenNoti(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNoti]);

  //CHECK SESSION
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("VNVD_Login"));

    if (session) {
      setSession(session);
    } else {
      navigate("/staffs/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET CONTRACTS
  const getContracts = async () => {
    const result = await contractServices.getContract(filter);
    setContracts(result?.contract);
    setCurrentPage(result.currentPage);
    const pageArray = Array.from(
      { length: result.totalPages },
      (_, i) => i + 1
    );
    setTotalPage(pageArray);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  //SORT
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      khachhang: sortCustomer,
    }));
  }, [sortCustomer]);

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      nhanvien: sortStaff,
    }));
  }, [sortStaff]);

  const handelTrash = () => {
    setIsDeleted(!isDeleted);

    setFilter((prevFilter) => ({
      ...prevFilter,
      deleted: !isDeleted,
    }));
  };

  const handleContractDetail = (id) => {
    setOpenContractDetail(true);
    setContractId(id);
  };

  const handelAddContract = () => {
    setOpenAddContract(true);
  };

  const handleDelete = (id) => {
    const fetchApi = async () => {
      const data = {
        staffid: session._id,
        _id: id,
      };
      const res = await contractServices.deleteContract(data);
      if (res) {
        setOpenNoti(true);
        setNotiContent(res.message);
        if (res.status) {
          getContracts();
        }
      }
    };
    fetchApi();
  };

  const handleRestore = (id) => {
    const fetchApi = async () => {
      const data = {
        _id: id,
      };
      const res = await contractServices.undeleteContract(data);
      if (res) {
        setOpenNoti(true);
        setNotiContent(res.message);
        if (res.status) {
          getContracts();
        }
      }
    };
    fetchApi();
  };

  const handleDestroy = () => {
    if (destroyID) {
      const data = {
        _id: destroyID,
      };
      const fetchApi = async () => {
        const res = await contractServices.destroy(data);
        if (res) {
          setOpenNoti(true);
          setNotiContent(res.message);
          if (res.status) {
            setDestroy(false);
            getContracts();
          }
        }
      };
      fetchApi();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <ToastContainer />

      <h1>Hợp đồng</h1>

      <div className={cx("top-btn")}>
        <div>
          <Button outline small text onClick={() => setOpenSort(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          {openSort && (
            <Button
              className={cx("close")}
              outline
              small
              text
              onClick={() => setOpenSort(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          )}
        </div>
        <div className={cx("hidden", { show: openSort })}>
          <div className={cx("box")}>
            <input
              type="text"
              placeholder="Nhập tên khách hàng muốn tìm"
              onChange={(e) => setSortCustomerSearch(e.target.value)}
            />
            <GetCustomer
              value={sortCustomer}
              setValue={setSortCustomer}
              searchValue={sortCustomerSearch}
            />
          </div>
          <div className={cx("box")}>
            <input
              type="text"
              placeholder="Nhập tên nhân viên muốn tìm"
              onChange={(e) => setSortStaffSearch(e.target.value)}
            />
            <GetStaff
              value={sortStaff}
              setValue={setSortStaff}
              searchValue={sortStaffSearch}
            />
          </div>
        </div>
        <div>
          <Button primary onClick={handelAddContract}>
            Thêm hợp đồng
          </Button>
          {isDeleted ? (
            <Button primary onClick={handelTrash}>
              Thùng rác
            </Button>
          ) : (
            <Button outline onClick={handelTrash}>
              Thùng rác
            </Button>
          )}
        </div>
      </div>

      <div className={cx("tableWrapper")}>
        <div className={cx("content")}>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Mã hợp đồng</th>
                <th>Tên hợp đồng</th>
                <th>Nhân viên</th>
                <th>Khách hàng</th>
                <th>Giá trị hợp đồng</th>
                <th>Loại hợp đồng</th>
                <th>Đơn hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cx("loading")}
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </motion.tr>
              </tbody>
            ) : (
              <tbody>
                {contracts.length > 0 ? (
                  contracts.map((contract) => {
                    const giatrihopdong = contract?.giatrihd.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    );
                    return (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        key={contract._id}
                      >
                        <td>{contract.mahd}</td>
                        <td>{contract.tenhd}</td>
                        <td>{contract.nhanvien.hoten}</td>
                        <td>{contract.khachhang.name}</td>
                        <td>{giatrihopdong}</td>
                        <td>{contract?.loaihd?.loaihd}</td>
                        <td>{contract?.donhang?.madh}</td>
                        <td>
                          <div className={cx("boxBtns")}>
                            {session.role === "admin" && isDeleted && (
                              <Tippy content="Khôi phục">
                                <div className={cx("btnIconBox")}>
                                  <Button
                                    outline
                                    small
                                    text
                                    onClick={() => handleRestore(contract._id)}
                                  >
                                    <FontAwesomeIcon icon={faRotateLeft} />
                                  </Button>
                                </div>
                              </Tippy>
                            )}
                            <Tippy content="Xem chi tiết">
                              <div className={cx("btnIconBox")}>
                                <Button
                                  outline
                                  small
                                  text
                                  onClick={() =>
                                    handleContractDetail(contract._id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </Button>
                              </div>
                            </Tippy>
                            {session.role === "admin" &&
                              (isDeleted ? (
                                <Tippy content="Xoá vĩnh viễn">
                                  <div className={cx("btnIconBox")}>
                                    <Button
                                      outline
                                      small
                                      text
                                      onClick={() => {
                                        setDestroy(true);
                                        setDestroyID(contract._id);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faBan} />
                                    </Button>
                                  </div>
                                </Tippy>
                              ) : (
                                <Tippy content="Chuyển đến thùng rác">
                                  <div className={cx("btnIconBox")}>
                                    <Button
                                      outline
                                      small
                                      text
                                      onClick={() => handleDelete(contract._id)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                  </div>
                                </Tippy>
                              ))}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td>Không có hợp đồng</td>
                  </motion.tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        setFilter={setFilter}
      />

      {openContractDetail && (
        <Modal closeModal={setOpenContractDetail}>
          <ContractDetail
            session={session}
            closeModal={setOpenContractDetail}
            id={contractId}
            setOpenNoti={setOpenNoti}
            setNotiContent={setNotiContent}
          />
        </Modal>
      )}

      {openAddContract && (
        <Modal closeModal={setOpenAddContract}>
          <AddContract
            closeModal={setOpenAddContract}
            sessionData={session}
            setOpenNoti={setOpenNoti}
            setNotiContent={setNotiContent}
          />
        </Modal>
      )}

      {destroy && (
        <Modal closeModal={setDestroy}>
          <div className={cx("destroyWrapper")}>
            <h1 className={cx("title")}>Bạn có chắc chắn muốn xoá hợp đồng</h1>
            <div className={cx("boxBtns")}>
              <Button danger onClick={handleDestroy}>
                Xoá
              </Button>
              <Button outline onClick={() => setDestroy(false)}>
                Huỷ
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
