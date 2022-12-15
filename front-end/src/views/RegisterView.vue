<template>
  <div class="d-flex justify-content-center">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="/">Home</a>
            <a class="nav-link" href="/tickets">Tickets</a>
            <a class="nav-link" href="/login">Login</a>
            <a class="nav-link active" aria-current="page" href="/register">Register</a>
          </div>
        </div>
      </div>
    </nav>
  </div>

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
