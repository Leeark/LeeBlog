<template>
  <div class="form-wrap">
    <form action="" class="register">
      <p class="login-register">
        已经有账户？
        <router-link class="router-link" :to="{ name: 'Login' }"
          >登录</router-link
        >
      </p>
      <h2>注册博客账户</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="姓名" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="用户名" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="邮箱" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="密码" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">注册</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name: "regis-ter",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstName: "",
      username: "",
      password: "",
      email: "",
      error: null,
      errorMsg: "",
      isAdmin: false,
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.firstName !== "" &&
        this.username !== "" &&
        this.password !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          username: this.username,
          email: this.email,
          isAdmin: this.isAdmin,
        });
        this.$router.push({ name: "Home" });
        return;
      }
      this.error = true;
      this.errorMsg = "请填写所有信息";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>