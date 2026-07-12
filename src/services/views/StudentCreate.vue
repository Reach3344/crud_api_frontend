<template>
  <div class="content-card">
    <div class="card-header">
      <h3>Add Student</h3>
      <div class="header-actions">
        <router-link to="/students" class="btn btn-ghost btn-sm">
          &larr; Back
        </router-link>
      </div>
    </div>

    <div class="card-body">
      <form @submit.prevent="saveStudent">
        <div class="form-group">
          <label>Full Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            placeholder="Enter student name"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            placeholder="Enter email address"
            required
          />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="student.phone"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div class="form-group">
          <label>Gender</label>
          <select class="form-control" v-model="student.gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label>Address</label>
          <textarea
            class="form-control"
            v-model="student.address"
            rows="3"
            placeholder="Enter full address"
            required
          ></textarea>
        </div>

        <div class="card-footer-plain">
          <router-link to="/students" class="btn btn-secondary">Cancel</router-link>
          <button type="submit" class="btn btn-primary" :disabled="saving">
            <span v-if="saving" class="spinner-sm"></span>
            <span v-else>Save Student</span>
          </button>
        </div>
      </form>
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

const saving = ref(false);

const student = reactive({
  name: "",
  email: "",
  phone: "",
  gender: "",
  address: "",
});

const saveStudent = async () => {
  saving.value = true;
  try {
    await api.post("/students", student);
    success("Student created successfully!");
    router.push("/students");
  } catch (err) {
    console.error(err);
    error(err?.response?.data?.message || "Failed to create student");
  } finally {
    saving.value = false;
  }
};
</script>