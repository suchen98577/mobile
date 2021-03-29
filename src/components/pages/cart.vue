<template>
  <div>
    <navbar />
    <van-tabs>
      <van-tab
        :title="item"
        v-for="(item, index) in attr"
        :key="index"
      ></van-tab>
    </van-tabs>
    <van-swipe-cell v-for="item in cartlist" :key="item.id">
      <van-card
        :price="item.price | toPrice(2)"
        :title="item.goodsname"
        :thumb="item.img"
      >
        <template #tag>
          <input
            type="checkbox"
            v-model="checkedList"
            :value="item"
            @change="inp"
          />
        </template>
        <template #num>
          <van-stepper
            integer
            theme="round"
            v-model="item.num"
            min="1"
            max="10"
            @minus="minus(item.id)"
            @plus="plus(item.id)"
          />
        </template>
      </van-card>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="del(item.id)"
        />
      </template>
    </van-swipe-cell>
    <van-submit-bar
      :price="sum * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <tabbar />
      <van-checkbox v-model="checkedAll" @click="all">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import cart from "../../utils/axios/cart";
import { mapActions, mapGetters } from "vuex";
import { Notify } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      attr: ["全部(20)", "降价(4)", "常卖(2)", "分类0"],
      cartlist: [],
      checkedList: [],
      //input双向绑定的数组，用来计算sum
      checkedAll: false,
      //全选按钮
    };
  },
  mounted() {
    this.listUpdate();
  },
  methods: {
    //删除
    del(id) {
      cart.delete({ id }).then((res) => {
        if (res.code == 200) {
          Notify({ type: "success", message: res.msg });
          this.listUpdate();
          this.checkedList = this.checkedList.filter((item) => item.id != id);
          //删除被删除的那一项
        }
      });
    },
    //num--
    minus(id) {
      cart
        .edit({
          id,
          type: 1,
        })
        .then((res) => {
          Notify({ type: "primary", message: res.msg });
        });
    },
    //num++
    plus(id) {
      cart
        .edit({
          id,
          type: 2,
        })
        .then((res) => {
          Notify({ type: "primary", message: res.msg });
        });
    },
    //界面更新
    listUpdate() {
      let uid = this.userInfo.uid;
      cart.list({ uid }).then((res) => {
        if (res.code == 200) {
          this.cartlist = res.list;
        }
      });
    },
    //结算
    onSubmit() {
      this.$router.push("/confirm");
      this.changecartListSync(this.checkedList);
    },
    //全选
    all() {
      if (this.checkedAll) {
        this.checkedList = this.cartlist?this.cartlist:[];
      } else {
        this.checkedList = [];
      }
    },
    //反选
    inp() {
      if (
        this.checkedList.length == this.cartlist.length &&
        this.checkedList.length != 0
      ) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    ...mapActions("cart", ["changecartListSync"]),
  },
  computed: {
    ...mapGetters(["userInfo"]),
    sum() {
      if(this.checkedList.length==0) return 0.00;
      return this.checkedList.reduce((sum, item) => {
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
.urlimg {
  width: 100%;
  height: 3rem;
}
.delete-button {
  height: 100%;
}
.van-submit-bar {
  margin-bottom: 0.5rem;
}
</style>