import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import Home  from '@/components/Home'
import About from '@/components/About'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
