import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faEye,
  faTrash,
  faMagnifyingGlass,
  faXmark,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ToastContainer, toast } from "react-toastify";
import style from "./Transaction.module.scss";
import * as transactionServices from "~/services/transactionServices";
import Pagination from "~/components/Pagination/Pagination";
import Button from "~/components/Button/Button";
import TransactionDetail from "./TransactionDetail";
import GetCustomer from "~/components/GetCustomer/GetCustomer";
import GetStaff from "~/components/GetStaff/GetStaff";
import GetContact from "~/components/GetContact/GetContact";
import Modal from "~/components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import TransactionType from "../Transaction/TransactionType/TransactionType";
import TransactionStatus from "../Transaction/TransactionStatus/TransactionStatus";
import AddTransaction from "./component/AddTransaction";
export default function Transaction() {
  const cx = classNames.bind(style);
  const [session, setSession] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [openTransactionTypeModal, setOpenTransactionTypeModal] =
    useState(false);
  const [openTransactionStatusModal, setOpenTransactionStatusModal] =
    useState(false);
  const [totalPage, setTotalPage] = useState([]);
  const [destroyID, setDestroyID] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [debounced, setDebounced] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const [IsTransactionSuccessfullySet, setIsTransactionSuccessfullySet] =
    useState(false);
  const navigate = useNavigate();

  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [sortContact, setSortContact] = useState("");
  const [sortStaff, setSortStaff] = useState("");
  const [sortContactSearch, setSortContactSearch] = useState("");
  const [sortStaffSearch, setSortStaffSearch] = useState("");
  const [openSort, setOpenSort] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [sortCustomer, setSortCustomer] = useState("");
  const [sortCustomerSearch, setSortCustomerSearch] = useState("");
  const [openTransactionDetail, setOpenTransactionDetail] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [notiContent, setNotiContent] = useState("");

  const [filter, setFilter] = useState({
    limit: 10,
    sort: "createAt",
    page: 1,
    q: "",
    loaigd: null,
    trangthaigd: null,
    khachhang: null,
    nguoilienhe: null,
    nhanvien: null,
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

  useEffect(() => {
    if (openNoti) {
      noti();

      setTimeout(() => {
        setOpenNoti(false);
      }, 1000);
    }
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

  const getTransactions = async () => {
    const result = await transactionServices.getTransaction(filter);
    setTransactions(result?.transactions);
    setCurrentPage(result?.currentPage);
    const pageArray = Array.from(
      { length: result?.totalPages },
      (_, i) => i + 1
    );
    setTotalPage(pageArray);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // // GET CONTRACTS
  // useEffect(() => {
  //   const fectchApi = async () => {
  //     const result = await transactionServices.getTransactions(filter);
  //     console.log(result);
  //     setTransactions(result?.transactions);
  //     setCurrentPage(result.currentPage);
  //     const pageArray = Array.from(
  //       { length: result.totalPages },
  //       (_, i) => i + 1
  //     );
  //     setTotalPage(pageArray);
  //   };
  //   fectchApi();
  // }, [filter]);
  // //sort
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      nguoilienhe: sortContact,
    }));
  }, [sortContact]);

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

  useEffect(() => {
    const getTransactionTypes = async () => {
      try {
        const result = await transactionServices.getTransactionTypes();
        setTransactionTypes(result);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionTypes();
  }, []);

  const handleTransactionDetail = (id) => {
    setOpenTransactionDetail(true);
    setTransactionId(id);
  };

  useEffect(() => {
    const getTransactionStatus = async () => {
      try {
        const result = await transactionServices.getTransactionStatus();
        setTransactionStatus(result);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionStatus();
  }, []);
  // useEffect(() => {
  //   setFilter((prevFilter) => ({
  //     ...prevFilter,
  //     q: debounced,
  //   }));
  // }, [debounced, searchValue]);

  const handelAddTransaction = () => {
    setOpenAddTransaction(true);
    setIsTransactionSuccessfullySet(true);
  };

  const handleDelete = (id) => {
    const fetchApi = async () => {
      const data = {
        staffid: session._id,
        _id: id,
      };
      const res = await transactionServices.deleteTransaction(data);
      if (res) {
        setOpenNoti(true);
        setNotiContent(res.message);
        if (res.status) {
          getTransactions();
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
      const res = await transactionServices.undeleteTransaction(data);
      if (res) {
        setOpenNoti(true);
        setNotiContent(res.message);
        if (res.status) {
          getTransactions();
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
        const res = await transactionServices.destroy(data);
        if (res) {
          setOpenNoti(true);
          setNotiContent(res.message);
          if (res.status) {
            setDestroy(false);
            getTransactions();
          }
        }
      };
      fetchApi();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <h1>Giao Dịch</h1>

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
              placeholder="Nhập tên người liên hệ muốn tìm"
              onChange={(e) => setSortContactSearch(e.target.value)}
            />
            <GetContact
              value={sortContact}
              setValue={setSortContact}
              searchValue={sortContactSearch}
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
          <Button primary onClick={setOpenTransactionStatusModal}>
            Trạng thái giao dịch
          </Button>
          <Button primary onClick={setOpenTransactionTypeModal}>
            Loại giao dịch
          </Button>
          <Button primary onClick={handelAddTransaction}>
            Thêm giao dịch
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
                <th>Nhân viên</th>
                <th>Đánh giá</th>
                <th>Tên giao dịch</th>
                <th>Trạng thái giao dịch</th>
                <th>Loại giao dịch</th>
                <th>Người liên hệ</th>
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
                </motion.tr>
              </tbody>
            ) : (
              <tbody>
                {transactions ? (
                  transactions.map((transaction) => {
                    return (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        key={transaction._id}
                      >
                        <td>{transaction.nhanvien.hoten}</td>
                        <td>{transaction.danhgia}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.trangthaigd.name}</td>
                        <td>{transaction.loaigd.name}</td>
                        <td>{transaction.nguoilienhe.name}</td>
                        <td>
                          <div className={cx("boxBtns")}>
                            {session.role === "admin" && isDeleted && (
                              <Tippy content="Khôi phục">
                                <div className={cx("btnIconBox")}>
                                  <Button
                                    outline
                                    small
                                    text
                                    onClick={() =>
                                      handleRestore(transaction._id)
                                    }
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
                                    handleTransactionDetail(transaction._id)
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
                                        setDestroyID(transaction._id);
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
                                      onClick={() =>
                                        handleDelete(transaction._id)
                                      }
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
                    <td>Không có giao dịch</td>
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
      {openAddTransaction && (
        <Modal closeModal={setOpenAddTransaction}>
          <AddTransaction
            closeModal={setOpenAddTransaction}
            sessionData={session}
            setOpenNoti={setOpenNoti}
            setNotiContent={setNotiContent}
          />
        </Modal>
      )}
      {openTransactionDetail && (
        <Modal closeModal={setOpenTransactionDetail}>
          <TransactionDetail
            session={session}
            closeModal={setOpenTransactionDetail}
            id={transactionId}
            setOpenNoti={setOpenNoti}
            setNotiContent={setNotiContent}
          />
        </Modal>
      )}
      {openTransactionTypeModal && (
        <TransactionType
          openTransactionTypeModal={setOpenTransactionTypeModal}
        />
      )}
      {openTransactionStatusModal && (
        <TransactionStatus
          openTransactionStatusModal={setOpenTransactionStatusModal}
        />
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
