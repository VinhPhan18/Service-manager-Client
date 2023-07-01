import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import style from "./GetContact.module.scss";
import { useDebounce } from "~/hooks";
import * as contactServices from "~/services/contactServices";

export default function GetContact({ value, setValue, searchValue }) {
  const cx = classNames.bind(style);

  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let debounced = useDebounce(searchValue, 1000);

  const [filter, setFilter] = useState({
    sort: "createAdd",
    q: "",
    lienhechinh: null,
    trangthai: null,
    chucvu: null,
    deleted: false,
    mini: true,
  });

  useEffect(() => {
    setIsLoading(true);
    const getContacts = async () => {
      const response = await contactServices.getContact(filter);

      setContactList(response.data);

      setIsLoading(false);
    };
    getContacts();
  }, [filter]);

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      q: debounced,
    }));
  }, [debounced, searchValue]);

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cx("input")}
    >
      <option value="">
        {isLoading ? "Loading..." : "---Chọn người liên hệ---"}
      </option>
      {contactList &&
        contactList.map((contact) => {
          return (
            <option key={contact._id} value={contact._id}>
              {contact.name}
            </option>
          );
        })}
    </select>
  );
}
