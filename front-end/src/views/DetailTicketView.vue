<template>
  <div class="detail">
    <h1>Detail</h1>
    <div v-if="response != 0">{{ this.response }}</div>
    <div v-if="ticket != 0 && loginInfo != null && ticket.user == loginInfo.id">
      <input
        type="text"
        id="inputMerk"
        placeholder="merk"
        v-model="ticket.merk"
        required
      />
      <input
        type="text"
        id="inputJenis"
        placeholder="jenis"
        v-model="ticket.jenis"
        required
      />
      <input
        type="text"
        id="inputAsal"
        placeholder="asal"
        v-model="ticket.asal"
        required
      />
      <input
        type="text"
        id="inputTujuan"
        placeholder="tujuan"
        v-model="ticket.tujuan"
        required
      />
      <input
        type="number"
        id="inputWA"
        placeholder="waktu asal"
        v-model="ticket.waktuasal"
        required
      />
      <input
        type="number"
        id="inputWT"
        placeholder="waktu tujuan"
        v-model="ticket.waktutujuan"
        required
      />
      <input
        type="number"
        id="inputHarga"
        placeholder="harga tiket"
        v-model="ticket.harga"
        required
      />
      <input
        type="number"
        id="inputJumlah"
        placeholder="jumlah"
        v-model="ticket.jumlah"
        required
      />
      <button v-on:click="editTicket">Edit Ticket</button>
      <button v-on:click="deleteTicket">Delete Ticket</button>
    </div>
    <div v-else-if="ticket != 0">
      <h3>{{ ticket.id }} | By: {{ ticket.username }}</h3>
      <p>Merk: {{ ticket.merk }} | Jenis: {{ ticket.jenis }}</p>
      <p>Destinasi: {{ ticket.asal }}-{{ ticket.tujuan }}</p>
      <p>Waktu: {{ ticket.waktuasal }}-{{ ticket.waktutujuan }}</p>
      <p>Harga:{{ ticket.harga }}</p>
      <p>Jumlah: {{ ticket.jumlah }}</p>
    </div>
    <div v-else>
      <p>Ticket not found!</p>
    </div>
    <button @click="$router.go(-1)">Back</button>
  </div>
</template>

<script>
import { server } from "../utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      ticket: 0,
      response: 0,
      loginInfo: null,
    };
  },
  mounted() {
    this.getTicket();
    this.getLoginInfo();
  },
  methods: {
    async getTicket() {
      await axios
        .get(`${server.baseURL}/tickets/${this.id}`)
        .then((response) => (this.ticket = response.data));
    },
    async editTicket() {
      await axios
        .put(`${server.baseURL}/tickets/${this.id}`, this.ticket)
        .then((response) => (this.response = response.data));
    },
    async deleteTicket() {
      await axios
        .delete(`${server.baseURL}/tickets/${this.id}`)
        .then((response) => (this.response = response.data));

      this.ticket = 0;
    },
    async getLoginInfo() {
      this.loginInfo = JSON.parse(sessionStorage.getItem("logininfo"));
    },
  },
};
</script>
