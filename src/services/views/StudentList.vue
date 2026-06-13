<template>
  <div>
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Category List</h2>

      <div>
        <router-link to="/create" class="btn btn-primary btn-sm me-2">
          + Add Category
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
          <th>Description</th>
          <th width="220">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in categories" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.dec }}</td>

          <td>
            <!-- VIEW -->
            <button
              class="btn btn-info btn-sm me-1"
              @click="viewCategory(item)"
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
              @click="deleteCategory(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- EMPTY -->
    <div v-if="categories.length === 0" class="alert alert-info">
      No categories found.
    </div>

    <!-- VIEW MODAL -->
    <div v-if="selected" class="modal-overlay">
      <div class="modal-box">
        <h4>Category Detail</h4>

        <p><b>ID:</b> {{ selected.id }}</p>
        <p><b>Name:</b> {{ selected.name }}</p>
        <p><b>Description:</b> {{ selected.dec }}</p>

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

// router
const router = useRouter();

// data
const categories = ref([]);
const selected = ref(null);

// LOAD DATA FROM BACKEND
const loadCategories = async () => {
  try {
    const res = await api.get("/categories");
    categories.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

// VIEW
const viewCategory = (item) => {
  selected.value = item;
};

// DELETE
const deleteCategory = async (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
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
  loadCategories();
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