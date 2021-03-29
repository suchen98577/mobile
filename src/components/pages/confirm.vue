<template>
  <div>
    <navbar />
    <van-contact-card
      type="edit"
      :name="userInfo.nickname"
      :tel="userInfo.phone"
    />
    <van-card
      v-for="item in getcartList"
      :key="item.id"
      :price="item.price | toPrice(2)"
      :title="item.goodsname"
      :thumb="item.img"
      :num="item.num"
    />
    <van-cell-group>
      <van-cell title="发票类型" value="不开发票" is-link />
      <van-cell title="售后免邮" value="部分商家赠送" />
      <van-cell
        title="买家留言"
        value="填写内容需要与商家协商并确定，45字以内"
      />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="商品金额" :value="sum" />
      <van-cell title="优惠活动" value="-￥200" />
      <van-cell title="优惠券" value="无可用券" />
    </van-cell-group>
    <van-submit-bar
      :price="sum * 100"
      button-text="确定订单"
      @submit="onSubmit"
    >
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {
      cartlist: [],
    };
  },
  methods: {
    //结算
    onSubmit() {
      Dialog.alert({
        message: "哈哈哈哈哈买不了这是一个假按钮",
      }).then(() => {});
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapGetters("cart", ["getcartList"]),
    sum() {
      return this.getcartList.reduce((sum, item) => {
        sum += item.price * item.num;
        return sum;
      }, 0);
    },
  },
  //组件前置守卫，需要判断用户有没有登陆，没有登陆的话强制跳转到登录
  beforeRouteEnter(to, from, next) {
    //无法获取this，因为组件还没有被创建
    if (sessionStorage.getItem("user")) {
      next();
    } else {
      Dialog.alert({
        message: "该页面需要登录才能访问,快去登陆哦",
      }).then(() => {
        next("/login");
      });
    }
  },
};
</script>

<style lang="" scoped>
</style>