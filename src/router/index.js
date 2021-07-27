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
        children: [{
                path: '/ManageOfficer',
                name: 'ManageOfficer',
                component: () =>
                    import ('@/views/ManageOfficer')
            },
            {
                path: '/ManageService',
                name: 'ManageService',
                component: () =>
                    import ('@/views/ManageService')
            },
            {
                path: '/ManageAdmin',
                name: 'ManageAdmin',
                component: () =>
                    import ('@/views/ManageAdmin')
            },
            {
                path: '/ManageAllUser',
                name: 'ManageAllUser',
                component: () =>
                    import ('@/views/ManageAllUser')
            },
            {
                path: '/',
                name: 'Report',
                component: () =>
                    import ('@/views/AccidentReport')
            },
            {
                path: '/History',
                name: 'History',
                component: () =>
                    import ('@/views/IncidentHistory')
            },
            {
                path: '/ServiceHistory',
                name: 'ServiceHistory',
                component: () =>
                    import ('@/views/ServiceHistory')
            },
            {
                path: '/EditUser',
                name: 'EditUser',
                component: () =>
                    import ('@/views/EditUser')
            },
            {
                path: '/CreateUser',
                name: 'CreateUser',
                component: () =>
                    import ('@/views/CreateUser')
            },
            {
                path: '/AddService',
                name: 'AddService',
                component: () =>
                    import ('@/views/ListService')
            },
            {
                path: '/SendMessage',
                name: 'SendMessage',
                component: () =>
                    import ('@/views/SendMessage')
            }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router