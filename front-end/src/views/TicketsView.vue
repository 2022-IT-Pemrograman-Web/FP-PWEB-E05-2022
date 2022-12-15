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
            <a class="nav-link active" aria-current="page" href="/tickets">Tickets</a>
            <a class="nav-link" href="/login">Login</a>
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

  <div>
    <div class="about">
      <h1>Daftar Tiket</h1>
      <router-link :to="{ name: 'addticket' }">Add Ticket</router-link>
    </div>
    <h2>Items in cart:</h2>
    <div v-for="item in carts" :key="item">
      <h3>
        {{ item.id }}: {{ item.jenis }} --- {{ item.merk }} (Jumlah:
        {{ item.amount }})
      </h3>
    </div>
    <h1>Search:</h1>
    <form id="ticketFilter" @submit="filterTickets">
      Nama Penjual:<input
        type="text"
        id="inputNama"
        placeholder="nama penjual"
      /><br />
      Jenis Kendaraan:<input
        type="text"
        id="inputJenis"
        placeholder="jenis"
      /><br />
      Tempat Asal:<input type="text" id="inputAsal" placeholder="asal" /><br />
      Tempat Tujuan:<input
        type="text"
        id="inputTujuan"
        placeholder="tujuan"
      /><br />
      Harga Minimum:<input
        type="number"
        id="inputHargaMin"
        placeholder="harga tiket minimum"
      /><br />
      Harga Maximum:<input
        type="number"
        id="inputHargaMax"
        placeholder="harga tiket maximum"
      /><br />
      <input type="submit" Value="Filter Tickets" />
    </form>
    <div>
      <hr />
      <div v-for="ticket in filteredTickets" :key="ticket.id">
        <div>
          <router-link
            :to="{ name: 'detailticket', params: { id: ticket.id } }"
          >
            <h3>{{ ticket.id }} | By: {{ ticket.username }}</h3>
          </router-link>
        </div>
        <p>Merk: {{ ticket.merk }} | Jenis: {{ ticket.jenis }}</p>
        <p>Destinasi: {{ ticket.asal }}-{{ ticket.tujuan }}</p>
        <p>
          Waktu: {{ ticket.readableWaktuasal }}-
          {{ ticket.readableWaktutujuan }}
        </p>
        <p>Harga: {{ ticket.harga }}</p>
        <p>Jumlah: {{ ticket.jumlah }}</p>
        <button @click="incAmount(ticket)">+</button>
        <p>{{ ticket.amount }}</p>
        <button @click="decAmount(ticket)">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from "../utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      tickets: "",
      filteredTickets: [],
      carts: {},
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getTickets();
  },
  methods: {
    async getTickets() {
      if (JSON.parse(sessionStorage.getItem("cart")))
        this.carts = JSON.parse(sessionStorage.getItem("cart"));
      await axios
        .get(`${server.baseURL}/tickets`)
        .then((response) => (this.tickets = response.data));
      this.filteredTickets = [];
      for (let i = 0; i < this.tickets.length; i++) {
        this.tickets[i].readableWaktuasal = new Date(
          parseInt(this.tickets[i].waktuasal)
        );
        this.tickets[i].readableWaktutujuan = new Date(
          parseInt(this.tickets[i].waktutujuan)
        );
        if (this.carts) {
          if (
            this.carts[this.tickets[i].id] &&
            this.carts[this.tickets[i].id].amount <= this.tickets[i].jumlah
          )
            this.tickets[i].amount = this.carts[this.tickets[i].id].amount;
          else this.tickets[i].amount = 0;
        } else this.tickets[i].amount = 0;
        this.filteredTickets.push(this.tickets[i]);
      }
    },
    async filterTickets(e) {
      e.preventDefault();
      // Clear array
      this.filteredTickets = [];
      // get document values
      const inputNama = document.getElementById("inputNama").value;
      const inputJenis = document.getElementById("inputJenis").value;
      const inputAsal = document.getElementById("inputAsal").value;
      const inputTujuan = document.getElementById("inputTujuan").value;
      const inputHargaMin = document.getElementById("inputHargaMin").value;
      const inputHargaMax = document.getElementById("inputHargaMax").value;
      for (let i = 0; i < this.tickets.length; i++) {
        let bool = true;
        if (
          !this.tickets[i].username
            .toLowerCase()
            .includes(inputNama.toLowerCase()) &&
          inputNama != ""
        )
          bool = false;
        if (
          !this.tickets[i].jenis
            .toLowerCase()
            .includes(inputJenis.toLowerCase()) &&
          inputJenis != ""
        )
          bool = false;
        if (
          !this.tickets[i].asal
            .toLowerCase()
            .includes(inputAsal.toLowerCase()) &&
          inputAsal != ""
        )
          bool = false;
        if (
          !this.tickets[i].tujuan
            .toLowerCase()
            .includes(inputTujuan.toLowerCase()) &&
          inputTujuan != ""
        )
          bool = false;
        if (this.tickets[i].harga < inputHargaMin && inputHargaMin != "")
          bool = false;
        if (this.tickets[i].harga > inputHargaMax && inputHargaMax != "")
          bool = false;
        if (bool) {
          this.tickets[i].readableWaktuasal = new Date(
            parseInt(this.tickets[i].waktuasal)
          );
          this.tickets[i].readableWaktutujuan = new Date(
            parseInt(this.tickets[i].waktutujuan)
          );
          this.filteredTickets.push(this.tickets[i]);
        }
      }
    },
    async incAmount(ticket) {
      if (ticket.amount < ticket.jumlah) ticket.amount += 1;
      if (!this.carts[ticket.id]) this.carts[ticket.id] = {};
      this.carts[ticket.id].id = ticket.id;
      this.carts[ticket.id].jenis = ticket.jenis;
      this.carts[ticket.id].merk = ticket.merk;
      this.carts[ticket.id].amount = ticket.amount;
      await this.saveCart();
    },
    async decAmount(ticket) {
      if (ticket.amount > 0) ticket.amount -= 1;
      if (!this.carts[ticket.id]) this.carts[ticket.id] = {};
      this.carts[ticket.id].id = ticket.id;
      this.carts[ticket.id].jenis = ticket.jenis;
      this.carts[ticket.id].merk = ticket.merk;
      this.carts[ticket.id].amount = ticket.amount;
      if (this.carts[ticket.id].amount == 0) delete this.carts[ticket.id];
      await this.saveCart();
    },
    async saveCart() {
      await sessionStorage.setItem("cart", JSON.stringify(this.carts));
    },
  },
};
</script>
