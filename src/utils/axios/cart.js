import axios from "./axios";

const cart = {
  //获取购物车列表
  list(params) {
    return axios.get("/cartlist", {
      params
    });
  },
  //购物车添加
  add(data) {
    return axios.post("/cartadd", data);
  },
  //购物车编辑
  edit(data) {
    return axios.post("/cartedit", data);
  },
  //购物车删除
  delete(data) {
    return axios.post("/cartdelete", data);
  }
};

export default cart;
