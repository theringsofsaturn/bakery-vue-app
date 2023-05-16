import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../components/HomePage.vue';
import ProductList from '../components/ProductList.vue';
import ProductDetail from '../components/ProductDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
