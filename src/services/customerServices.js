import * as request from "~/utils/request";

export const getCustomers = async ( filter) => {
  try {
    const res = await request.get("customer/", {
      params: {
     limit: filter.limit,
     sort : filter.sort,
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

export const getCustomerTypes = async ( filter) =>{
   try {
    const res = await request.get("customer/types",
    {
      params: {
        limit: filter.limit,
        sort: filter.sort,
        page: filter.page,
        name: filter.name,
      }
    }
    ) ;
    
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

export const updatedCustomerType = async (data) => {
  try {
    const res = await request.patch("customer/type", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createCustomerType = async (data) => {
  try {
    const res = await request.post("customer/type", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const info = async (id) => {
  try {
    const res = await request.get(`customer/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};


//detail
export const customerDetail = async (id) => {
  try {
    const res = await request.get(`customer/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
