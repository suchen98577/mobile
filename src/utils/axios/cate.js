import axios from "./axios";
//分类界面
const cate = {
  //获取商品分类
  //商品分类列表
  list(params) {
    return axios.get("/catelist", {
      params
    });
  },
  //获取分类商品
  getcategoods(params) {
    return axios.get("/getcategoods", {
      params
    });
  },
  //获取商品信息
  getgoodsinfo(params) {
    return axios.get("/getgoodsinfo", {
      params
    });
  }
};
export default cate;
