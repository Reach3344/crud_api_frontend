<template>
  <div class="content-card">
    <div class="card-header">
      <h3>
        <span>Students</span>
        <span v-if="students.length" class="badge badge-primary">{{ students.length }}</span>
      </h3>
      <div class="header-actions">
        <router-link to="/create" class="btn btn-primary btn-sm">
          + Add Student
        </router-link>
      </div>
    </div>

    <div class="card-body">
      <!-- Table -->
      <div v-if="students.length" class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in students" :key="item.id">
              <td data-label="ID">{{ item.id }}</td>
              <td data-label="Name">{{ item.name }}</td>
              <td data-label="Email">{{ item.email }}</td>
              <td data-label="Phone">{{ item.phone }}</td>
              <td data-label="Gender">
                <span class="badge" :class="'badge-' + genderClass(item.gender)">{{ item.gender }}</span>
              </td>
              <td data-label="Address" class="truncate" :title="item.address">{{ item.address }}</td>
              <td data-label="Actions">
                <div class="actions">
                  <button class="btn btn-info btn-sm" @click="viewStudent(item)" title="View details">
                    View
                  </button>
                  <router-link :to="'/edit/' + item.id" class="btn btn-warning btn-sm" title="Edit student">
                    Edit
                  </router-link>
                  <button class="btn btn-danger btn-sm" @click="confirmDelete(item)" title="Delete student">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-else class="empty-state">
        <span class="empty-icon">📚</span>
        <h4>No students yet</h4>
        <p>Get started by adding your first student to the system.</p>
        <router-link to="/create" class="btn btn-primary btn-sm">+ Add Student</router-link>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="selected" class="modal-overlay" @click.self="selected = null">
      <div class="modal-box">
        <div class="modal-header">
          <h4>Student Details</h4>
          <button class="close-btn" @click="selected = null">&times;</button>
        </div>
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
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" @click="selected = null">Close</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleting" class="modal-overlay" @click.self="deleting = null">
      <div class="modal-box">
        <div class="modal-header">
          <h4>Confirm Delete</h4>
          <button class="close-btn" @click="deleting = null">&times;</button>
        </div>
        <div class="modal-body">
          <div class="confirm-body">
            <span class="confirm-icon">⚠️</span>
            <h4>Delete Student?</h4>
            <p>Are you sure you want to delete <strong>{{ deleting.name }}</strong>? This action cannot be undone.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" @click="deleting = null">Cancel</button>
          <button class="btn btn-danger btn-sm" @click="executeDelete">
            <span v-if="deletingLoading" class="spinner-sm"></span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading-container card-body">
      <div class="spinner"></div>
      <p>Loading students...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import { useToast } from "../../composables/useToast";

const { success, error } = useToast();

const students = ref([]);
const selected = ref(null);
const deleting = ref(null);
const deletingLoading = ref(false);
const loading = ref(true);

const loadStudents = async () => {
  loading.value = true;
  try {
    const res = await api.get("/students");
    students.value = res.data.data || res.data;
  } catch (err) {
    console.log(err);
    error("Failed to load students");
  } finally {
    loading.value = false;
  }
};

const genderClass = (gender) => {
  const map = { Male: "info", Female: "success", Other: "secondary" };
  return map[gender] || "secondary";
};

const viewStudent = (item) => {
  selected.value = item;
};

const confirmDelete = (item) => {
  deleting.value = item;
};

const executeDelete = async () => {
  if (!deleting.value) return;
  deletingLoading.value = true;
  try {
    await api.delete(`/students/${deleting.value.id}`);
    success(`Deleted ${deleting.value.name} successfully`);
    deleting.value = null;
    loadStudents();
  } catch (err) {
    console.log(err);
    error("Failed to delete student");
  } finally {
    deletingLoading.value = false;
  }
};

onMounted(() => {
  loadStudents();
});
</script>