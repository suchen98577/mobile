<template>
  <div>
    <navbar />
    <!-- 用户已经登陆正常显示 -->
    <div v-if="userInfo">
      <div class="info">
        <van-image round width=".8rem" height=".8rem" :src="imgurl" />
        <van-grid :border="false">
          <van-grid-item>
            <div>用户名：{{ userInfo.nickname }}</div>
            <div>手机号：{{ userInfo.phone }}</div>
          </van-grid-item>
        </van-grid>
        <van-button @click="logout" type="danger">退出登录</van-button>
      </div>
      <div id="title">
        <van-grid :gutter="10" :border="false">
          <van-grid-item v-for="(item, index) in attr" :key="index">
            <div>{{ item.title }}</div>
            <div>{{ item.number }}</div>
          </van-grid-item>
        </van-grid>
      </div>
      <van-cell-group id="indent">
        <van-cell title="我的订单" value="全部订单" is-link />
        <van-grid :border="false" :gutter="10">
          <van-grid-item icon="coupon-o" text="待付款" />
          <van-grid-item icon="cart-o" text="待收货" />
          <van-grid-item icon="comment-o" text="评价" />
          <van-grid-item icon="balance-list-o" text="售后/退款" />
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="地址管理" icon="location-o" is-link />
        <van-cell
          title="我的钱包"
          icon="balance-pay"
          value="剩余200Q币"
          is-link
        />
        <van-cell title="我的二维码" icon="qr" is-link />
        <van-cell title="我的小伙伴" icon="friends-o" is-link />
        <van-cell title="0元试用" icon="after-sale" is-link />
      </van-cell-group>
    </div>
    <div class="info" v-else>
      <van-image round width=".8rem" height=".8rem" :src="imgdefault" />
      <van-grid :border="false"> </van-grid>
      <van-button @click="login" type="primary">点我登录</van-button>
    </div>
    <tabbar />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      attr: [
        { title: "我的收藏", number: "12" },
        { title: "浏览记录", number: "12" },
        { title: "我的红包", number: "￥0" },
        { title: "优惠券", number: "12" },
      ],
      imgdefault: require("../../assets/img/default.jpg"),
      imgurl: require("../../assets/img/img.jpg"),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["setuserInfoSync"]),
    logout() {
      this.setuserInfoSync(false);
      sessionStorage.removeItem("user")
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.info {
  background-color: #ff6040;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #ff6040;
}
.info >>> .van-grid-item__content {
  text-align: left;
  background-color: #ff6040;
  color: #fff;
  font-weight: 1000;
  font-size: 0.16rem;
}
.van-icon,
.van-grid-item__icon,
#indent >>> .van-grid-item__icon {
  color: #ff6040;
}
#title,
#title >>> .van-grid-item__content {
  color: #fff;
  background-color: #ff6040;
  font-weight: 1000;
  font-size: 0.14rem;
}
</style>