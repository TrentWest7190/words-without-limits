import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import StartGame from '@/components/StartGame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/startgame',
      name: 'StartGame',
      component: StartGame
    }
  ]
})
