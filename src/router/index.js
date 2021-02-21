import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ProjectCreate from '@/views/projects/Create'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/projects/create',
    name: 'project-create',
    component: ProjectCreate,
    meta: {
      onlyAuthUser: true
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '*',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.state.isUserLoggedIn

  if (to.meta.onlyAuthUser) {
    if (isUserLoggedIn) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else if (to.meta.onlyGuestUser) {
    if (isUserLoggedIn) {
      next({
        name: 'home'
      })
    } else {
      next()
    }
  }
})


export default router