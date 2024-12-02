import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import DynamicView from './views/DynamicView.vue';

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/:option',
    component: DynamicView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
