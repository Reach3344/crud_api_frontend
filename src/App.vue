<template>
  <div class="app-layout">
    <nav class="app-navbar">
      <router-link to="/students" class="nav-brand">
        <div class="brand-icon">S</div>
        <span>Student Manager</span>
      </router-link>

      <div class="nav-links">
        <router-link to="/students">Students</router-link>
        <router-link to="/create">Add Student</router-link>
      </div>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <ToastNotification />
  </div>
</template>

<script setup>
import ToastNotification from "./components/ToastNotification.vue";
</script>
