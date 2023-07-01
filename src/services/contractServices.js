import * as request from "~/utils/request";

export const getContract = async (filter) => {
  try {
    const res = await request.get("contract/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        nhanvien: filter.nhanvien,
        khachhang: filter.khachhang,
        loaihd: filter.loaihd,
        deleted: filter.deleted,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const contractDetail = async (id) => {
  try {
    const res = await request.get(`contract/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getContractType = async () => {
  try {
    const res = await request.get("contract/types")
    return res
  } catch (error) {
    console.log(error)
  }
}

export const editContractType = async (data) => {
  try {
    const res = await request.patch("contract/type", data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const addContractType = async (data) => {
  try {
    const res = await request.post("contract/type", data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createContract = async (data) => {
  try {
    const res = await request.post("contract/create", data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const editContract = async (data) => {
  try {
    const res = await request.patch("contract/change-info", data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteContract = async (data) => {
  try {
    const res = await request.patch("contract/delete", data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const undeleteContract = async (data) => {
  try {
    const res = await request.patch("contract/undelete", data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const destroy = async (data) => {
  try {
    const res = await request.destroy("contract/destroy", {
      params: {
        _id: data._id
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }
}