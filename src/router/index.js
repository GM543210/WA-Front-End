import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/main-user',
    name: 'main-user',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Main-User.vue')
  },
  {
    path: '/enter-q',
    name: 'enter-q',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Enter-Q.vue')
  },
  {
    path: '/queued',
    name: 'queued',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Queued.vue')
  },
  {
    path: '/left-q',
    name: 'left-q',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Left-Q.vue')
  },
  {
    path: '/main-admin',
    name: 'main-admin',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Main-Admin.vue')
  },
  {
    path: '/manage-window',
    name: 'manage-window',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Manage-Window.vue')
  },
  {
    path: '/manage-institution',
    name: 'manage-institution',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Manage-Institution.vue')
  },
  {
    path: '/manage-q',
    name: 'manage-q',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Manage-Q.vue')
  },
  {
    path: '/window-closed',
    name: 'window-closed',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Window-Closed.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

