export default{
    setuserInfo(state,payload){
        state.userInfo=payload
        //因为购物车、订单确认界面需要进行组件守卫，来判断用户是否登录
        //beforerouterenter钩子函数是获取不到this的，因此就拿不到vuex中的数据 
        //所以这里还需要把用户的值也存到浏览器会话存储一份
        sessionStorage.setItem("user",JSON.stringify(payload))
    }
}