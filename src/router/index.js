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
import Drive from '@/views/user/Drive'
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
    path: '/stats',
    name: 'user-view',
    component: UserView,
    meta: {
      onlyAuthUser: true
    },
  },
  {
    path: '/admin',
    name: 'admin-view',
    component: AdminView,
    meta: {
      onlyAdminUser: true
    }
  },
  {
    path: '/drive/code',
    name: 'drive-code',
    component: Drive
  },
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
  let adminUser = false

  if(store.state.user) {
    const userRoles = store.state.user.roles
    adminUser = userRoles.filter(role => role.name === 'admin' ? true : false)
    if(adminUser.length > 0) {
      adminUser = true
    } else {
      adminUser = false
    }
    
  } 


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
  } else if (to.meta.onlyAdminUser) {
    if (isUserLoggedIn) {
      if(adminUser) {
        next()
      } else {
        console.log()
        next({
          name: 'projects'
        })
      }
    }
  }
})



export default router