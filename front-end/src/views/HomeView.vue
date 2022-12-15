<template>
  <div class="body" title="Main Image TIC-COM">
    <div class="margin">
      <div class="container">
        <h1>TIC-COM</h1>
        <h2>Solusi permasalahan anda dalam booking tiket transportasi</h2>
        <router-link to="/tickets"><button>Lihat Tickets</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/kendaraan.jpg");
}
.container {
  padding: 20px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 55%;
  color: rgb(255, 255, 255);
  background: rgba(199, 138, 58, 0.5);
  border-radius: 5px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
}
.margin {
  margin-top: 120px;
}
</style>
