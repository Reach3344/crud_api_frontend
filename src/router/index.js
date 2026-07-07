import { createRouter, createWebHistory } from "vue-router";

import StudentList from "../services/views/StudentList.vue";
import StudentCreate from "../services/views/StudentCreate.vue";
import StudentEdit from "../services/views/StudentEdit.vue";
import Login from "../services/views/Login.vue";
import Register from "../services/views/Register.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
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
    path: "/students",
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

// Navigation guard — protect routes that require authentication
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem("token");

  if (authRequired && !token) {
    return next("/login");
  }

  next();
});

export default router;