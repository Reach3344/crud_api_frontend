<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h2 class="mb-3">Login</h2>
          <p class="text-muted">Sign in to manage students.</p>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="form.password" type="password" class="form-control" required />
            </div>

            <button class="btn btn-primary w-100">Login</button>
          </form>

          <p class="mt-3 mb-0 text-center">
            Don’t have an account?
            <router-link to="/register">Register</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const response = await api.post("/login", form);
    localStorage.setItem("token", response.data.token || "");
    alert("Login successful");
    router.push("/");
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message || "Login failed");
  }
};
</script>
