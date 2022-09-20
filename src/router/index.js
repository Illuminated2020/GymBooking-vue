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
                path: '/data',
                name: '预约数据',
                component: () => import('@/views/Data.vue'),
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
            {
                path: '/order',
                name: '预约管理',
                component: () => import('@/views/Order.vue'),
            },
            {
                path: '/chat',
                name: '聊天广场',
                component: () => import('@/views/Chat.vue'),
            },
            {
                path: '/markdown',
                name: '我来讲两句',
                component: () => import('@/views/MarkDown.vue'),
            },
            {
                path: '/mybook',
                name: '我的预约',
                component: () => import('@/views/Mybook.vue'),
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
