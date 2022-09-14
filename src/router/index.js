import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '',
        component: () => import('../views/Manage.vue'),
        redirect: "/home",
        children: [
            {
                path: '/user',
                name: '用户管理',
                component: () => import('@/views/User.vue'),
            },
            {
                path: '/home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: '/sports',
                name: '场馆管理',
                component: () => import('@/views/Sports.vue'),
            },
            {
                path: '/news',
                name: '新闻主页',
                component: () => import('@/views/News.vue'),
            },
            {
                path: '/personal',
                name: '个人中心',
                component: () => import('@/views/Personal.vue'),
            },
            {
                path: '/book',
                name: '场馆预约',
                component: () => import('@/views/Book.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
