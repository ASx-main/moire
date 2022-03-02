import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    path: '/',
    component: () => import('@/pages/Main.vue'),
  },
  {
    name: 'ProductDetail',
    path: '/product-detail/:id',
    component: () => import('@/pages/ProductDetail.vue'),
  },
  {
    name: 'basket',
    path: '/basket',
    component: () => import('@/pages/Basket.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
