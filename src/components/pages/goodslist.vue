<template>
  <div>
    <navbar />
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      background="#ff6040"
    />
    <van-tabs>
      <van-tab
        :title="item"
        v-for="(item, index) in attr"
        :key="index"
      ></van-tab>
    </van-tabs>
    <van-card
      @click="detail(item.id)"
      v-for="item in goodslist"
      :key="item.id"
      :price="item.price | toPrice(2)"
      :desc="item.description"
      :title="item.goodsname"
      :thumb="item.img"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cate from "../../utils/axios/cate";
export default {
  data() {
    return {
      attr:["综合推荐","销量","价格","好评度","店铺","筛选"],
      value: "",
      goodslist: [],
    };
  },
  mounted() {
    let sid = this.$route.query.sid;
    cate.getcategoods({ sid }).then((res) => {
      if (res.code == 200) {
        this.goodslist = res.list;
      }
    });
  },
  methods: {
    detail(id) {
      this.$router.push({
        path: "/goodsdetail",
        query: { id },
      });
    },
  },
  computed: {
    ...mapGetters(["getcatelist"]),
  },
};
</script>

<style>
</style>