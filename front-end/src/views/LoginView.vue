<template>
  <div class="d-flex justify-content-center">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TIC-COM</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="/">Home</a>
            <a class="nav-link" href="/tickets">Tickets</a>
            <a class="nav-link active" aria-current="page" href="/login">Login</a>
            <a class="nav-link" href="/register">Register</a>
          </div>
        </div>
      </div>
      <a class="nav-link" href="/orders">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
      </svg>
      </a>
    </nav>
  </div>

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
        let url = document.location.href;
        url = url.substring(0, url.length - 5);
        url = url + "tickets";
        // setTimeout(
        //   () =>
        //     this.$router.push({
        //       path: "/tickets",
        //       reload: true,
        //     }),
        //   3000
        // );
        setTimeout(() => (window.location = url), 3000);
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
