import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

import style from "./TransactionDetail.module.scss";
import * as transactionServices from "~/services/transactionServices";

export default function TransactionDetail({ id }) {
  const cx = classNames.bind(style);
  const [transactionDetail, setTransactionDetail] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const result = await transactionServices.transactionDetail(id);
      if (result) {
        setTransactionDetail(result);
      }
    };
    fetchApi();
  }, [id]);

  console.log(transactionDetail);

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("bigTitle")}>CHI TIẾT GIAO DỊCH</h1>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cx("detailItem", "info")}
      >
        <span className={cx("title")}>Thông tin giao dịch</span>

        <div className={cx("content")}>
          {transactionDetail.name ? (
            <div className={cx("transactionType")}>
              <span className={cx("detailItemTitle")}>Tên giao dịch:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.name}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.loaigd?.name ? (
            <div className={cx("transactionType")}>
              <span className={cx("detailItemTitle")}>Loại giao dịch:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.loaigd?.name}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.mota ? (
            <div className={cx("mota")}>
              <span className={cx("detailItemTitle")}>Mô tả:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.mota}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.danhgia ? (
            <div className={cx("danhgia")}>
              <span className={cx("detailItemTitle")}>Đánh giá:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.danhgia}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.ketquagd ? (
            <div className={cx("ketquagd")}>
              <span className={cx("detailItemTitle")}>Kết quả giao dịch:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.ketquagd}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.tailieugiaodich ? (
            <div className={cx("tailieugiaodich")}>
              <span className={cx("detailItemTitle")}>Tài liệu giao dịch:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.tailieugiaodich}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.trangthaigd?.name ? (
            <div className={cx("transactionStatus")}>
              <span className={cx("detailItemTitle")}>
                Trạng thái giao dịch:
              </span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.trangthaigd?.name}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.diachigd ? (
            <div className={cx("diachigd")}>
              <span className={cx("detailItemTitle")}>Địa chỉ giao dịch:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.diachigd}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.nguoilienhe?.name ? (
            <div className={cx("contact")}>
              <span className={cx("detailItemTitle")}>Người liên hệ:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.nguoilienhe?.name}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}
          {transactionDetail.nhanvien?.hoten ? (
            <div className={cx("staff")}>
              <span className={cx("detailItemTitle")}>Nhân viên:</span>
              <span className={cx("detailItemInfo")}>
                {transactionDetail.nhanvien?.hoten}
              </span>
            </div>
          ) : (
            <div className={cx("noContent")}></div>
          )}{" "}
        </div>
      </motion.div>
    </div>
  );
}
