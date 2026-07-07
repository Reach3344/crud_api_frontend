<template>
  <div>
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Student List</h2>

      <div>
        <router-link to="/create" class="btn btn-primary btn-sm me-2">
          + Add Student
        </router-link>

        <!-- LOGOUT -->
        <button class="btn btn-danger btn-sm" @click="logout">
          Logout
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Address</th>
          <th width="220">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in students" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.address }}</td>

          <td>
            <!-- VIEW -->
            <button
              class="btn btn-info btn-sm me-1"
              @click="viewStudent(item)"
            >
              View
            </button>

            <!-- EDIT -->
            <router-link
              :to="'/edit/' + item.id"
              class="btn btn-warning btn-sm me-1"
            >
              Edit
            </router-link>

            <!-- DELETE -->
            <button
              class="btn btn-danger btn-sm"
              @click="deleteStudent(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- EMPTY -->
    <div v-if="students.length === 0" class="alert alert-info">
      No students found.
    </div>

    <!-- VIEW MODAL -->
    <div v-if="selected" class="modal-overlay" @click.self="selected = null">
      <div class="modal-box">
        <h4>Student Detail</h4>

        <div class="modal-body">
          <div class="detail-row">
            <span class="label">ID:</span>
            <span class="value">{{ selected.id }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Name:</span>
            <span class="value">{{ selected.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">{{ selected.email }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Phone:</span>
            <span class="value">{{ selected.phone }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Gender:</span>
            <span class="value">{{ selected.gender }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Address:</span>
            <span class="value">{{ selected.address }}</span>
          </div>
        </div>

        <button class="btn btn-secondary btn-sm" @click="selected = null">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();

// data
const students = ref([]);
const selected = ref(null);

// LOAD DATA FROM BACKEND
const loadStudents = async () => {
  try {
    const res = await api.get("/students");
    students.value = res.data.data || res.data;
  } catch (err) {
    console.log(err);
  }
};

// VIEW
const viewStudent = (item) => {
  selected.value = item;
};

// DELETE
const deleteStudent = async (id) => {
  if (confirm("Are you sure you want to delete this student?")) {
    try {
      await api.delete(`/students/${id}`);
      loadStudents();
    } catch (err) {
      console.log(err);
    }
  }
};

// LOGOUT
const logout = () => {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    router.push("/login");
  }
};

// INIT
onMounted(() => {
  loadStudents();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
}
</style>