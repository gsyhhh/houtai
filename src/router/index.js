import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const UserList = () => import('@/views/UserList')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/home', component: () => import('@/views/Home') },
  {
    path: '/',
    component: Home,
    children: [{ path: 'userlist', component: UserList }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
