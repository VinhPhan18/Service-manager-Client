import * as request from "~/utils/request";

export const login = async (username, password) => {
  try {
    const res = await request.get("staff/login", {
      params: {
        username,
        password
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPosition = async () => {
  try {
    const res = await request.get("staff/positions");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createPosition = async ({name}) => {
  try {
    const res = await request.post("staff/add-position",name);
    return res;
  } catch (error) {
    console.log(error);
  }
};