import * as request from "~/utils/request";

export const getCommodities = async ( filter ) => {
  try {
    const res = await request.get("commodity/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        q: filter.q,
        loaihh: filter.loaihh,
        trangthai: filter.trangthai,
        dvt: filter.dvt,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCommodityType = async () => {
  try {
    const res = await request.get("commodity/types");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDvt = async () => {
  try {
    const res = await request.get("commodity/units");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createCommodity = async (data) => {
  try {
    const res = await request.post("commodity/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};