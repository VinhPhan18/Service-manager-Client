import * as request from "~/utils/request";

export const getTransaction = async (filter) => {
  try {
    const res = await request.get("transaction/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        nhanvien: filter.nhanvien,
        khachhang: filter.khachhang,
        trangthaigiaodich: filter.trangthaigiaodich,
        loaigd: filter.loaihd,
        deleted: filter.deleted,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const transactionDetail = async (id) => {
  try {
    const res = await request.get(`transaction/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};