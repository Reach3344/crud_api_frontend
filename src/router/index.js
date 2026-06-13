import { createRouter, createWebHistory } from "vue-router";

import StudentList from "../services/views/StudentList.vue";
import StudentCreate from "../services/views/StudentCreate.vue";
import StudentEdit from "../services/views/StudentEdit.vue";
import Login from "../services/views/Login.vue";
import Register from "../services/views/Register.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/",
    name: "students",
    component: StudentList,
  },
  {
    path: "/create",
    name: "create",
    component: StudentCreate,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: StudentEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;