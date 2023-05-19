import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../components/HomePage.vue';
import ProductList from '../components/ProductList.vue';
import ProductDetail from '../components/ProductDetail.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import AdminDashboard from '../components/AdminDashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'product-list',
    component: ProductList,
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetail,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// check if a route requires authentication by looking at the requiresAuth meta field. If the route does require authentication, it checks if the user is logged in. This check is done using a simple flag in local storage in this example, but in a real application I would probably want to use a more secure method of storing the user's authentication status.
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // This route requires auth, check if the user is logged in
    // For now, let's just use a simple flag in local storage
    if (!localStorage.getItem('token')) {
      // User is not logged in, redirect to login page
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      // User is logged in, allow access
      next();
    }
  } else {
    // This route doesn't require auth, always allow access
    next();
  }
});

export default router;
