import * as request from "~/utils/request";

export const createCustomerType = async (data) => {
    try {
      const res = await request.post("customer/type", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  export const getCustomerTypes = async () =>{
    try {
     const res = await request.get("customer/types") ;
     return res 
    } catch (error) {
     console.log(error)
    }
 }