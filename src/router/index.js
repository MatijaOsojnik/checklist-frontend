import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Verify from '@/views/Verify'
import ProjectCreate from '@/views/projects/Create'
import ProjectView from '@/views/projects/View'
import ProjectStats from '@/views/projects/Statistics'
import AdminView from '@/views/admin/View'
import UserView from '@/views/user/View'
import Invite from '@/views/projects/Invite'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'projects'
    },
  },
  {
    path: '/projects',
    name: 'projects',
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
    path: '/verify/:verificationCode',
    name: 'verify',
    component: Verify,
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
  {
    path: '/projects/:id',
    name: 'project-single',
    component: ProjectView,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/projects/:id/stats',
    name: 'project-single-stats',
    component: ProjectStats,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/projects/invite/:inviteCode',
    name: 'invite',
    component: Invite,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/admin',
    name: 'admin-view',
    component: AdminView,
    meta: {
      onlyAuthUser: true
    }
  },
  {
    path: '/stats',
    name: 'user-view',
    component: UserView,
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
        name: 'projects'
      })
    } else {
      next()
    }
  }
})



export default router