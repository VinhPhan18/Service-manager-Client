import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Contact.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(style);

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9]+$/;

    if (!numericRegex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleAddContact = (event) => {
    event.preventDefault();
    const contact = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      phoneNumber: event.target.phoneNumber.value,
      identityCard: event.target.identityCard.value,
      title: event.target.title.value,
      content: event.target.content.value,
      createdDate: new Date().toLocaleString(),
      isSupported: false, // Chưa hỗ trợ
    };
    setContacts([...contacts, contact]);
    toggleModal();
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleToggleSupport = (contact) => {
    const updatedContact = {
      ...contact,
      isSupported: !contact.isSupported,
    };

    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === contact.id ? updatedContact : c))
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Hỗ Trợ</h1>
      <div className={cx("tableActions")}>
        <button onClick={toggleModal} className="btn btn-primary">
          Thêm hỗ trợ
        </button>
      </div>

      <div className={cx("tableWrapper")}>
        <h2>Danh sách hỗ trợ</h2>

        <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Số điện thoại</th>
              <th>Số căn cước công dân</th>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.identityCard}</td>
                <td>{contact.title}</td>
                <td>{contact.content}</td>
                <td>{contact.createdDate}</td>
                <td>{contact.isSupported ? "Đã hỗ trợ" : "Chưa hỗ trợ"}</td>
                <td>
                  <button
                    onClick={() => handleToggleSupport(contact)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                    }}
                    className="btn btn-primary"
                  >
                    {contact.isSupported ? (
                      <>
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className={cx("icon")}
                        />{" "}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={cx("icon")}
                        />{" "}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                    }}
                    className="btn btn-danger"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} />{" "}
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
            <h3>Thêm hỗ trợ</h3>

            <form onSubmit={handleAddContact}>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Số điện thoại:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  defaultValue={
                    selectedContact ? selectedContact.phoneNumber : ""
                  }
                  placeholder="Nhập số điện thoại"
                  maxLength="10"
                  onKeyPress={handleKeyPress}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="identityCard" className="form-label">
                  Số căn cước công dân:
                </label>
                <input
                  type="text"
                  id="identityCard"
                  defaultValue={
                    selectedContact ? selectedContact.identityCard : ""
                  }
                  placeholder="Nhập số căn cước công dân"
                  maxLength="13"
                  onKeyPress={handleKeyPress}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Tiêu đề:
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Nhập tiêu đề"
                  maxLength="100"
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Nội dung:
                </label>
                <input
                  type="text"
                  id="content"
                  placeholder="Nhập nội dung"
                  maxLength="300"
                  required
                  className="form-control"
                />
              </div>
              <div className={cx("add")}>
                <button
                  type="submit"
                  className={cx("addButton", "btn")}
                  style={{
                    marginRight: "8px",
                    backgroundColor: "#2e3f50",
                  }}
                >
                  {setSelectedContact ? "Cập nhật" : "Thêm"}
                </button>

                <button
                  type="button"
                  className={cx("cancelButton", "btn", "btn-danger")}
                  onClick={toggleModal}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
