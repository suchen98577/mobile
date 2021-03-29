<template>
  <div class="contain">
    <navbar />
    <nav>
      <div id="title">
        <van-icon name="location-o" color="#fff" />
        <van-image width="1rem" height=".24rem" :src="logo" />
        <van-search
          height=".3rem"
          v-model="value"
          placeholder="请输入搜索关键词"
          background="#fff"
        />
        <van-icon name="shop-o" color="#fff" />
      </div>
      <van-tabs>
        <van-tab
          :title="item.catename"
          v-for="item in getcatelist"
          :key="item.id"
        ></van-tab>
      </van-tabs>
    </nav>
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="item.img" class="imgurl" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :border="false" :column-num="5">
      <van-grid-item v-for="item in list" :key="item.id">
        <van-image :src="item.imgsrc"></van-image>
        <p class="">{{ item.title }}</p>
      </van-grid-item>
    </van-grid>
    <div id="con">
      <div id="left">
        <p>
          <span>限时秒杀</span>
          <span>查看更多 &gt;</span>
        </p>
        <div>每天0点场，好货秒不停</div>
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <div id="right">
        <div id="top">
          <p class="title">品牌上新</p>
          <p class="des">9点整抢大牌</p>
          <p class="sale">疯抢红包 &gt;</p>
        </div>
        <div id="bottom">
          <p class="title">日用好物</p>
          <p class="des">愿君多采撷</p>
          <p class="sale">塞满奖券 &gt;</p>
        </div>
      </div>
    </div>

    <van-tabs type="card">
      <van-tab title="热卖商品">
        <van-card
          @click="detail(item.id)"
          v-for="item in hotList"
          :key="item.id"
          :price="item.price | toPrice(2)"
          :title="item.goodsname"
          :thumb="item.img"
        />
      </van-tab>
      <van-tab title="最新潮品">
        <van-card
          @click="detail(item.id)"
          v-for="item in newsList"
          :key="item.id"
          :price="item.price | toPrice(2)"
          :title="item.goodsname"
          :thumb="item.img"
        />
      </van-tab>
      <van-tab title="全部商品">
        <van-card
          @click="detail(item.id)"
          v-for="item in goodsList"
          :key="item.id"
          :price="item.price | toPrice(2)"
          :title="item.goodsname"
          :thumb="item.img"
        />
      </van-tab>
    </van-tabs>

    <tabbar />
  </div>
</template>

<script>
import index from "../../utils/axios";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      value: "",
      bannerList: [],
      list: [
        {
          id: 1,
          title: "限时秒杀",
          imgsrc: require("../../assets/img/icon/seckill.png"),
        },
        {
          id: 2,
          title: "畅购商品",
          imgsrc: require("../../assets/img/icon/top.png"),
        },
        {
          id: 3,
          title: "品质大牌",
          imgsrc: require("../../assets/img/icon/brand.png"),
        },
        {
          id: 4,
          title: "小U商城",
          imgsrc: require("../../assets/img/icon/selfsupport.png"),
        },
        {
          id: 5,
          title: "积分商城",
          imgsrc: require("../../assets/img/icon/integral.png"),
        },
      ],
      logo: require("../../assets/img/pic/white.png"),
      time: 1000,
      goodsList: [],
      hotList: [],
      newsList: [],
    };
  },
  computed: {
    ...mapGetters("cate", ["getcatelist"]),
  },
  methods: {
    detail(id) {
      this.$router.push({
        path: "/goodsdetail",
        query: { id },
      });
    },
  },
  mounted() {
    axios.all([index.banner(), index.seckill(), index.goods()]).then(
      axios.spread((res1, res2, res3) => {
        if (res1.code == 200) {
          this.bannerList = res1.list;
        }
        if (res2.code == 200) {
          this.time = res2.list[0].endtime - res2.list[0].begintime;
        }
        if (res3.code == 200) {
          this.hotList = res3.list[0].content;
          this.newsList = res3.list[1].content;
          this.goodsList = res3.list[2].content;
        }
      })
    );
  },
};
</script>

<style scoped>
nav {
  overflow: hidden;
  box-sizing: border-box;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
}
#title {
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.van-icon {
  font-size: 0.24rem;
}
.van-search {
  padding: 0;
}
nav >>> .van-tabs__nav {
  background-color: transparent;
}
nav >>> .van-tab {
  color: #fff;
}
nav >>> .van-tabs__line {
  background-color: #fff;
}
.van-swipe {
  width: 88%;
  margin: auto;
}
.imgurl {
  width: 100%;
  height: 3rem;
}
#con {
  width: 100%;
  box-sizing: border-box;
  padding: 0.1rem;
  display: flex;
  height: 1.95rem;
  justify-content: space-between;
}
#left,
#right {
  box-sizing: border-box;
  width: 50%;
  height: 1.75rem;
}
#left {
  padding: 0.1rem;
  background-image: url("../../assets/img/pic/big.png");
}
#left p {
  display: flex;
  justify-content: space-between;
}
#left p span:first-child {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #85a642;
  line-height: 0.16rem;
}
#left p span:last-child {
  font-family: PingFangSC-Light;
  font-size: 0.1rem;
  color: #333333;
  text-align: right;
  line-height: 0.1rem;
}
#left div {
  font-family: PingFangSC-Light;
  font-size: 0.1rem;
  color: #b1cc7a;
  line-height: 0.1rem;
  margin: 0.1rem 0 0.05rem;
}

#right {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#right .title {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  line-height: 0.16rem;
}
#right .des {
  font-family: PingFangSC-Light;
  font-size: 0.1rem;
  line-height: 0.1rem;
  margin: 0.1rem 0 0.05rem;
}
#right .sale {
  background-image: linear-gradient(180deg, #ff6040 0%, #ff9f80 100%);
  border-radius: 2px 12px 12px 2px;
  width: 50%;
  box-sizing: border-box;
  height: 0.2rem;
  font-family: PingFangSC-Medium;
  font-size: 0.1rem;
  color: #ffffff;
  line-height: 0.12rem;
  padding: 0.04rem;
}
#top,
#bottom {
  box-sizing: border-box;
  padding: 0.1rem;
  width: 100%;
  height: 50%;
}
#top {
  background-image: url("../../assets/img/pic/small.png");
  color: #ff6040;
}
#bottom {
  color: #af40ff;
  background-image: url("../../assets/img/pic/small.png");
}
#bottom .sale {
  background-image: linear-gradient(180deg, #af40ff 0%, #f58cff 100%);
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #fff;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-image: linear-gradient(180deg, #85a642 0%, #b1cc7a 100%);
}
.contain {
  margin-bottom: 0.6rem;
}
</style>