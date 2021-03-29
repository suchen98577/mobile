<template>
  <div>
    <van-nav-bar
      :title="$route.name"
      right-text="..."
      left-arrow
      @click-left="$router.back()"
    />
  </div>
</template>

<style scoped>
.van-nav-bar {
  background-color: #ff6040;
  font-weight: 1000;
}
.van-nav-bar >>> .van-nav-bar__title{
  color: #fff ;
}
</style>
