<template>
  <section class="container">
    <div>Welcome to room {{ roomCode }}</div>
    <button v-if="king" v-on:click="closeRoom">Disband Room</button>
    <button v-else v-on:click="leaveRoom">Leave Room</button>
    <span>Invite your friends with this link: https://words-without-limits.fun/joingame?roomCode={{ roomCode }}</span>
    <span>Players:</span>
    <ul>
      <li v-for="player in players" :key="player.socketid">
        {{ player.playerName }}
        <button v-if="king && !player.king" v-on:click="kickPlayer(player.socketid)">X</button>
      </li>
    </ul>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'
import axios from '~/plugins/axios'
import Cookies from '~/plugins/js-cookie'

export default {
  async asyncData (context) {
    const { data } = await axios.get('/api/rooms?socketid=' + socket.id)

    if (data) {
      return {
        players: data.players,
        roomCode: data.roomCode
      }
    } else {
      context.redirect('/')
    }
  },

  data () {
    return {
      king: false,
      players: [],
      roomCode: '',
      socket
    }
  },

  created () {
    this.socket.on('roomClosed', () => {
      this.$router.push('/')
      Cookies.remove('roomCode')
      Cookies.remove('king')
      alert('Room was disbanded!')
    })

    this.socket.on('kicked', () => {
      alert('Kicked from room!')
      this.leaveRoom()
    })

    this.socket.on('updatePlayers', (players) => {
      this.players = players
    })

    this.socket.on('reconnect', () => {
      console.log('I am reconnecting')
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
    },

    kickPlayer (socketid) {
      this.socket.emit('kickPlayer', socketid)
    }
  }
}
</script>