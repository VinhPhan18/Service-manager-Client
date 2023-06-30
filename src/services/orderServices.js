import * as request from "~/utils/request";

export const getOrders = async ( filter ) => {
  try {
    const res = await request.get("order/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        madh: filter.madh,
        nhanvien: filter.nhanvien,
        khachhang: filter.khachhang,
        items: filter.items,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (data) => {
  try {
    const res = await request.post("order/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderItems = async () => {
  try {
    const res = await request.get("order/items");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async () => {
  try {
    const res = await request.get("customer/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCommodity = async () => {
  try {
    const res = await request.get("commodity/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStaff = async () => {
  try {
    const res = await request.get("staff/");
    return res;
  } catch (error) {
    console.log(error);
  }
};