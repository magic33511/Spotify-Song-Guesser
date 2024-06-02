// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Callback from '../views/Callback.vue';
import Quiz from '../views/Quiz.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/callback', name: 'Callback', component: Callback },
  { path: '/quiz', name: 'Quiz', component: Quiz },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
