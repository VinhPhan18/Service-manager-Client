import * as request from "~/utils/request";

export const getTransaction = async (filter) => {
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

export const updatedTransactionType = async (data) => {
  try {
    const res = await request.patch("transaction/types", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTransactionType = async (data) => {
  try {
    const res = await request.patch("transaction/delete", data);
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

export const getTransactionStatus = async () => {
  try {
    const res = await request.get("transaction/status");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatedTransactionStatus = async (data) => {
  try {
    const res = await request.patch("transaction/status", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTransactionStatus = async (data) => {
  try {
    const res = await request.patch("transaction/status", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addTransactionStatus = async (data) => {
  try {
    const res = await request.post("transaction/status", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = async (data) => {
  try {
    const res = await request.post("transaction/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const editTransaction = async (data) => {
  try {
    const res = await request.patch("transaction/change-info", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async (data) => {
  try {
    const res = await request.patch("transaction/delete", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const undeleteTransaction = async (data) => {
  try {
    const res = await request.patch("transaction/undelete", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const destroy = async (data) => {
  try {
    const res = await request.destroy("transaction/destroy", {
      params: {
        _id: data._id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
