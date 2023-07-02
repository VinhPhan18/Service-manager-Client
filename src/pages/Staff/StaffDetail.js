import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion } from "framer-motion"

import style from "./StaffDetail.module.scss"
import * as staffServices from "~/services/staffServices"
import { useDateFormat } from '~/hooks'

export default function StaffDetail({ id }) {
  const cx = classNames.bind(style)
  const [staffDetail, setStaffDetail] = useState({})

  useEffect(() => {
    const fetchApi = async () => {
      const result = await staffServices.staffDetail(id)
      if (result) {
        setStaffDetail(result)
      }
    }
    fetchApi()
  }, [id])

  const ngaysinh = useDateFormat(staffDetail.ngaysinh)
  const ngayvaolam = useDateFormat(staffDetail.ngayvaolam)
  return (
    <div className={cx("wrapper")}>

      <h1 className={cx("bigTitle")}>CHI TIẾT NHÂN VIÊN</h1>

      {/* THÔNG TIN NHÂN VIÊN */}
      <motion.div layout
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cx("detailItem", "info")}>

        <span className={cx("title")}>Thông tin Nhân Viên</span>

        <div className={cx("content")}>
          {
            staffDetail &&
            <div className={cx("contractType")}>
              <span className={cx("detailItemTitle")}>
                Tên nhân viên:
              </span>
              <span className={cx("detailItemInfo")}>
                {staffDetail.hoten}
              </span>
            </div>

          }

          {
            staffDetail ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Email:
                </span>
                <span className={cx("detailItemInfo")}>
                  {staffDetail.email}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            staffDetail ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Sđt:
                </span>
                <span className={cx("detailItemInfo")}>
                  {staffDetail.sdt}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            staffDetail ? (
              <div className={cx("soquy")}>
                <span className={cx("detailItemTitle")}>
                  Email:
                </span>
                <span className={cx("detailItemInfo")}>
                  {staffDetail.email}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          <div className={cx("row")}>
            {
              staffDetail ? (
                <div className={cx("customer")}>
                  <span className={cx("detailItemTitle")}>
                    Chức vụ:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {staffDetail.chucvu?.name}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

            {
              staffDetail ? (
                <div className={cx("staff")}>
                  <span className={cx("detailItemTitle")}>
                    Ngày sinh:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {ngaysinh}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

            {
              staffDetail ? (
                <div className={cx("contractType")}>
                  <span className={cx("detailItemTitle")}>
                    Ngày vào làm:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {ngayvaolam}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

            {
              staffDetail &&
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Căn cước công dân:
                </span>
                <span className={cx("detailItemInfo")}>
                  {staffDetail.cccd}
                </span>
              </div>

            }

            {
              staffDetail ? (
                <div className={cx("contractType")}>
                  <span className={cx("detailItemTitle")}>
                    Phòng ban:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {staffDetail.phongban}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }
          </div>
        </div>
      </motion.div>

      {/* THÔNG TIN KHÁC */}
      <motion.div layout
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cx("detailItem", "info")}>

        <span className={cx("title")}>Thông tin khác</span>

        <div className={cx("content")}>
          {
            staffDetail ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Địa chỉ:
                </span>
                <span className={cx("detailItemInfo")}>
                  {staffDetail.diachi || ""}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            staffDetail ? (
              <div className={cx("soquy")}>
                <span className={cx("detailItemTitle")}>
                  Tỉnh:
                </span>
                <span className={cx("detailItemInfo")}>
                  {staffDetail.tinh?.name}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          <div className={cx("row")}>
            {
              staffDetail ? (
                <div className={cx("customer")}>
                  <span className={cx("detailItemTitle")}>
                    Phường:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {staffDetail.phuong?.name}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

            {
              staffDetail ? (
                <div className={cx("staff")}>
                  <span className={cx("detailItemTitle")}>
                    Xã:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {staffDetail.xa?.name}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }
          </div>
        </div>
      </motion.div>

    </div>
  )
}
