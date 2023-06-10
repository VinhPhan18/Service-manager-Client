import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Contract.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const Contract = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatCurrency = (value) => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

  const handleAddContract = (event) => {
    event.preventDefault();
    const contract = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      contractValue: parseFloat(event.target.contractValue.value + "000"),
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      expirationAlert: event.target.expirationAlert.value,
      paymentMethod: event.target.paymentMethod.value,
      paymentType: event.target.paymentType.value,
      paymentDate: event.target.paymentDate.value,
      notes: event.target.notes.value,
      quarter: event.target.quarter.value,
      confirmation: event.target.confirmation.value,
      paymentAmount: parseFloat(event.target.paymentAmount.value + "000"),
      bonusNote: event.target.bonusNote.value,
      contractType: event.target.contractType.value,
      employee: event.target.employee.value,
      salesAmount: parseFloat(event.target.salesAmount.value + "000"),
      customer: event.target.customer.value,
      order: event.target.order.value,
    };
    setContracts([...contracts, contract]);
    toggleModal();
  };

  const handleEditContract = (contract) => {
    setSelectedContract(contract);
    toggleModal();
  };

  const handleUpdateContract = (event) => {
    event.preventDefault();
    const updatedContract = {
      id: selectedContract.id,
      contractValue: parseFloat(event.target.contractValue.value),
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      expirationAlert: event.target.expirationAlert.value,
      paymentMethod: event.target.paymentMethod.value,
      paymentType: event.target.paymentType.value,
      paymentDate: event.target.paymentDate.value,
      notes: event.target.notes.value,
      quarter: event.target.quarter.value,
      confirmation: event.target.confirmation.value,
      paymentAmount: parseFloat(event.target.paymentAmount.value),
      bonusNote: event.target.bonusNote.value,
      contractType: event.target.contractType.value,
      employee: event.target.employee.value,
      salesAmount: parseFloat(event.target.salesAmount.value),
      customer: event.target.customer.value,
      order: event.target.order.value,
    };

    setContracts((prevContracts) =>
      prevContracts.map((contract) =>
        contract.id === selectedContract.id ? updatedContract : contract
      )
    );
    setSelectedContract(null);
    toggleModal();
  };

  const handleDeleteContract = (contractId) => {
    setContracts((prevContracts) =>
      prevContracts.filter((contract) => contract.id !== contractId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Hợp đồng</h1>
      <div className={cx("tableActions")}>
        <button onClick={toggleModal}>Thêm hợp đồng</button>
      </div>

      <div className={cx("tableWrapper")}>
        <h2>Danh sách hợp đồng</h2>

        <table className={cx("table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Giá trị hợp đồng</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Cảnh báo hết hạn</th>
              <th>Hình thức thanh toán</th>
              <th>Loại thanh toán</th>
              <th>Ngày thanh toán</th>
              <th>Ghi chú</th>
              <th>Số quý</th>
              <th>Xác nhận</th>
              <th>Tiền thanh toán</th>
              <th>Loại hợp đồng</th>
              <th>Nhân viên</th>
              <th>Doanh số tính cho nhân viên</th>
              <th>Khách hàng</th>
              <th>Đơn hàng</th>
              <th>Ghi chú thưởng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.id}</td>
                <td>{formatCurrency(contract.contractValue)}</td>
                <td>{contract.startDate}</td>
                <td>{contract.endDate}</td>
                <td>{contract.expirationAlert}</td>
                <td>{contract.paymentMethod}</td>
                <td>{contract.paymentType}</td>
                <td>{contract.paymentDate}</td>
                <td>{contract.notes}</td>
                <td>{contract.quarter}</td>
                <td>{contract.confirmation}</td>
                <td>{formatCurrency(contract.paymentAmount)}</td>
                <td>{contract.bonusNote}</td>
                <td>{contract.contractType}</td>
                <td>{contract.employee}</td>
                <td>{contract.salesAmount}</td>
                <td>{contract.customer}</td>
                <td>{contract.order}</td>
                <td>
                  <button onClick={() => handleEditContract(contract)}>
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} /> Sửa
                  </button>
                  <button onClick={() => handleDeleteContract(contract.id)}>
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
              style={{ backgroundColor: "white", color: "red", fontSize: '35px', marginLeft: 'auto', marginTop: 0 }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>{selectedContract ? "Sửa hợp đồng" : "Thêm hợp đồng"}</h3>
            <form
              onSubmit={
                selectedContract ? handleUpdateContract : handleAddContract
              }
            >
              <div>
                <label htmlFor="contractValue">Giá trị hợp đồng:</label>
                <input
                  type="number"
                  step="0.01"
                  id="contractValue"
                  defaultValue={
                    selectedContract ? selectedContract.contractValue : ""
                  }
                  placeholder="Nhập giá trị hợp đồng"
                   maxLength="12"
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate">Ngày bắt đầu:</label>
                <input
                  type="date"
                  id="startDate"
                  defaultValue={
                    selectedContract ? selectedContract.startDate : ""
                  }
                  placeholder="Nhập ngày bắt đầu"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmation">Xác nhận:</label>
                <input
                  type="text"
                  id="confirmation"
                  defaultValue={
                    selectedContract ? selectedContract.confirmation : ""
                  }
                  placeholder="Nhập xác nhận"
                   maxLength="50"
                  required
                />
              </div>
             
              <div>
                <label htmlFor="endDate">Ngày kết thúc:</label>
                <input
                  type="date"
                  id="endDate"
                  defaultValue={
                    selectedContract ? selectedContract.endDate : ""
                  }
                  placeholder="Nhập ngày kết thúc"
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentMethod">Hình thức thanh toán:</label>
                <select
                  id="paymentMethod"
                  className={cx("paymentSelect")}
                  defaultValue={
                    selectedContract ? selectedContract.paymentMethod : ""
                  }
                  required
                >
                  <option value="" disabled hidden>
                    Chọn hình thức thanh toán
                  </option>
                  <option value="Trả góp">Trả góp</option>
                  <option value="Trả trước">Trả trước</option>
                  <option value="Trả sau">Trả sau</option>
                  <option value="12 tháng">12 tháng</option>
                </select>
              </div>
              <div>
                <label htmlFor="paymentType">Loại thanh toán:</label>
                <select
                  id="paymentType"
                  className={cx("paymentSelect")}
                  defaultValue={
                    selectedContract ? selectedContract.paymentType : ""
                  }
                  required
                >
                  <option value="" disabled hidden>
                    Chọn loại thanh toán
                  </option>
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                </select>
              </div>
              <div>
                <label htmlFor="paymentAmount">Tiền thanh toán:</label>
                <input
                  type="number"
                  step="0.01"
                  id="paymentAmount"
                  defaultValue={
                    selectedContract ? selectedContract.paymentAmount : ""
                  }
                  placeholder="Nhập tiền thanh toán"
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentDate">Ngày thanh toán:</label>
                <input
                  type="date"
                  id="paymentDate"
                  defaultValue={
                    selectedContract ? selectedContract.paymentDate : ""
                  }
                  placeholder="Nhập ngày thanh toán"
                  required
                />
              </div>
               
              <div>
                <label htmlFor="expirationAlert">Cảnh báo hết hạn:</label>
                <input
                  type="text"
                  id="expirationAlert"
                  defaultValue={
                    selectedContract ? selectedContract.expirationAlert : ""
                  }
                  placeholder="Nhập cảnh báo hết hạn"
                   maxLength="50"
                  required
                />
              </div>
              <div>
                <label htmlFor="notes">Ghi chú:</label>
                <input
                  type="text"
                  id="notes"
                  defaultValue={selectedContract ? selectedContract.notes : ""}
                  placeholder="Nhập ghi chú"
                   maxLength="300"
                  required
                />
              </div>
              <div>
                <label htmlFor="quarter">Số quý:</label>
                <input
                  type="number"
                  id="quarter"
                  defaultValue={
                    selectedContract ? selectedContract.quarter : ""
                  }
                  placeholder="Nhập số quý"
                   maxLength="3"
                  required
                />
              </div>
              <div>
                <label htmlFor="contractType">Loại hợp đồng:</label>
                <input
                  type="text"
                  id="contractType"
                  defaultValue={selectedContract ? selectedContract.contractType : ""}
                  placeholder="Nhập loại hợp đồng"
                  maxLength="50"
                  required
                />
              </div>
              <div>
                <label htmlFor="employee">Nhân viên:</label>
                <input
                  type="text"
                  id="employee"
                  defaultValue={selectedContract ? selectedContract.employee : ""}
                  placeholder="Nhập nhân viên"
                  maxLength="50"
                  required
                />
              </div>
              <div>
                <label htmlFor="salesAmount">Doanh số tính cho nhân viên:</label>
                <input
                  type="number"
                  step="0.01"
                  id="salesAmount"
                  defaultValue={
                    selectedContract ? selectedContract.salesAmount : ""
                  }
                  placeholder="Nhập doanh số tính cho nhân viên"
                  required
                />
              </div>
              <div>
                <label htmlFor="customer">Khách hàng:</label>
                <input
                  type="text"
                  id="customer"
                  defaultValue={selectedContract ? selectedContract.customer : ""}
                  placeholder="Nhập khách hàng"
                  maxLength="50"
                  required
                />
              </div>
              <div>
                <label htmlFor="order">Đơn hàng:</label>
                <input
                  type="text"
                  id="order"
                  defaultValue={selectedContract ? selectedContract.order : ""}
                  placeholder="Nhập đơn hàng"
                  maxLength="50"
                  required
                />
              </div>

              <div>
                <label htmlFor="bonusNote">Ghi chú thưởng:</label>
                <input
                  type="text"
                  id="bonusNote"
                  defaultValue={
                    selectedContract ? selectedContract.bonusNote : ""
                  }
                  placeholder="Nhập ghi chú thưởng"
                   maxLength="300"
                  required
                />
              </div>
               <div className={cx("add")}>
                <button type="submit" className={cx("addButton")}>
                  {selectedContract ? "Cập nhật" : "Thêm"}
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

export default Contract;
