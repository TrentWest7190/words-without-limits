<template>
  <section class="container">
    <button v-on:click="startRoom">Start Room</button>
    <label>
      Name
      <input
        v-model="playerName"
      >
    </label>
    <label>
      Join Room
      <input 
        v-model="joinCode" 
        v-on:keyup.enter="joinRoom" 
        maxLength=4 
        class="caps-input"
      >
    </label>
    <ul>
      <li v-for="room in rooms" :key="room.roomCode">
        {{ room.roomCode }}
        <ul v-for="player in room.players" :key="player.socketid">
          <li>{{ player }}</li>
        </ul>
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
    let { data } = await axios.get('/api/rooms')
    return { rooms: data }
  },

  data () {
    return {
      socket,
      joinCode: '',
      playerName: ''
    }
  },

  beforeCreate () {
    const roomParams = Cookies.getJSON('roomParams')
    if (roomParams) {
      this.$router.replace({
        name: 'game',
        params: roomParams
      })
    }
  },

  created () {
    this.socket.on('updateRooms', (rooms) => {
      this.rooms = rooms
    })
  },

  methods: {
    startRoom () {
      if (this.playerName.length !== 0) {
        this.socket.emit('startRoom', this.playerName, (room) => {
          const params = {
            roomCode: room.roomCode,
            playerName: this.playerName,
            players: room.players,
            king: true
          }
          Cookies.set('roomParams', params)
          this.$router.push({
            name: 'game',
            params
          })
        })
      } else {
        alert('Please enter a name!')
      }
    },

    joinRoom () {
      if (this.playerName.length !== 0) {
        const upperCode = this.joinCode.toUpperCase()
        if (this.rooms.find((room) => room.roomCode === upperCode)) {
          this.socket.emit('joinRoom', upperCode, this.playerName, (room) => {
            const params = {
              roomCode: room.roomCode,
              playerName: this.playerName,
              players: room.players
            }
            Cookies.set('roomParams', params)
            this.$router.push({
              name: 'game',
              params
            })
          })
        } else {
          alert('Invalid room code!')
        }
      } else {
        alert('Please enter a name!')
      }
    }
  }
}
</script>

<style scoped>
.caps-input {
  text-transform: uppercase
}
</style>
