import * as request from "~/utils/request";

export const getContract = async (filters) => {
  try {
    const res = await request.get("contract/", {
      params: {
        limit: filters.limit,
        sort: filters.sort,
        page: filters.page,
        nhanvien: filters.nhanvien,
        deleted: filters.deleted,
        khachhang: filters.khachhang,
        loaihd: filters.loaihd,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createContract = async (data) => {
  try {
    const res = await request.post("contract/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getContractType = async () => {
  try {
    const res = await request.post("contract/types");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getStaff = async (data) => {
  try {
    const res = await request.get("contract/staffs", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updatedContractType = async (data) => {
  try {
    const res = await request.patch("contract/type", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createContractType = async (data) => {
  try {
    const res = await request.post("contract/type", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
