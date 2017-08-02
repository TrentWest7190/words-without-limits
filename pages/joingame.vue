<template>
  <section class="container">
    <input v-model="playerName" placeholder="Enter a name for yourself">
    <input v-model="roomCode" placeholder="Enter the room code here">
    <input v-model="password" placeholder="Enter a password, if the room has one" type="password">
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
      roomCode: this.$route.query.roomCode || '',
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

      const upperCode = this.roomCode.toUpperCase()
      this.socket.emit('joinRoom', upperCode, this.playerName, this.password, (roomCode) => {
        if (roomCode === 0) {
          alert('Invalid room code!')
        } else if (roomCode === 1) {
          alert('Incorrect password!')
        } else {
          Cookies.set('roomCode', roomCode)

          this.$router.push({
            name: 'game',
            params: {
              roomCode
            }
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
  text-transform: uppercase;
}

button {
  width: 200px;
  height: 75px;
  margin: 0px auto;
}
</style>