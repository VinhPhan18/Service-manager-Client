import * as request from "~/utils/request";

export const getTransactions = async (filter) => {
  try {
    const res = await request.get("transaction/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        q: filter.q,
        loaigd: filter.loaigd,
        trangthaigd: filter.trangthaigd,
        khachhang: filter.khachhang,
        nguoilienhe: filter.nguoilienhe,
        nhanvien: filter.nhanvien,
        deleted: filter.deleted,
      },
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
export const getTransactionTypes = async () => {
  try {
    const res = await request.get("transaction/types");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addTransactionType = async (data) => {
  try {
    const res = await request.post("transaction/type", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
