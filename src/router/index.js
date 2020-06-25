import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/Login.vue')
const Home = () => import('../components/Home.vue')
const Welcome = () => import('../components/Welcome.vue')
const Users = () => import('../components/user/Users.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 访问权限控制
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenId = window.sessionStorage.getItem('tokenid')
  if (!tokenId) return next('/login')
  next()
})

export default router
