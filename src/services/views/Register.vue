<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="brand">
        <div class="logo-icon">S</div>
        <h1>Create Account</h1>
        <p>Get started with Student Manager</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Full Name</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input v-model="form.name" type="text" class="form-control" placeholder="Enter your name" required />
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <span class="input-icon">✉</span>
            <input v-model="form.email" type="email" class="form-control" placeholder="Enter your email" required />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input v-model="form.password" type="password" class="form-control" placeholder="Create a password" required />
          </div>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              v-model="form.password_confirmation"
              type="password"
              class="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner-sm"></span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <div class="auth-footer">
        Already have an account? <router-link to="/login">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";
import { useToast } from "../../composables/useToast";

const router = useRouter();
const { success, error } = useToast();

const loading = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleRegister = async () => {
  if (form.password !== form.password_confirmation) {
    error("Passwords do not match");
    return;
  }

  if (form.password.length < 6) {
    error("Password must be at least 6 characters");
    return;
  }

  loading.value = true;
  try {
    const response = await api.post("/register", form);
    localStorage.setItem("token", response.data.token || "");
    success("Registration successful!");
    router.push("/students");
  } catch (err) {
    error(err?.response?.data?.message || "Registration failed");
  } finally {
    loading.value = false;
  }
};
</script>