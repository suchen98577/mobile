import axios from "./axios";
//会员注册登录
const member = {
  //会员注册
  register(data) {
    return axios.post("/register", data);
  },
  //会员登录
  login(data) {
    return axios.post("/login", data);
  }
};
export default member;
