import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/:group',
    component: '',
    children: [
      {
        path: ':option',
        component: () => import('./views/DynamicView.vue'),
      }
    ],
  },
  {
    path: '/',
    redirect: '/group-1',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
