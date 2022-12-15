<template>
  <div class="login">
    <div v-if="response != 0">{{ this.response }}</div>
    <div v-if="loginInfo == null">
      <form id="login" @submit="loginUser">
        <input type="text" id="inputUNL" placeholder="username" required />
        <input type="text" id="inputPWL" placeholder="password" required />
        <input type="submit" Value="Login" />
      </form>
    </div>
    <div v-else-if="response == 0 && loginInfo != null">
      <p>Please logout first!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { server } from "../utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      response: 0,
      loginInfo: null,
    };
  },
  mounted() {
    this.getLoginInfo();
  },
  methods: {
    async loginUser(e) {
      e.preventDefault();
      const inputUN = document.getElementById("inputUNL").value;
      const inputPW = document.getElementById("inputPWL").value;

      const user = {
        username: inputUN,
        password: inputPW,
      };
      await axios
        .post(`${server.baseURL}/login`, user)
        .then((response) => (this.loginInfo = response.data))
        .catch((error) => (this.response = error.response.data.message));
      if (this.loginInfo != "Unauthorized" && this.loginInfo != null) {
        sessionStorage.setItem("logininfo", JSON.stringify(this.loginInfo));
        this.response = "Login successful! Redirecting ...";
        setTimeout(() => this.$router.push({ path: "/tickets" }), 3000);
      }
    },
    async getLoginInfo() {
      this.loginInfo = JSON.parse(sessionStorage.getItem("logininfo"));
    },
    async logout() {
      sessionStorage.clear();
      this.getLoginInfo();
      this.$router.go();
    },
  },
};
</script>
