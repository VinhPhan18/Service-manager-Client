import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import style from "./Contract.module.scss"
import * as contractServices from "~/services/contractServices"
import Pagination from '~/components/Pagination/Pagination';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';

export default function Contract() {
  const cx = classNames.bind(style)

  const [contracts, setContracts] = useState([])
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false)
  const [openContractDetail, setOpenContractDetail] = useState(false)

  const [filter, setFilter] = useState({
    limit: 10,
    sort: "createAt",
    page: 1,
    nhanvien: null,
    khachhang: null,
    loaihd: null,
    deleted: false,
  })

  // GET CONTRACTS
  useEffect(() => {
    const fectchApi = async () => {
      const result = await contractServices.getContract(filter)
      setContracts(result?.contract)
      setCurrentPage(result.currentPage);
      const pageArray = Array.from(
        { length: result.totalPages },
        (_, i) => i + 1
      );
      setTotalPage(pageArray);
    }
    fectchApi()
  }, [filter])

  const handelTrash = () => {
    setIsDeleted(!isDeleted)

    setFilter((prevFilter) => ({
      ...prevFilter,
      deleted: !isDeleted,
    }));
  }

  const handelContractDetail = (id) => {
    //setOpenContractDetail(true)

    const fectchApi = async () => {
      const result = await contractServices.contractDetail(id)
      console.log(result)
    }
    fectchApi()
  }

  return (
    <div className={cx("wrapper")}>
      <h1>Hợp đồng</h1>

      <div className={cx("top-btn")}>
        {
          isDeleted ? (
            <Button primary onClick={handelTrash}>Thùng rác</Button>
          ) : (
            <Button outline onClick={handelTrash}>Thùng rác</Button>
          )
        }
        <Button primary>Thêm hợp đồng</Button>
      </div>

      <div className={cx("tableWrapper")}>
        <div className={cx("content")}>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Mã hợp đồng</th>
                <th>Nhân viên</th>
                <th>Khách hàng</th>
                <th>Giá trị hợp đồng</th>
                <th>Loại hợp đồng</th>
                <th>Đơn hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                contracts.length > 0 ? (
                  contracts.map(contract => {
                    return (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        key={contract._id}>
                        <td>{contract.mahd}</td>
                        <td>{contract.nhanvien.hoten}</td>
                        <td>{contract.khachhang.name}</td>
                        <td>{contract.giatrihd}</td>
                        <td>{contract.loaihd.loaihd}</td>
                        <td>{contract.donhang.madh}</td>
                        <td>
                          <div className={cx("boxBtns")}>
                            <Tippy content="Xem chi tiết">
                              <div className={cx("btnIconBox")}>
                                <Button outline small text onClick={() => handelContractDetail(contract._id)}><FontAwesomeIcon icon={faEye} /></Button>
                              </div>
                            </Tippy>
                            {
                              isDeleted ? (
                                <Tippy content="Xoá vĩnh viễn">
                                  <div className={cx("btnIconBox")}>
                                    <Button outline small text><FontAwesomeIcon icon={faBan} /></Button>
                                  </div>
                                </Tippy>
                              ) : (
                                <Tippy content="Chuyển đến thùng rác">
                                  <div className={cx("btnIconBox")}>
                                    <Button outline small text><FontAwesomeIcon icon={faTrash} /></Button>
                                  </div>
                                </Tippy>
                              )
                            }
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cx("loading")}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </motion.tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPages={totalPage} currentPage={currentPage} setFilter={setFilter} />

      {
        openContractDetail && <Modal closeModal={setOpenContractDetail}>

        </Modal>
      }

    </div>
  )
}
