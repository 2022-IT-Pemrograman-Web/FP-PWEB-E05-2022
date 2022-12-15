<template>
  <div class="add">
    <h1>Add Data</h1>
    <div v-if="response != 0">{{ this.response }}</div>
    <div v-if="loginInfo != null">
      <form id="ticketForm" @submit="addTicket">
        <input type="text" id="inputMerk" placeholder="merk" required />
        <input type="text" id="inputJenis" placeholder="jenis" required />
        <input type="text" id="inputAsal" placeholder="asal" required />
        <input type="text" id="inputTujuan" placeholder="tujuan" required />
        <input
          type="number"
          id="inputWA"
          placeholder="waktu asal (timestamp)"
          required
        />
        <input
          type="number"
          id="inputWT"
          placeholder="waktu tujuan (timestamp)"
          required
        />
        <input type="number" id="inputHG" placeholder="harga tiket" required />
        <input type="number" id="inputJumlah" placeholder="jumlah" required />
        <input type="submit" Value="Add Ticket" />
      </form>
    </div>
    <div v-else>Please login to add ticket</div>
    <button @click="$router.go(-1)">Back</button>
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
    async addTicket(e) {
      e.preventDefault();
      const inputMerk = document.getElementById("inputMerk").value;
      const inputJenis = document.getElementById("inputJenis").value;
      const inputAsal = document.getElementById("inputAsal").value;
      const inputTujuan = document.getElementById("inputTujuan").value;
      const inputWA = document.getElementById("inputWA").value;
      const inputWT = document.getElementById("inputWT").value;
      const inputHG = document.getElementById("inputHG").value;
      const inputJumlah = document.getElementById("inputJumlah").value;
      const ticket = {
        merk: inputMerk,
        jenis: inputJenis,
        asal: inputAsal,
        tujuan: inputTujuan,
        harga: inputHG,
        jumlah: inputJumlah,
        waktuasal: inputWA,
        waktutujuan: inputWT,
        user: this.loginInfo.id,
        username: this.loginInfo.username,
      };
      await axios
        .post(`${server.baseURL}/tickets`, ticket)
        .then((response) => (this.response = response.data));
    },
    async getLoginInfo() {
      this.loginInfo = JSON.parse(sessionStorage.getItem("logininfo"));
    },
  },
};
</script>
