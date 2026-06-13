<template>
  <div>
    <h2 class="mb-4">Student List</h2>

    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th width="180">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>
            <router-link
              :to="'/edit/' + student.id"
              class="btn btn-warning btn-sm me-2"
            >
              Edit
            </router-link>

            <button
              class="btn btn-danger btn-sm"
              @click="removeStudent(student.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="students.length === 0" class="alert alert-info">
      No students found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";

const students = ref([]);

const loadStudents = async () => {
  try {
    const response = await api.get("/students");
    students.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const removeStudent = async (id) => {
  if (confirm("Delete this student?")) {
    await api.delete(`/students/${id}`);
    loadStudents();
  }
};

onMounted(() => {
  loadStudents();
});
</script>