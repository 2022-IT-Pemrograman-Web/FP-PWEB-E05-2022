<template>
  <div class="register">
    <div v-if="response != 0">{{ this.response }}</div>
    <div v-if="loginInfo == null">
      <form id="register" @submit="registerUser">
        <input type="text" id="inputUN" placeholder="username" required />
        <input type="text" id="inputPW" placeholder="password" required />
        <input type="submit" Value="Register" />
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
    async registerUser(e) {
      e.preventDefault();
      const inputUN = document.getElementById("inputUN").value;
      const inputPW = document.getElementById("inputPW").value;

      const user = {
        username: inputUN,
        password: inputPW,
      };
      await axios
        .post(`${server.baseURL}/register`, user)
        .then((response) => (this.response = response.data))
        .catch((error) => (this.response = error.response.data.message));
      if (this.response == "new user successfully registered") {
        this.response =
          "new user successfully registered, redirecting to login page ...";
        setTimeout(() => this.$router.push({ path: "/login" }), 3000);
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
