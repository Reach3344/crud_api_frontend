<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h2 class="mb-3">Login</h2>

          <form @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="mb-3">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p class="mt-3 text-center">
            Don't have account?
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

    // save token
    localStorage.setItem("token", response.data.token || "");

    alert("Login successful");

    // ✅ GO TO STUDENT LIST PAGE
    router.push("/students");

  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.message || "Login failed");
  }
};
</script>