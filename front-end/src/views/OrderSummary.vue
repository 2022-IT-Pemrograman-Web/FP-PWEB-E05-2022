<template>
  <div>
    <!-- <div class="d-flex justify-content-end">
      <form style="width: 300px">
        <div class="d-flex justify-content-end">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </div>
      </form>
    </div> -->
    <div v-if="carts != null && Object.keys(carts).length !== 0">
      <div v-for="ticket in filteredTickets" :key="ticket.id">
        <div v-if="ticket.amount > 0">
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
    <div v-else>
      <div>
        <h1>Your cart is empty!</h1>
        <img src="../assets/emptycart.jpg" alt="empty cart" />
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
