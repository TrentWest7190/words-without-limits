import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import StartGame from '@/components/StartGame'
import JoinGame from '@/components/JoinGame'
import Lobby from '@/components/Lobby'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/joingame',
      name: 'JoinGame',
      component: JoinGame
    },
    {
      path: '/game/:lobbyCode',
      name: 'Lobby',
      component: Lobby
    }
  ]
})

export default router
