import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./StaffType.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import * as staffServices from '~/services/staffServices';
import ChangeStaffType from "./ChangeStaffType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
 

const cx = classNames.bind(style);

const StaffType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffTypes, setStaffTypes] = useState([]);
  const [selectedStaffType, setSelectedStaffType] = useState({});
  const [staffTypeChangeValue, setStaffTypeChangeValue] = useState("");

  const [sdt, setChuc] = useState('');

  console.log(staffTypeChangeValue)
  useEffect( () =>{
    const getPosition=async ()=>{
      const res = await staffServices.getPosition()
      setStaffTypes(res)
    }
    getPosition()
  }, []
  )

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleAddStaffType = () => {

  //   const addPosition = async () => {
  //     const data = {
  //       name: positionValue
  //     }
  //     const res = await staffServices.createPosition(data)
  //     if(
  //       res?.positions
        
  //     ){
  //       setStaffTypes(res.positions)
  //     } else{
  //       console.log('error');
  //     }
  //   }
  //   addPosition()
  // };

  const handleEditStaffType = (data) => {
    setSelectedStaffType(data);
    
    setStaffTypeChangeValue(data.name)
    toggleModal();
  };

  const handleUpdateStaffType = (event) => {
    
    toggleModal();
  };

  const handleDeleteStaffType = (staffTypeId) => {
    setStaffTypes((prevStaffTypes) =>
      prevStaffTypes.filter((staffType) => staffType.id !== staffTypeId)
    );
  };

  return (
    <div className={cx("wrapper")}>
      <h1>Chức vụ</h1>
      <div className={cx("tableActions")}>
        <button
          onClick={toggleModal}
          className={cx("addButton", "btn", "btn-primary")}
        >
          Thêm chức vụ
        </button>
      </div>
      <h2 style={{ marginLeft: '10px', }}>Danh sách chức vụ</h2>
      <div className={cx("tableWrapper")}>
      <table className={cx("table", "table-striped")}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "auto" }}>Chức vụ</th>
              <th style={{ width: "15%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffTypes&&staffTypes.map((position) => (
              <tr key={position._id}>
                <><td>1</td>
                <td>{position.name}</td>
                <td>
                  <button
                    onClick={() => handleEditStaffType(position)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#2e3f50",
                    }}
                    className={cx("btn", "btn-primary", "mr-2")}
                  >
                    <FontAwesomeIcon icon={faEdit} className={cx("icon")} />
                  </button>
                  <button
                    onClick={() => handleDeleteStaffType(position._id)}
                    style={{
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "Red",
                    }}
                    className={cx("btn", "btn-primary")}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={cx("icon")}
                    />
                  </button>
                </td></>
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
                marginTop: -30,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>
              {selectedStaffType ? "Thêm chức vụ" : "Sửa chức vụ"}
            </h3>
            <div className={cx("formWrapper")}>
              <div
              >
                <div className={cx("inputWrapper")}>
                  <label htmlFor="chucvu">Tên chức vụ:</label>
                  
                  <input
                    type="text"
                    name="staffType"
                    value={staffTypeChangeValue}
                    onChange={(e) => { setStaffTypeChangeValue(e.target.value) }
                    }
                    className={cx("form-control")}
                    placeholder="Nhập chức vụ"
                    maxLength={50}
                  />
                  <div className={cx("buttonWrapper")}>
                    {
                      selectedStaffType ? (
                        <button
                          className={cx("addButton", "btn")}
                          style={{
                            marginRight: "8px",
                            backgroundColor: "#2e3f50",
                          }}
                          onClick={handleUpdateStaffType}
                        >
                          Sửa
                        </button>
                      ) : (<button
                        className={cx("addButton", "btn")}
                        style={{
                          marginRight: "8px",
                          backgroundColor: "#2e3f50",
                        }}
                        // onClick={handleAddStaffType}
                      >
                        Thêm
                      </button>)
                    }



                    <button
                      type="button"
                      className={cx("cancelButton", "btn", "btn-danger")}
                      onClick={toggleModal}

                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffType;
