import client from "./client";

const register = (userInfo, config) => client.post("users", userInfo, config);

export default {
  register,
};
