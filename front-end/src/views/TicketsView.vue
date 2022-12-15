<template>
  <div>
    <div class="about">
      <h1>Daftar Tiket</h1>
      <router-link :to="{ name: 'addticket' }">Add Ticket</router-link>
    </div>
    <div>
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
          Waktu: {{ ticket.waktuasal }}-
          {{ ticket.waktutujuan }}
        </p>
        <p>Harga: {{ ticket.harga }}</p>
        <p>Jumlah: {{ ticket.jumlah }}</p>
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
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getTickets();
  },
  methods: {
    async getTickets() {
      await axios
        .get(`${server.baseURL}/tickets`)
        .then((response) => (this.tickets = response.data));
      this.filteredTickets = [];
      for (let i = 0; i < this.tickets.length; i++) {
        this.filteredTickets.push(this.tickets[i]);
      }
    },
    async filterTickets() {
      // Clear array
      this.filteredTickets = [];
      // get filter element from document
      for (let i = 0; i < this.tickets.length; i++) {
        console.log(this.tickets[i]);
        if (this.tickets[i].username == "admin" /*cek filter*/) {
          this.filteredTickets.push(this.tickets[i]);
        }
      }
    },
  },
};
</script>
