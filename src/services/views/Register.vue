<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h2 class="mb-3">Register</h2>
          <p class="text-muted">Create a new account.</p>

          <form @submit.prevent="handleRegister">
            <!-- Name -->
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="form.password" type="password" class="form-control" required />
            </div>

            <!-- Confirm Password (IMPORTANT) -->
            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input
                v-model="form.password_confirmation"
                type="password"
                class="form-control"
                required
              />
            </div>

            <button class="btn btn-success w-100">Register</button>
          </form>

          <p class="mt-3 mb-0 text-center">
            Already have an account?
            <router-link to="/login">Login</router-link>
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
  name: "",
  email: "",
  password: "",
  password_confirmation: "", // ✅ ADD THIS
});

const handleRegister = async () => {
  // Client-side validation: check passwords match
  if (form.password !== form.password_confirmation) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await api.post("/register", form);

    // Save token from registration response so user is auto-logged in
    localStorage.setItem("token", response.data.token || "");

    alert("Registration successful!");

    // Redirect straight to students list (no need to login again)
    router.push("/students");
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message || "Registration failed");
  }
};
</script>