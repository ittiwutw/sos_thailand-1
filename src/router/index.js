import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Homepage from '@/views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/Login', name: 'Login', component: Login },
  {
    path: '/',
    component: Homepage,
    children: [
      { path: '/', name: 'ManageOfficer', component: () => import('@/views/ManageOfficer') },
      { path: '/ManageService', name: 'ManageService', component: () => import('@/views/ManageService') },
      { path: '/ManageAdmin', name: 'ManageAdmin', component: () => import('@/views/ManageAdmin') },
      { path: '/Report', name: 'Report', component: () => import('@/views/AccidentReport') },
      { path: '/History', name: 'History', component: () => import('@/views/IncidentHistory') },
      { path: '/EditUser', name: 'EditUser', component: () => import('@/views/EditUser') },
      { path: '/CreateUser', name: 'CreateUser', component: () => import('@/views/CreateUser') }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
