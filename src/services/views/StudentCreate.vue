<template>
  <div class="card">
    <div class="card-header">
      <h3>Add Student</h3>
    </div>

    <div class="card-body">
      <form @submit.prevent="saveStudent">
        <div class="mb-3">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>

        <div class="mb-3">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            required
          />
        </div>

        <div class="mb-3">
          <label>Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="student.phone"
            required
          />
        </div>

        <button class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();

const student = reactive({
  name: "",
  email: "",
  phone: "",
});

const saveStudent = async () => {
  try {
    await api.post("/students", student);
    alert("Student created successfully!");
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>