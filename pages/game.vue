<template>
  <section class="container">
    <div>Welcome to room {{ roomCode }}</div>
    <button v-if="king" v-on:click="closeRoom">Disband Room</button>
    <button v-else v-on:click="leaveRoom">Leave Room</button>
    <span>Invite your friends with this link: https://words-without-limits.fun/joingame?roomCode={{ roomCode }}</span>
    <ul>
      <li v-for="player in players" :key="player.socketid">{{ player.playerName }}</li>
    </ul>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'
import axios from '~/plugins/axios'
import Cookies from '~/plugins/js-cookie'

export default {
  async asyncData (context) {
    const roomCode = context.isClient ? Cookies.get('roomCode') : context.req.cookies.roomCode
    const king = context.isClient ? Cookies.get('king') : context.req.cookies.king
    if (!roomCode) {
      context.redirect('/')
    }
    const { data } = await axios.get('/api/rooms/' + roomCode)
    if (data) {
      return {
        players: data.players,
        roomCode,
        king
      }
    } else {
      if (context.isClient) {
        Cookies.remove('roomCode')
        Cookies.remove('king')
        Cookies.set('roomDisconnected', true)
      } else {
        context.res.clearCookie('roomCode')
        context.res.clearCookie('king')
        context.res.cookie('roomDisconnected', true)
      }
      context.redirect('/')
    }
  },

  data () {
    return {
      king: false,
      socket
    }
  },

  created () {
    this.socket.on('roomClosed', () => {
      this.$router.push('/')
      alert('Room was disbanded!')
    })

    this.socket.on('updatePlayers', (players) => {
      this.players = players
    })
  },

  methods: {
    closeRoom () {
      Cookies.remove('roomCode')
      Cookies.remove('king')
      this.socket.emit('closeRoom', this.roomCode, () => {
        this.$router.push('/')
      })
    },

    leaveRoom () {
      Cookies.remove('roomCode')
      Cookies.remove('king')
      this.socket.emit('leaveRoom', this.roomCode, () => {
        this.$router.push('/')
      })
    }
  }
}
</script>