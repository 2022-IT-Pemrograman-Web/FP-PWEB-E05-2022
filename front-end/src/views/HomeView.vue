<template>
  <!-- <div class="home">
    <h1>this is home page</h1>
  </div> -->
<!-- <div class="d-flex justify-content-center">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link" href="/tickets">Tickets</a>
          <a class="nav-link" href="/login">Login</a>
          <a class="nav-link" href="/register">Register</a>
        </div>
      </div>
    </div>
  </nav>
</div> -->

<div class="d-flex justify-content-center">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TIC-COM</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div v-if="loginInfo != null" class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="/tickets">Tickets</a>
            <a class="nav-link" @click="logout">Logout</a>
              <p>Welcome {{ loginInfo.username }}!</p>
          </div>

          <div v-else class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="/tickets">Tickets</a>
            <a class="nav-link" href="/login">Login</a>
            <a class="nav-link" href="/register">Register</a>
          </div>
        </div>
      </div>
    </nav>
  </div>

<br><br>

  <!-- <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div> -->

<div class="row">
  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>

  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>

  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>

  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>
</div>

<br><br>

<div class="row">
  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>

  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>

  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  </div>
  </div>

  <div class="col-lg-3 col-sm-6 col-12">
    <div class="card">
    <div class="card" style="width: 18rem;">
      <img src="https://picsum.photos/id/870/600/300" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
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
