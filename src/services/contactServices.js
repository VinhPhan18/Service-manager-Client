import * as request from "~/utils/request";

export const getContact = async (filter) => {
  try {
    const res = await request.get("contact/", {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        q: filter.q,
        lienhechinh: filter.lienhechinh,
        trangthai: filter.trangthai,
        chucvu: filter.chucvu,
        deleted: filter.deleted,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createContact = async (data) => {
  try {
    const res = await request.post("contact/create", data)
    return res
  } catch (error) {
    console.log(error)
  }
}