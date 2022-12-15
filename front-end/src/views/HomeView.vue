<template>
  <div class="home">
    <div v-if="response != 0">{{ this.response }}</div>
    <form id="register" @submit="registerUser">
      <input type="text" id="inputUN" placeholder="username" required />
      <input type="text" id="inputPW" placeholder="password" required />
      <input type="submit" Value="Register" />
    </form>
  </div>
</template>

<script>
import { server } from "../utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      response: 0,
    };
  },
  mounted() {},
  methods: {
    registerUser(e) {
      e.preventDefault();
      const inputUN = document.getElementById("inputUN").value;
      const inputPW = document.getElementById("inputPW").value;

      const user = {
        username: inputUN,
        password: inputPW,
      };
      axios
        .post(`${server.baseURL}/register`, user)
        .then((response) => (this.response = response.data))
        .catch((error) => (this.response = error.response.data.message));
      console.log(this.response);
    },
  },
};
</script>
