import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Product.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: () => import('@/views/ProfileEdit.vue'),
    requiresAuth: true
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/logout.vue'),
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import('@/views/RegisterUser.vue'),
  },
  {
    path: '/order',
    name: 'Order', // Đổi tên thành 'Orders'
    component: () => import('@/views/Order.vue'),
  },
  ,
  {
    path: '/order/:id',
    name: 'OrderDetail',
    component: () => import('@/views/OrderDetail.vue'),
    props: true
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('@/views/ChangePassword.vue'),
  },
  // các route khác
  // Thêm route "catch-all" vào cuối danh sách
  {
    path: '/:pathMatch(.*)', // Regex để bắt mọi đường dẫn không khớp
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue') // Trang 404 hoặc một component khác
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
