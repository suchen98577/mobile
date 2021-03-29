<template>
  <div>
    <navbar />
    <van-search
      v-model="value"
      placeholder="按内容搜索"
      background="#ff6040"
    />
    <div id="cate" style="display: flex">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in getcatelist"
          :title="item.catename"
          :key="item.id"
        />
      </van-sidebar>
      <van-grid :border="false" :column-num="3">
        <van-grid-item
          :to="'/goodslist?sid=' + item.id"
          v-for="item in secondList"
          :key="item.id"
        >
          <van-image :src="item.img" />
          <p style="font-size: 0.14rem">{{ item.catename }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <tabbar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeKey: 0,
      value: "",
      secondList: [],
    };
  },
  methods: {
    onChange(i) {
      this.secondList = this.getcatelist[i].children?this.getcatelist[i].children:[];
    },
    ...mapActions("cate", ["changecatelistSync"]),
  },
  computed: {
    ...mapGetters("cate", ["getcatelist"]),
  },
  created() {
    this.changecatelistSync();
    this.secondList = this.getcatelist[0].children;
  },
};
</script>

<style scoped>
.van-grid {
  flex: 1;
}
</style>