import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/index",
      component:()=>import("@/components/pages/index"),
      name:"小U商城"
    },
    {
      path:"/login",
      component:()=>import("@/components/pages/login"),
      name:"登录"
    },
    {
      path:"/register",
      component:()=>import("@/components/pages/register"),
      name:"注册"
    },
    {
      path:"/mine",
      component:()=>import("@/components/pages/mine"),
      name:"我的"
    },
    {
      path:"/cate",
      component:()=>import("@/components/pages/cate"),
      name:"分类"
    },
    {
      path:"/cart",
      component:()=>import("@/components/pages/cart"),
      name:"购物车"
    },
    {
      path:"/goodslist",
      component:()=>import("@/components/pages/goodslist"),
      name:"小U商城"
    },
    {
      path:"/goodsdetail",
      component:()=>import("@/components/pages/goodsdetail"),
      name:"商品详情"
    },
    {
      path:"/confirm",
      component:()=>import("@/components/pages/confirm"),
      name:"确认订单"
    },
    {
      path:"*",
      redirect:"/index"
    }
  ]
})
