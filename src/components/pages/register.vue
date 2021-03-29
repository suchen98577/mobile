<template>
  <div>
    <navbar/>
    <van-form @submit="onSubmit">
      <van-field
        v-model="info.phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="info.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
      />
      <van-field
        v-model="info.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import member from "../../utils/axios/member";
import { Toast } from "vant";
export default {
  data() {
    return {
      info: {
        nickname: "",
        phone: "",
        password: "",
      },
      pattern: /1\d{10}/,
    };
  },
  methods: {
    onSubmit(values) {
      member.register(this.info).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          this.$router.push("/login");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.van-form {
  margin-top: 2rem;
}
</style>