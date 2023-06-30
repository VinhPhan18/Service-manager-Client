import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import style from "./Transaction.module.scss";
import * as transactionServices from "~/services/transactionServices";
import Pagination from "~/components/Pagination/Pagination";
import Button from "~/components/Button/Button";
import TransactionDetail from "./TransactionDetail";
import Modal from "~/components/Modal/Modal";
import { useDebounce } from "~/hooks";
import TransactionType from "../Transaction/TransactionType/TransactionType";
export default function Transaction() {
  const cx = classNames.bind(style);

  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [openTransactionTypeModal, setOpenTransactionTypeModal] =
    useState(false);
  const [totalPage, setTotalPage] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openTransactionDetail, setOpenTransactionDetail] = useState(false);

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
  let debounced = useDebounce(searchValue, 500);

  // GET CONTRACTS
  useEffect(() => {
    const fectchApi = async () => {
      const result = await transactionServices.getTransactions(filter);
      console.log(result);
      setTransactions(result?.transactions);
      setCurrentPage(result.currentPage);
      const pageArray = Array.from(
        { length: result.totalPages },
        (_, i) => i + 1
      );
      setTotalPage(pageArray);
    };
    fectchApi();
  }, [filter]);
  console.log(transactions);
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
  const handelTransactionDetail = (id) => {
    setOpenTransactionDetail(true);
    setTransactionId(id);
  };
  const handelSortByTransactionStatus = (e) => {
    let current = e.target.value;
    setTransactionStatus(current);
    setFilter((prevFilter) => ({
      ...prevFilter,
      transactionStatus: current,
    }));
  };
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  return (
    <div className={cx("wrapper")}>
      <h1>Giao Dịch</h1>

      <div className={cx("top-btn")}>
        <input
          className={cx("inputSearch")}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Nhập tên muốn tìm"
        />
        {isDeleted ? (
          <Button primary onClick={handelTrash}>
            Thùng rác
          </Button>
        ) : (
          <Button outline onClick={handelTrash}>
            Thùng rác
          </Button>
        )}
        <select
          value={transactionStatus}
          onChange={(e) => handelSortByTransactionStatus(e)}
          className={cx("selectSort")}
        >
          <option value="">Chọn trạng thái giao dịch</option>
          <option value="Giao dịch thành công">Giao dịch thành công</option>
          <option value="Giao dịch thất bại">Giao dịch thất bại</option>
        </select>
        <Button primary onClick={setOpenTransactionTypeModal}>
          Loại giao dịch
        </Button>
        <Button primary>Thêm giao dịch</Button>
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
                          <Tippy content="Xem chi tiết">
                            <div className={cx("btnIconBox")}>
                              <Button
                                outline
                                small
                                text
                                onClick={() =>
                                  handelTransactionDetail(transaction._id)
                                }
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </div>
                          </Tippy>
                          {isDeleted ? (
                            <Tippy content="Xoá vĩnh viễn">
                              <div className={cx("btnIconBox")}>
                                <Button outline small text>
                                  <FontAwesomeIcon icon={faBan} />
                                </Button>
                              </div>
                            </Tippy>
                          ) : (
                            <Tippy content="Chuyển đến thùng rác">
                              <div className={cx("btnIconBox")}>
                                <Button outline small text>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </div>
                            </Tippy>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
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
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        setFilter={setFilter}
      />

      {openTransactionDetail && (
        <Modal closeModal={setOpenTransactionDetail}>
          <TransactionDetail
            closeModal={setOpenTransactionDetail}
            id={transactionId}
          />
        </Modal>
      )}
      {openTransactionTypeModal && (
        <TransactionType
          openTransactionTypeModal={setOpenTransactionTypeModal}
        />
      )}
    </div>
  );
}
