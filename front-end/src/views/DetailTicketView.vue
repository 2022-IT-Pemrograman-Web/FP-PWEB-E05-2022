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
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Pricing</a>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="detail">
    <h1>Detail</h1>
    <div v-if="response != 0">{{ this.response }}</div>
    <div v-if="ticket != 0 && loginInfo != null && ticket.user == loginInfo.id">
      Merk:<input
        type="text"
        id="inputMerk"
        placeholder="merk"
        v-model="ticket.merk"
        required
      /><br />
      Jenis Kendaraan:<input
        type="text"
        id="inputJenis"
        placeholder="jenis"
        v-model="ticket.jenis"
        required
      /><br />
      Tempat Asal:<input
        type="text"
        id="inputAsal"
        placeholder="asal"
        v-model="ticket.asal"
        required
      /><br />
      Tempat Tujuan:<input
        type="text"
        id="inputTujuan"
        placeholder="tujuan"
        v-model="ticket.tujuan"
        required
      /><br />
      Waktu Berangkat (timestamp):<input
        type="number"
        id="inputWA"
        placeholder="waktu asal"
        v-model="ticket.waktuasal"
        required
      /><br />
      Waktu Datang (timestamp):<input
        type="number"
        id="inputWT"
        placeholder="waktu tujuan"
        v-model="ticket.waktutujuan"
        required
      /><br />
      Harga:<input
        type="number"
        id="inputHarga"
        placeholder="harga tiket"
        v-model="ticket.harga"
        required
      /><br />
      Jumlah Sisa Tiket:<input
        type="number"
        id="inputJumlah"
        placeholder="jumlah"
        v-model="ticket.jumlah"
        required
      /><br />
      <button v-on:click="editTicket">Edit Ticket</button>
      <button v-on:click="deleteTicket">Delete Ticket</button>
    </div>
    <div v-else-if="ticket != 0">
      <h3>{{ ticket.id }} | By: {{ ticket.username }}</h3>
      <h4>Merk: {{ ticket.merk }} | Jenis: {{ ticket.jenis }}</h4>
      <h5>Destinasi: {{ ticket.asal }}-{{ ticket.tujuan }}</h5>
      <h5>
        Waktu: {{ ticket.readableWaktuasal }}-{{ ticket.readableWaktutujuan }}
      </h5>
      <h4>Harga: {{ ticket.harga }}</h4>
      <h5>Jumlah: {{ ticket.jumlah }}</h5>
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
      this.ticket.readableWaktuasal = new Date(parseInt(this.ticket.waktuasal));
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
