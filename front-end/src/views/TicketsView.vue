<template>
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
