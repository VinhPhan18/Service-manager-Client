import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Contact.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

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
        <button onClick={toggleModal}>Thêm hỗ trợ</button>
      </div>

      <div className={cx("tableWrapper")}>
        <h2>Danh sách hỗ trợ</h2>

        <table className={cx("table")}>
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
                <td>
                  {contact.isSupported ? "Đã hỗ trợ" : "Chưa hỗ trợ"}
                </td>
                <td>
                  <button onClick={() => handleToggleSupport(contact)}>
                    {contact.isSupported ? "Hủy hỗ trợ" : "Hỗ trợ"}
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className={cx("icon")} /> Xóa
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
            <h3>Thêm hỗ trợ</h3>
            
            <form onSubmit={handleAddContact}>
              <div>
               <label htmlFor="phoneNumber">Số điện thoại:</label>
                  <input
                  type="text"
                  id="phoneNumber"
                  defaultValue={selectedContact ? selectedContact.phoneNumber : ""}
                  placeholder="Nhập số điện thoại"
                  maxLength="10"
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div>
                  <label htmlFor="identityCard">Số căn cước công dân:</label>
                    <input
                    type="text"
                    id="identityCard"
                    defaultValue={selectedContact ? selectedContact.identityCard : ""}
                    placeholder="Nhập số căn cước công dân"
                    maxLength="13"
                    onKeyPress={handleKeyPress}
                    required
                  />
              </div>
              <div>
                <label htmlFor="title">Tiêu đề:</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Nhập tiêu đề"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="content">Nội dung:</label>
                <input
                  type="text"
                  id="content"
                  placeholder="Nhập nội dung"
                  maxLength="300"
                  required
                />
              </div>
              <div className={cx("add")}>
                <button type="submit" className={cx("addButton")}>
                  Thêm
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
        </div>
      )}
    </div>
  );
}

export default Contact;
