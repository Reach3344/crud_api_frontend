<template>
  <div>
    <!-- Show navbar only for authenticated pages -->
    <div v-if="isAuthenticated" class="app-layout">
      <nav class="app-navbar">
        <router-link to="/students" class="nav-brand">
          <div class="brand-icon">S</div>
          <span>Student Manager</span>
        </router-link>

        <div class="nav-links">
          <router-link to="/students">Students</router-link>
          <router-link to="/create">Add Student</router-link>
          <button class="btn-logout" @click="handleLogout">Logout</button>
        </div>
      </nav>

      <main class="app-main">
        <router-view />
      </main>
    </div>

    <!-- Auth pages (no navbar) -->
    <div v-else>
      <router-view />
    </div>

    <!-- Toast notifications -->
    <ToastNotification />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import ToastNotification from "./components/ToastNotification.vue";
import { useToast } from "./composables/useToast";

const router = useRouter();
const { success } = useToast();

const isAuthenticated = computed(() => {
  return !!localStorage.getItem("token");
});

const handleLogout = () => {
  localStorage.removeItem("token");
  success("Logged out successfully");
  setTimeout(() => router.push("/login"), 300);
};
</script>
