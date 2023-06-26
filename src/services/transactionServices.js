import * as request from "~/utils/request";

export const getTransaction = async (filters) => {
  try {
    const res = await request.get("transaction/", {
      params: {
        limit: filters.limit,
        sort: filters.sort,
        page: filters.page,
        nhanvien: filters.nhanvien,
        deleted: filters.deleted,
        khachhang: filters.khachhang,
        loaihd: filters.loaihd,
        trangthaigd: filters.trangthaigd,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createTranscation = async (data) => {
  try {
    const res = await request.post("transaction/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
