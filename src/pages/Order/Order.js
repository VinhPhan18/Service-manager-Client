import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Tippy from "@tippyjs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import style from "./Order.module.scss";
import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";
import Pagination from "~/components/Pagination/Pagination";
import * as orderServices from "~/services/orderServices";
import { useDebounce } from "~/hooks";
import AddOrder from "./component/AddOrder";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [totalPage, setTotalPage] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [createdOrderSuccessfully, setCreatedOrderSuccessfully] =
    useState(false);
  const [session, setSession] = useState({});
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    limit: 10,
    sort: "giabanra",
    page: 1,
    nhanvien: null,
    soluong: null,

  });

  let debounced = useDebounce(searchValue, 500);

  const createOrderSuccessfully = () => toast("Thêm đơn hàng thành công!");

  useEffect(() => {
    if (createdOrderSuccessfully) {
      createOrderSuccessfully();

      setTimeout(() => {
        setCreatedOrderSuccessfully(false);
      }, 1000);
    }
  }, [createdOrderSuccessfully]);

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("VNVD_Login"))

    if (session) {
      setSession(session)
    } else {
      navigate("/staffs/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingOrder(null);
  };

  const getOrders = async () => {
    const response = await orderServices.getOrders(filter);
    setOrderList(response.orders);
    setCurrentPage(response.currentPage);
    const pageArray = Array.from(
      { length: response.totalPages },
      (_, i) => i + 1
    );
    setTotalPage(pageArray);
  };
  // Get order data
  useEffect(() => {

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newOrder = {
  //     madh,
  //     ngaybatdau,
  //     ngayketthuc,
  //     nhanvien,
  //     khachhang,
  //     items,
  //     soluong,
  //     chietkhau,
  //   };
  //   const createOrder = async () => {
  //     const res = await orderServices.createOrder(newOrder);
  //     console.log(res);
  //   };
  //   createOrder();
  // };

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  // const handleUpdateOrder = (event) => {
  //   event.preventDefault();
  //   const updatedOrder = {
  //     mahh: event.target.madh.value || editingOrder.madh,
  //     ngaybatdau: event.target.ngaybatdau.value || editingOrder.ngaybatdau,
  //     ngayketthuc: event.target.ngayketthuc.value || editingOrder.ngayketthuc,
  //     nhanvien: event.target.nhanvien.value || editingOrder.nhanvien,
  //     khachhang: event.target.khachhang.value || editingOrder.khachhang,
  //     items: event.target.items.value || editingOrder.items,
  //     soluong: event.target.soluong.value || editingOrder.soluong,
  //     chietkhau: event.target.chietkhau.value || editingOrder.chietkhau,
  //   };


  const handleEditClick = (orderId) => {
    const editedOrder = orderList.find((order) => order._id === orderId);
    setEditingOrder(editedOrder);

    setIsModalOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrderList = orderList.filter((order) => order._id !== orderId);
    setOrderList(updatedOrderList);
  };


  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <h1>Đơn hàng</h1>

      <div className={cx("top-btn")}>
        <input
          className={cx("inputSearch")}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Nhập tên muốn tìm"
        />

        <Button onClick={toggleModal} primary>
          Thêm đơn hàng
        </Button>
      </div>

      <div className={cx("tableWrapper")}>
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx("content")}
        >
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                {/* <th>Ngày bắt đầu</th> */}
                {/* <th>Ngày kết thúc</th> */}
                <th>Nhân viên phụ trách</th>
                <th>Số lượng hàng hóa</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orderList &&
                orderList.map((orders) => (
                  <motion.tr layout key={orders._id}>
                    <td>{orders.madh}</td>
                    {/* <td>{orders.ngaybatdau}</td> */}
                    {/* <td>{orders.ngayketthuc}</td> */}
                    <td>{orders.nhanvien.hoten}</td>
                    <td>
                      {orders.orderItemCount}
                    </td>

                    <td>
                      <button onClick={() => handleEditClick(orders._id)}>
                        <FontAwesomeIcon icon={faEdit} className={cx("icon")} />{" "}
                        Sửa
                      </button>
                      <button onClick={() => handleDeleteOrder(orders._id)}>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={cx("icon")}
                        />
                        Xóa
                      </button>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        setFilter={setFilter}
      />

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <AddOrder
            setOrderList={setOrderList}
            orderList={orderList}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
            editingOrder={editingOrder}
            setCreatedOrderSuccessfully={setCreatedOrderSuccessfully}
            getOrders={getOrders}
          />
        </Modal>
      )}
    </div>
  );
}

//   return (
//     <div className={cx("wrapper")}>
//       <h1>Đơn hàng</h1>
//       <div className={cx("tableActions")}>
//         <Button onClick={toggleModal} primary>
//           Thêm đơn hàng
//         </Button>
//       </div>
//       <h2>Danh sách đơn hàng</h2>
//       <div className={cx("tableWrapper")}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className={cx("content")}
//         >
//           <table className={cx("table")}>
//             <thead>
//               <tr>
//                 <th>Mã đơn hàng</th>
//                 {/* <th>Ngày bắt đầu</th> */}
//                 {/* <th>Ngày kết thúc</th> */}
//                 <th>Nhân viên phụ trách</th>
//                 <th>Số lượng hàng hóa</th>
//                 <th>Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderList &&
//                 orderList.map((orders) => (
//                   <tr key={orders._id}>
//                     <td>{orders._id}</td>
//                     {/* <td>{orders.ngaybatdau}</td> */}
//                     {/* <td>{orders.ngayketthuc}</td> */}
//                     <td>{orders.nhanvien.hoten}</td>
//                     <td>
//                       {orders.orderItemCount}
//                     </td>

//                     <td>
//                       <button onClick={() => handleEditClick(orders._id)}>
//                         <FontAwesomeIcon icon={faEdit} className={cx("icon")} />{" "}
//                         Sửa
//                       </button>
//                       <button onClick={() => handleDeleteOrder(orders._id)}>
//                         <FontAwesomeIcon
//                           icon={faTrashAlt}
//                           className={cx("icon")}
//                         />
//                         Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </motion.div>
//       </div>
//       <Pagination
//         totalPages={totalPage}
//         currentPage={currentPage}
//         setFilter={setFilter}
//       />
//       {isModalOpen && (
//         <Modal closeModal={toggleModal}>
//           <div className={cx("modalWraper")}>
//             <div className={cx("bigTitle")}>
//               <h3>{editingOrder ? "Sửa đơn hàng" : "Thêm đơn hàng"}</h3>
//             </div>

//             <div className={cx("formContent")}>
//               <div className={cx("formGroup")}>
//                 <label className={cx("formTitle")} htmlFor="madh">
//                   Mã đơn hàng:
//                 </label>
//                 <input
//                   className={cx("formInput")}
//                   placeholder="Nhập mã đơn hàng"
//                   maxLength={30}
//                   type="text"
//                   id="madh"
//                   value={madh}
//                   onChange={(e) => setMadh(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className={cx("formGroup")}>
//                 <label className={cx("formTitle")} htmlFor="ngaybatdau">
//                   Ngày bắt đầu
//                 </label>
//                 <input
//                   className={cx("formInput")}
//                   placeholder="Nhập ngày bắt đầu"
//                   maxLength={30}
//                   type="date"
//                   id="ngaybatdau"
//                   value={ngaybatdau}
//                   onChange={(e) => setNgaybatdau(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className={cx("formGroup")}>
//                 <label className={cx("formTitle")} htmlFor="ngayketthuc">
//                   Ngày kết thúc
//                 </label>
//                 <input
//                   className={cx("formInput")}
//                   placeholder="Nhập ngày kết thúc"
//                   maxLength={30}
//                   type="date"
//                   id="ngayketthuc"
//                   value={ngayketthuc}
//                   onChange={(e) => setNgayketthuc(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className={cx("formGroup")}>
//               <label className={cx("formTitle")} htmlFor="nhanvien">
//                 Nhân viên phụ trách:
//               </label>
//               <select
//                 className={cx("formInput")}
//                 id="nhanvien"
//                 value={nhanvien}
//                 onChange={(e) => setNhanvien(e.target.value)}
//                 required
//               >
//                 <option value="">Chọn nhân viên phụ trách</option>
//                 {customers &&
//                   customers.map((customer) => {
//                     return (
//                       <option key={customer._id} value={customer._id}>
//                         {customer.nhanvien}
//                       </option>
//                     );
//                   })}
//               </select>
//             </div>

//             <div className={cx("formGroupbutton")}>
//               {editingOrder ? (
//                 <Button onClick={handleUpdateOrder} primary small>
//                   Cập nhật
//                 </Button>
//               ) : (
//                 <Button onClick={handleSubmit} primary small>
//                   Thêm
//                 </Button>
//               )}
//               <Button onClick={toggleModal} outline small>
//                 Hủy
//               </Button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }
