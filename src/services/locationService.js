import * as request from "~/utils/request";

export const getProvince = async (filter) => {
    try {
      const res = await request.get("location/province", {
        params: {
         q: filter.q
        }
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  