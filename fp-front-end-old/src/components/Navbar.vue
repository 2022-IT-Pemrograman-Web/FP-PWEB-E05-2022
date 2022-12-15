<template>
  <v-app-bar app color="#3853D8" dark>
    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-divider vertical class="ml-1 mr-3"></v-divider>
    <v-btn icon>
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title
      ><span class="caption">Select</span> <br />Category</v-toolbar-title
    > -->
    <v-btn icon>
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-divider vertical class="ml-5"></v-divider>
    <div
      style="
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      "
    >
      <h2>Tic-Com</h2>
    </div>

    <v-spacer></v-spacer>

    <!-- TOP RIGHT NAV MENU  -->
    <v-divider vertical class=""></v-divider>
    <!-- LOGO ACCOUNT -->
    <v-btn icon class="mx-1">
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
    <v-divider vertical class=""></v-divider>
    <!-- LOGO LIKED/SAVED -->
    <v-btn icon class="mx-1">
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>
    <v-divider vertical class=""></v-divider>
    <!-- LOGO KERANJANG -->
    <v-btn icon class="mx-1">
      <v-badge color="#94D0EF" content="0">
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.v-toolbar__title {
  font-size: 1rem !important;
}
.v-badge__badge {
  font-size: 10px !important;
  height: 18px !important;
  min-width: 18px !important;
}
</style>