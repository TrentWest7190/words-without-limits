<template>
  <section class="container">
    <input v-model="playerName" placeholder="Enter a name for yourself">
    <input v-model="roomCode" placeholder="Enter the room code here">
    <input v-model="password" placeholder="Enter a password, if the room has one">
    <button v-on:click="joinRoom">Join Game!</button>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'
import Cookies from '~/plugins/js-cookie'

export default {
  data () {
    return {
      playerName: '',
      roomCode: '',
      password: '',
      socket
    }
  },

  methods: {
    joinRoom () {
      if (this.playerName.length === 0) {
        alert('Please enter a name!')
        return
      }

      const upperCode = this.joinCode.toUpperCase()
      this.socket.emit('joinRoom', upperCode, this.playerName, this.password, (room) => {
        if (room === 0) {
          alert('Invalid room code!')
        } else if (room === 1) {
          alert('Incorrect password!')
        } else {
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
        }
      })
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 10%;
}

input {
  font-size: 22px;
}

button {
  width: 200px;
  height: 75px;
  margin: 0px auto;
}
</style>