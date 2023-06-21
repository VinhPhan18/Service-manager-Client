import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Order.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const Order = () => {
  const cx = classNames.bind(style);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddOrder = (event) => {
    event.preventDefault();
    const order = {
      idorder: event.target.idorder.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      staff: event.target.staff.value,
      customer: event.target.customer.value,
      commodity: event.target.commodity.value,
    };
    setOrders([...orders, order]);
    toggleModal();
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    toggleModal();
  };

  const handleUpdateOrder = (event) => {
    event.preventDefault();
    const updatedOrder = {
      idorder: event.target.idorder.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      staff: event.target.staff.value,
      customer: event.target.customer.value,
      commodity: event.target.commodity.value,
    };

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? updatedOrder : order
      )
    );
    setSelectedOrder(null);
    toggleModal();
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Đơn hàng</h1>
      <div className={cx("tableActions")}>
        <button onClick={toggleModal}>Thêm đơn hàng</button>
      </div>

      <div className={cx("tableWrapper")}>
        <h2>Danh sách đơn hàng</h2>

        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Nhân viên phụ trách</th>
              <th>Khách hàng</th>
              <th>Hàng hóa</th>
              <th style={{ width: "5%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.idorder}</td>
                <td>{order.startDate}</td>
                <td>{order.endDate}</td>
                <td>{order.staff}</td>
                <td>{order.customer}</td>
                <td>{order.commodity}</td>
                <td>
                  <button onClick={() => handleEditOrder(order)}>
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} /> Sửa
                  </button>
                  <button onClick={() => handleDeleteOrder(order.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} />{" "}
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={cx("modal")}>
          <div className={cx("modalContent")}>
            <button
              className={cx("closeButton")}
              onClick={toggleModal}
              style={{
                backgroundColor: "white",
                color: "red",
                fontSize: "35px",
                marginLeft: "auto",
                marginTop: 0,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{selectedOrder ? "Sửa đơn hàng" : "Thêm đơn hàng"}</h3>
            <form onSubmit={selectedOrder ? handleUpdateOrder : handleAddOrder}>
              <div>
                <label htmlFor="idorder">Mã đơn hàng:</label>
                <br />
                <input
                  type="text"
                  id="idorder"
                  defaultValue={selectedOrder ? selectedOrder.idorder : ""}
                  placeholder="Nhập mã đơn hàng"
                  maxLength="12"
                  required
                />
              </div>

              <div>
                <label htmlFor="startDate">Ngày bắt đầu:</label>
                <br />
                <input
                  type="date"
                  id="startDate"
                  defaultValue={selectedOrder ? selectedOrder.startDate : ""}
                  placeholder="Nhập ngày bắt đầu"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate">Ngày kết thúc:</label>
                <br />
                <input
                  type="date"
                  id="endDate"
                  defaultValue={selectedOrder ? selectedOrder.endDate : ""}
                  placeholder="Nhập ngày kết thúc"
                  required
                />
              </div>

              <div>
                <label htmlFor="staff">Nhân viên phụ trách:</label>
                <br />
                <input
                  type="text"
                  id="staff"
                  defaultValue={selectedOrder ? selectedOrder.staff : ""}
                  placeholder="Nhập nhân viên phụ trách"
                  maxLength="50"
                  required
                />
              </div>

              <div>
                <label htmlFor="customer">Khách hàng:</label>
                <br />
                <input
                  type="text"
                  id="customer"
                  defaultValue={selectedOrder ? selectedOrder.customer : ""}
                  placeholder="Nhập khách hàng"
                  required
                />
              </div>

              <div>
                <label htmlFor="commodity">Hàng hóa:</label>
                <br />
                <input
                  type="text"
                  id="commodity"
                  defaultValue={selectedOrder ? selectedOrder.commodity : ""}
                  placeholder="Nhập hàng hóa"
                  required
                />
              </div>
              <br />

              <div className={cx("add")}>
                <button type="submit" className={cx("addButton")}>
                  {selectedOrder ? "Cập nhật" : "Thêm"}
                </button>
                <button
                  type="button"
                  className={cx("cancelButton")}
                  onClick={toggleModal}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
          <div className={cx("modalOverlay")} onClick={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default Order;
