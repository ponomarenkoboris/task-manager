import { createRouter, createWebHistory } from "vue-router";
import TaskTracker from "../views/TaskTracker.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import EmptyLayout from '../layouts/EmptyLayout';

const routes = [
  {
    path: "/TaskTracker",
    name: "TaskTracker",
    component: TaskTracker
  },
  {
    path: '/welcomToAppTS/:action',
    name: 'EmptyLayout',
    component: EmptyLayout,
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: Login,
      },
      {
        path: "signup",
        name: "SignUp",
        component: Registration,
      },
    ]
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
