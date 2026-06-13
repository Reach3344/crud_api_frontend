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
});

const loadStudent = async () => {
  const response = await api.get(`/students/${route.params.id}`);
  Object.assign(student, response.data);
};

const updateStudent = async () => {
  await api.put(`/students/${route.params.id}`, student);
  alert("Student updated successfully!");
  router.push("/");
};

onMounted(() => {
  loadStudent();
});
</script>