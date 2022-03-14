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
  {
    name: 'ordering',
    path: '/ordering',
    component: () => import('@/pages/Ordering.vue'),
  },
  {
    name: 'orderingInfo',
    path: '/orderingInfo/:id',
    component: () => import('@/pages/OrderingInfo.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
