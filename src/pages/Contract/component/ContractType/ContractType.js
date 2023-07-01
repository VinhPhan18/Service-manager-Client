import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from "./ContractType.module.scss"
import * as contractServices from '~/services/contractServices'
import Button from '~/components/Button/Button'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Modal from '~/components/Modal/Modal'

export default function ContractType({ closeModal, setOpenNoti, setNotiContent }) {
  const cx = classNames.bind(style)

  const [contractTypes, setContractTypes] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editID, setEditID] = useState("")
  const [editValue, setEditValue] = useState("")
  const [openAddContractType, setOpenAddContractType] = useState(false)
  const [newContractType, setNewContractType] = useState("")

  useEffect(() => {
    const fetchApi = async () => {
      const result = await contractServices.getContractType()
      setContractTypes(result)
    }
    fetchApi()
  }, [])

  const handleEditContractType = () => {
    const data = {
      id: editID,
      loaihd: editValue,
    }
    const fetchApi = async () => {
      const result = await contractServices.editContractType(data)
      if (result) {
        setOpenNoti(true)
        setNotiContent(result.message)
        if (result.status) {
          setOpenEdit(false)
          setContractTypes([result.newContractType, ...contractTypes])
        }
      }
    }
    fetchApi()
  }

  const handleAddContractType = () => {
    const data = {
      loaihd: newContractType
    }
    const fetchApi = async () => {
      const result = await contractServices.addContractType(data)
      if (result) {
        console.log(result)
        setOpenNoti(true)
        setNotiContent(result.message)
        if (result.status) {
          setOpenAddContractType(false)
        }
      }
    }
    fetchApi()
  }

  return (
    <div className={cx("wrapper")}>
      <h1>LOẠI HỢP ĐỒNG</h1>
      <div className={cx("container")}>
        <div className={cx("tableWrapper")}>
          <div className={cx("tableContent")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Loại hợp đồng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {contractTypes ? (
                  contractTypes.map((item) => {
                    return (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        key={item._id}
                      >
                        <td>{item?.loaihd}</td>
                        <td>
                          <Button outline small text onClick={() => {
                            setOpenEdit(true)
                            setEditID(item._id)
                            setEditValue(item.loaihd)
                          }} ><FontAwesomeIcon icon={faPen} /></Button>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cx("loading")}
                  >
                    <td></td>
                    <td></td>
                  </motion.tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className={cx("boxBtns")}>
          <Button primary onClick={() => setOpenAddContractType(true)}>Thêm</Button>
          <Button outline onClick={() => {
            closeModal(false)
          }}>Huỷ</Button>
        </div>
      </div>

      {
        openEdit && <Modal closeModal={setOpenEdit}>
          <div className={cx("editModal")}>
            <h2 className={cx("bigTitle")}>Cập nhật tên loại hợp đồng</h2>
            <label htmlFor="loaihd">Tên loại hợp đồng: </label>
            <input id='loaihd' type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            <div className={cx("boxBtns")}>
              <Button primary onClick={handleEditContractType}>Cập nhật</Button>
              <Button outline onClick={() => {
                setOpenEdit(false)
                setEditID("")
                setEditValue("")
              }}>Huỷ</Button>
            </div>
          </div>
        </Modal>
      }

      {
        openAddContractType && <Modal closeModal={setOpenAddContractType}>
          <div className={cx("addModal")}>
            <h2 className={cx("bigTitle")}>Thêm loại hợp đồng</h2>
            <label htmlFor="loaihd">Tên loại hợp đồng: </label>
            <input id='loaihd' type="text" value={newContractType} onChange={(e) => setNewContractType(e.target.value)} />
            <div className={cx("boxBtns")}>
              <Button primary onClick={handleAddContractType}>Thêm</Button>
              <Button outline onClick={() => {
                setOpenAddContractType(false)
                setNewContractType("")
              }}>Huỷ</Button>
            </div>
          </div>
        </Modal>
      }

    </div>
  )
}
