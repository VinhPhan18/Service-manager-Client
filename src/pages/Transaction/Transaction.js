// import { useState, useEffect } from 'react'
// import classNames from 'classnames/bind'
// import { motion } from "framer-motion";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBan, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

// import style from "./Transaction.module.scss"
// import * as transactionServices from "~/services/transactionServices"
// import Pagination from '~/components/Pagination/Pagination';
// import Button from '~/components/Button/Button';
// import TransactionDetail from './TransactionDetail';
// import Modal from '~/components/Modal/Modal';

// export default function Transaction() {
//   const cx = classNames.bind(style)

//   const [transactions, setTransactions] = useState([])
//   const [transactionId, setTransactionId] = useState("")
//   const [totalPage, setTotalPage] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isDeleted, setIsDeleted] = useState(false)
//   const [openTransactionDetail, setOpenTransactionDetail] = useState(false)

//   const [filter, setFilter] = useState({
//     limit: 10,
//     sort: "createAt",
//     page: 1,
//     nhanvien: null,
//     khachhang: null,
//     loaigd: null,
//     trangthaigiaodich: null,
//     deleted: false,
//   })


//   // GET CONTRACTS
//    useEffect(() => {
//     const fectchApi = async () => {
//       const result = await transactionServices.getTransaction(filter)
//       console.log(result)
//       setTransactions(result?.transaction)
//       setCurrentPage(result.currentPage);
//       const pageArray = Array.from(
//         { length: result.totalPages },
//         (_, i) => i + 1
//       );
//       setTotalPage(pageArray);
//     }
//     fectchApi()
    
//   }, [filter])


//   const handelTrash = () => {
//     setIsDeleted(!isDeleted)

//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       deleted: !isDeleted,
//     }));
//   }

//   const handelTransactionDetail = (id) => {
//     setOpenTransactionDetail(true)
//     setTransactionId(id)
//   }

//   return (
//     <div className={cx("wrapper")}>
//       <h1>Giao Dịch</h1>

//       <div className={cx("top-btn")}>
//         {
//           isDeleted ? (
//             <Button primary onClick={handelTrash}>Thùng rác</Button>
//           ) : (
//             <Button outline onClick={handelTrash}>Thùng rác</Button>
//           )
//         }
//         <Button primary>Thêm giao dịch</Button>
//       </div>

//       <div className={cx("tableWrapper")}>
//         <div className={cx("content")}>
//           <table className={cx('table')}>
//             <thead>
//               <tr>
//                 <th>Mã giao dịch</th>
//                 <th>Tên giao dịch</th>
//                 <th>Nhân viên</th>
//                 <th>Khách hàng</th>
//                 <th>Kết quả giao dịch</th>
//                 <th>Trạng thái giao dịch</th>
//                 <th>Loại giao dịch</th>
//                 <th>Người liên hệ</th>
//                 <th>Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {
//                 transactions.length > 0 ? (
//                   transactions.map( transaction => {
//                     return (
//                       <motion.tr
//                         layout
//                         initial={{ opacity: 0 }}
//                         whileInView={{ opacity: 1 }}
//                         viewport={{ once: true }}
//                         key={transaction._id}>
//                         <td>{transaction.magd}</td>
//                         <td>{transaction.name}</td>
//                         <td>{transaction.nhanvien.hoten}</td>
//                         <td>{transaction.khachhang.name}</td>
//                         <td>{transaction.ketquagd}</td>
//                         <td>{transaction.name}</td>
//                         <td>{transaction.loaigd.name}</td>
//                         <td>{transaction.nguoilienhe.name}</td>
//                         <td>
//                           <div className={cx("boxBtns")}>
//                             <Tippy content="Xem chi tiết">
//                               <div className={cx("btnIconBox")}>
//                                 <Button outline small text onClick={() => handelTransactionDetail(transaction._id)}><FontAwesomeIcon icon={faEye} /></Button>
//                               </div>
//                             </Tippy>
//                             {
//                               isDeleted ? (
//                                 <Tippy content="Xoá vĩnh viễn">
//                                   <div className={cx("btnIconBox")}>
//                                     <Button outline small text><FontAwesomeIcon icon={faBan} /></Button>
//                                   </div>
//                                 </Tippy>
//                               ) : (
//                                 <Tippy content="Chuyển đến thùng rác">
//                                   <div className={cx("btnIconBox")}>
//                                     <Button outline small text><FontAwesomeIcon icon={faTrash} /></Button>
//                                   </div>
//                                 </Tippy>
//                               )
//                             }
//                           </div>
//                         </td>
//                       </motion.tr>
//                     )
//                   })
//                 ) : (
//                   <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cx("loading")}>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                   </motion.tr>
//                 )
              
//               }
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Pagination totalPages={totalPage} currentPage={currentPage} setFilter={setFilter} />

//       {
//         openTransactionDetail && <Modal closeModal={setOpenTransactionDetail}>
//           <TransactionDetail closeModal={setOpenTransactionDetail} id={transactionId} />
//         </Modal>
//       }

//     </div>
//   )
// }
