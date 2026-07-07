<template>
  <div class="card">
    <div class="card-header">
      <h3>Edit Student</h3>
    </div>

    <div class="card-body">
      <form @submit.prevent="updateStudent">
        <div class="mb-3">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
          />
        </div>

        <div class="mb-3">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
          />
        </div>

        <div class="mb-3">
          <label>Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="student.phone"
          />
        </div>

        <div class="mb-3">
          <label>Gender</label>
          <select class="form-control" v-model="student.gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="mb-3">
          <label>Address</label>
          <textarea
            class="form-control"
            v-model="student.address"
            rows="3"
          ></textarea>
        </div>

        <button class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/api";

const route = useRoute();
const router = useRouter();

const student = reactive({
  name: "",
  email: "",
  phone: "",
  gender: "",
  address: "",
});

const loadStudent = async () => {
  try {
    const response = await api.get(`/students/${route.params.id}`);
    Object.assign(student, response.data);
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message || "Failed to load student");
  }
};

const updateStudent = async () => {
  try {
    await api.put(`/students/${route.params.id}`, student);
    alert("Student updated successfully!");
    router.push("/students");
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message || "Failed to update student");
  }
};

onMounted(() => {
  loadStudent();
});
</script>