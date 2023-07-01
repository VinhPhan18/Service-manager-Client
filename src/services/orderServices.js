import * as request from "~/utils/request";

export const getOrders = async ( filter ) => {
  try {
    const res = await request.get("order/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        q: filter.q,
        ngaybatdau: filter.ngaybatdau,
        ngayketthuc: filter.ngayketthuc,
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

export const getOrderItem = async () => {
  try {
    const res = await request.get("order/items");
    return res;
  } catch (error) {
    console.log(error);
  }
};



