import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import {UserStore} from '@/stores/userStore';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ProductManagement',
    name: 'ProductManagement',
    component: () => import('@/views/ProductManagement.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/UserManagement',
    name: 'UserManagement',
    component: () => import('@/views/UserManagement.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/OrderManagement',
    name: 'OrderManagement',
    component: () => import('@/views/OrderManagement.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),   
    meta: { requiresAuth: true } 
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/logout.vue'),   
    meta: { requiresAuth: true } 
  },
  {
    path: '/profile/:id',
    name: 'ProfileEdit',
    component: () => import('@/views/ProfileEdit.vue'),   
    meta: { requiresAuth: true } 
  },
  {
    path: '/product',
    name: 'ProductEdit',
    component: () => import('@/views/ProductEdit.vue'),
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import('@/views/RegisterUser.vue'),   
    meta: { requiresAuth: true } 
  },
  {
    path: '/productdetail/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),   
    meta: { requiresAuth: true } 
  },

  {
    path: '/:pathMatch(.*)', // Regex để bắt mọi đường dẫn không khớp
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue') // Trang 404
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Yêu cầu xác thực các route quan trọng
router.beforeEach((to, from,next) => {
  const userStore = UserStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!userStore.isLoggedIn) {
          next({ name: 'Login' });
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router;
