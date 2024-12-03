import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/:option',
    component: {
      template: '',
      computed: {
        option() {
          return this.$route.params.option.charAt(0).toUpperCase() + this.$route.params.option.slice(1);
        }
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
