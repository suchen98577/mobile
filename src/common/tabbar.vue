<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="wap-home-o"
        >商城</van-tabbar-item
      >
      <van-tabbar-item replace to="/cate" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/mine" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.van-tabbar-item--active {
  color: #ff6040;
}
/* .van-tabbar {
  max-width: 750px;
  margin: auto;
} */
</style>