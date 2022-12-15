<template>
  <div class="add">
    <div v-if="response != 0">{{ this.response }}</div>
    <h1>Add Data</h1>
    <form id="ticketForm" @submit="addTicket">
      <input type="text" id="inputMerk" placeholder="merk" required />
      <input type="text" id="inputJenis" placeholder="jenis" required />
      <input type="text" id="inputAsal" placeholder="asal" required />
      <input type="text" id="inputTujuan" placeholder="tujuan" required />
      <input type="number" id="inputWA" placeholder="waktu asal" required />
      <input type="number" id="inputWT" placeholder="waktu tujuan" required />
      <input type="number" id="inputHarga" placeholder="harga tiket" required />
      <input type="number" id="inputJumlah" placeholder="jumlah" required />
      <input type="submit" Value="Add Ticket" />
    </form>
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
    };
  },
  mounted() {},
  methods: {
    addTicket(e) {
      e.preventDefault();
      const inputMerk = document.getElementById("inputMerk").value;
      const inputJenis = document.getElementById("inputJenis").value;
      const inputAsal = document.getElementById("inputAsal").value;
      const inputTujuan = document.getElementById("inputTujuan").value;
      const inputWA = document.getElementById("inputWA").value;
      const inputWT = document.getElementById("inputWT").value;
      const inputHarga = document.getElementById("inputHarga").value;
      const inputJumlah = document.getElementById("inputJumlah").value;

      const ticket = {
        username: "admin",
        user: "StXst564QGYlEY3u0gYA",
        merk: inputMerk,
        jenis: inputJenis,
        asal: inputAsal,
        tujuan: inputTujuan,
        waktuasal: inputWA,
        waktutujuan: inputWT,
        harga: inputHarga,
        jumlah: inputJumlah,
      };
      axios
        .post(`${server.baseURL}/tickets`, ticket)
        .then((response) => (this.response = response.data));
    },
  },
};
</script>
