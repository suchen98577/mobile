import axios from "./axios";

//首页相关
const index = {
  //获取分类信息
  cate(params) {
    return axios.get("/getcate", {
      params
    });
  },
  //获取轮播图信息
  banner(params) {
    return axios.get("/getbanner", {
      params
    });
  },
  //获取限时秒杀信息
  seckill() {
    return axios.get("/getseckill");
  },
  //获取首页商品信息
  goods(params) {
    return axios.get("/getindexgoods", {
      params
    });
  }
};
export default index;
