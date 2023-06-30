import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion } from "framer-motion"

import style from "./CustomerDetail.module.scss"
import * as customerServices from "~/services/customerServices"


export default function CustomerDetail({ id }) {
  const cx = classNames.bind(style)
  const [customerDetail, setCustomerDetail] = useState({})

  useEffect(() => {
    const fetchApi = async () => {
      const result = await customerServices.customerDetail(id)
      if (result) {
        setCustomerDetail(result)
    console.log(result)  
    }
    }
    fetchApi()
  }, [id])

  return (
    <div className={cx("wrapper")}>

      <h1 className={cx("bigTitle")}>CHI TIẾT KHÁCH HÀNG</h1>

      {/* THÔNG TIN KHÁCH HÀNG */}
      <motion.div layout
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cx("detailItem", "info")}>

        <span className={cx("title")}>Thông tin khách hàng</span>

        <div className={cx("content")}>
          {
            customerDetail.name ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Tên khách hàng:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.name}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            customerDetail.diachivp ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Địa chỉ văn phòng:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.diachivp}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            customerDetail.sdt ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Sđt:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.sdt}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            customerDetail.email ? (
              <div className={cx("soquy")}>
                <span className={cx("detailItemTitle")}>
                  Email:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.email}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          <div className={cx("row")}>
            {
              customerDetail.masothue ? (
                <div className={cx("customer")}>
                  <span className={cx("detailItemTitle")}>
                    Mã số thuế:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {customerDetail.masothue}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

            {
              customerDetail.mota ? (
                <div className={cx("staff")}>
                  <span className={cx("detailItemTitle")}>
                    Mô tả:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {customerDetail.mota}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

        {
            customerDetail.website ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Website:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.website}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

        {
            customerDetail.thongtinkhac &&
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Thông tin khác:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.thongtinkhac}
                </span>
              </div>
            
          }

            {
            customerDetail.stk ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  STK:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.stk}
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
            customerDetail.nguoidaidien &&
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                 Người đại diện:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.nguoidaidien}
                </span>
              </div>
          
          }

          {
            customerDetail.sdtndd? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  SĐTndd:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.sdtndd}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          {
            customerDetail.loaikhachhang?.name &&
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Loại khách hàng:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.loaikhachhang?.name}
                </span>
              </div>
           
          }

          {
            customerDetail.tinh?.name ? (
              <div className={cx("soquy")}>
                <span className={cx("detailItemTitle")}>
                  Tỉnh:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.tinh?.name}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

          <div className={cx("row")}>
            {
              customerDetail.phuong?.name ? (
                <div className={cx("customer")}>
                  <span className={cx("detailItemTitle")}>
                    Phường:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {customerDetail.phuong?.name}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

            {
              customerDetail.xa?.name ? (
                <div className={cx("staff")}>
                  <span className={cx("detailItemTitle")}>
                    Xã:
                  </span>
                  <span className={cx("detailItemInfo")}>
                    {customerDetail.xa?.name}
                  </span>
                </div>
              ) : (
                <div className={cx("noContent")}></div>
              )
            }

        {
            customerDetail.chucvundd?.name ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Chức vụ nđd:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.chucvundd?.name}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

            {
            customerDetail.nhanvien?.hoten ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Nhân viên:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.nhanvien?.hoten}
                </span>
              </div>
            ) : (
              <div className={cx("noContent")}></div>
            )
          }

            {
            customerDetail.nguoilienhe?.name ? (
              <div className={cx("contractType")}>
                <span className={cx("detailItemTitle")}>
                  Người liên hệ:
                </span>
                <span className={cx("detailItemInfo")}>
                  {customerDetail.nguoilienhe?.name}
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
