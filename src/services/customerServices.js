import * as request from "~/utils/request";

export const getCustomers = async (filter) => {
  try {
    const res = await request.get("customer/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        q: filter.q,
        loaikhachhang: filter.loaikhachhang,
        tinh: filter.tinh,
        phuong: filter.phuong,
        xa: filter.xa,
        nhanvien: filter.nhanvien,
        chucvundd: filter.chucvundd,
        deleted: filter.deleted,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerTypes = async () => {
  try {
    const res = await request.get("customer/types");
    return res
  } catch (error) {
    console.log(error)
  }
}
export const createCustomer = async (data) => {
  try {
    const res = await request.post("customer/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};