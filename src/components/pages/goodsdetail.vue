<template>
  <div id="container">
    <navbar />
    <van-tabs>
      <van-tab
        :title="item"
        v-for="(item, index) in attr"
        :key="index"
      ></van-tab>
    </van-tabs>
    <img :src="goodsInfo.img" alt="" class="urlimg" />
    <p class="price">{{ goodsInfo.goodsname }}</p>
    <p class="price">
      <span>￥{{ goodsInfo.price | toPrice(2) }}</span>
      &ensp;
      <del>￥{{ goodsInfo.market_price | toPrice(2) }}</del>
    </p>
    <van-cell-group>
      <van-cell title="促销：两件9折,3件8折" is-link arrow-direction="down" />
      <van-cell title="购买数量" value="内容">
        <template #default>
          <van-stepper v-model="value" min="1" max="10" />
        </template>
      </van-cell>
      <van-cell title="购买数量" is-link arrow-direction="down">
        <template #label>
          规格
          <van-button
            v-for="item in goodsInfo.specsattr"
            :key="item"
            type="warning"
            class="btn"
            >{{ item }}
          </van-button>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell title="商品详情" />
    <div v-html="goodsInfo.description"></div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="danger" text="加入购物车" @click="add" />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
  </div>
</template>

<script>
import cate from "../../utils/axios/cate";
import cart from "../../utils/axios/cart";
import { mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {
      attr: ["商品", "评价", "详情", "推荐"],
      goodsInfo: {},
      value: 1,
    };
  },
  mounted() {
    let id = this.$route.query.id;
    cate.getgoodsinfo({ id }).then((res) => {
      if (res.code == 200) {
        this.goodsInfo = res.list[0];
        this.goodsInfo.specsattr = this.goodsInfo.specsattr
          ? this.goodsInfo.specsattr.split(",")
          : [];
      }
    });
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    add() {
      if (this.userInfo) {
        //已登录
        cart
          .add({
            uid: this.userInfo.uid,
            goodsid: this.goodsInfo.id,
            num: this.value,
          })
          .then((res) => {
            if (res.code == 200) {
              this.$router.push("/cart");
            }
          });
      } else {
        Dialog.alert({
          title: "未登录",
          message: "未登录，不能加入购物车",
        }).then(() => {});
      }
    },
    buy() {
      Dialog.alert({
        message: "哈哈哈哈哈买不了这是一个假按钮",
      }).then(() => {});
    },
  },
};
</script>

<style lang="" scoped>
.urlimg {
  width: 100%;
  height: 3rem;
}
.btn {
  margin: 0.1rem;
  height: 0.3rem;
  font-size: 0.14rem;
}
.price {
  font-size: 0.16rem;
  margin: 0.1rem;
}
#container{
  margin-bottom:.2rem;
}
</style>
