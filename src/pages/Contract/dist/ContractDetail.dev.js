// import { useState, useEffect } from 'react'
// import classNames from 'classnames/bind'
// import { motion } from "framer-motion"
// import { useDateFormat } from '~/hooks'
// import style from "./ContractDetail.module.scss"
// import * as contractServices from "~/services/contractServices"
// export default function ContractDetail({ id }) {
//   const cx = classNames.bind(style)
//   const [contractDetail, setContractDetail] = useState({})
//   const dateStart = useDateFormat(contractDetail?.ngaybatdau)
//   const dateEnd = useDateFormat(contractDetail?.ngayketthuc)
//   const paymentDate = useDateFormat(contractDetail?.ngaytt)
//   useEffect(() => {
//     const fetchApi = async () => {
//       const result = await contractServices.contractDetail(id)
//       if (result) {
//         setContractDetail(result)
//       }
//     }
//     fetchApi()
//   }, [id])
//   return (
//     <div className={cx("wrapper")}>
//       <h1 className={cx("bigTitle")}>CHI TIẾT HỢP ĐỒNG</h1>
//       {/* THÔNG TIN HỢP ĐỒNG */}
//       <motion.div layout
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className={cx("detailItem", "info")}>
//         <span className={cx("title")}>Thông tin hợp đồng</span>
//         <div className={cx("content")}>
//           {
//             contractDetail.tenhd ? (
//               <div className={cx("contractType")}>
//                 <span className={cx("detailItemTitle")}>
//                   Tên hợp đồng:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.tenhd}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.mahd ? (
//               <div className={cx("contractType")}>
//                 <span className={cx("detailItemTitle")}>
//                   Mã hợp đồng:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.mahd}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.loaihd ? (
//               <div className={cx("contractType")}>
//                 <span className={cx("detailItemTitle")}>
//                   Loại hợp đồng:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.loaihd}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.soquy ? (
//               <div className={cx("soquy")}>
//                 <span className={cx("detailItemTitle")}>
//                   Số quỷ:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.soquy}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           <div className={cx("row")}>
//             {
//               contractDetail.khachhang ? (
//                 <div className={cx("customer")}>
//                   <span className={cx("detailItemTitle")}>
//                     Khách hàng:
//                   </span>
//                   <span className={cx("detailItemInfo")}>
//                     {contractDetail.khachhang}
//                   </span>
//                 </div>
//               ) : (
//                 <div className={cx("noContent")}></div>
//               )
//             }
//             {
//               contractDetail.nhanvien ? (
//                 <div className={cx("staff")}>
//                   <span className={cx("detailItemTitle")}>
//                     Nhân viên:
//                   </span>
//                   <span className={cx("detailItemInfo")}>
//                     {contractDetail.nhanvien}
//                   </span>
//                 </div>
//               ) : (
//                 <div className={cx("noContent")}></div>
//               )
//             }
//           </div>
//         </div>
//       </motion.div>
//       {/* HANG HOA */}
//       <motion.div layout
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className={cx("detailItem")}>
//         <span className={cx("title")}>Thông tin hàng hoá</span>
//         <div className={cx("content", "commodities")}>
//           <div className={cx("tableWrapper")}>
//             <div className={cx("tableContent")}>
//               <table className={cx('table')}>
//                 <thead>
//                   <tr>
//                     <th>Mã hàng hoá</th>
//                     <th>Tên hàng hoá</th>
//                     <th>Số lượng</th>
//                     <th>Giá bán ra</th>
//                     <th>Chiết khấu</th>
//                     <th>Thuế</th>
//                     <th>Tổng tiền</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     contractDetail.items ? (
//                       contractDetail.items.map(item => {
//                         return (
//                           <motion.tr
//                             layout
//                             initial={{ opacity: 0 }}
//                             whileInView={{ opacity: 1 }}
//                             viewport={{ once: true }}
//                             key={item._id}>
//                             <td>{item.mahh}</td>
//                             <td>{item.tenhh}</td>
//                             <td>{item.soluong}</td>
//                             <td>{item.giabanra}</td>
//                             <td>{item.chietkhau}</td>
//                             <td>{item.thue}</td>
//                             <td>{item.tongtien}</td>
//                           </motion.tr>
//                         )
//                       })
//                     ) : (
//                       <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cx("loading")}>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                       </motion.tr>
//                     )
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//       {/* THÔNG TIN THANH TOÁN */}
//       <motion.div layout
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className={cx("detailItem", "cost")}>
//         <span className={cx("title")}>Thông tin thanh toán</span>
//         <div className={cx("content")}>
//           {
//             contractDetail.giatrihopdong ? (
//               <div className={cx("totalCost")}>
//                 <span className={cx("detailItemTitle")}>
//                   Giá trị hợp đồng:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.giatrihopdong}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.sotientt ? (
//               <div className={cx("pay")}>
//                 <span className={cx("detailItemTitle")}>
//                   Số tiền thanh toán:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.sotientt}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.sotienconlai ? (
//               <div className={cx("owe")}>
//                 <span className={cx("detailItemTitle")}>
//                   Số tiền còn lại:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.sotienconlai}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.hinhthuctt ? (
//               <div className={cx("payments")}>
//                 <span className={cx("detailItemTitle")}>
//                   Hình thức thanh toán:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.hinhthuctt}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.loaitt ? (
//               <div className={cx("paymentsType")}>
//                 <span className={cx("detailItemTitle")}>
//                   Loại thanh toán:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {contractDetail.loaitt}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.ngaytt ? (
//               <div className={cx("paymentsDate")}>
//                 <span className={cx("detailItemTitle")}>
//                   Ngày thanh toán:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {paymentDate}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }</div>
//       </motion.div>
//       <motion.div layout
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className={cx("detailItem", "date")}>
//         <div className={cx("content")}>
//           {
//             contractDetail.ngaybatdau ? (
//               <div className={cx("dateStart")}>
//                 <span className={cx("detailItemTitle")}>
//                   Ngày bắt đầu:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {dateStart}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//           {
//             contractDetail.ngayketthuc ? (
//               <div className={cx("dateEnd")}>
//                 <span className={cx("detailItemTitle")}>
//                   Ngày kết thúc:
//                 </span>
//                 <span className={cx("detailItemInfo")}>
//                   {dateEnd}
//                 </span>
//               </div>
//             ) : (
//               <div className={cx("noContent")}></div>
//             )
//           }
//         </div>
//       </motion.div>
//     </div>
//   )
// }
"use strict";
//# sourceMappingURL=ContractDetail.dev.js.map
