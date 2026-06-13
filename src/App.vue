<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          Student CRUD
        </router-link>

        <div class="d-flex gap-2">
          <router-link class="btn btn-outline-light" to="/login">
            Login
          </router-link>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
</script>