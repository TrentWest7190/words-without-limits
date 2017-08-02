<template>
  <section class="container">
    <input v-model="playerName" placeholder="Enter a name for yourself">
    <input v-model="password" placeholder="Enter a password for the room, if you want">
    <button v-on:click="startRoom">Open Room!</button>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'
import Cookies from '~/plugins/js-cookie'

export default {
  data () {
    return {
      playerName: '',
      password: '',
      socket
    }
  },

  methods: {
    startRoom () {
      if (this.playerName.length === 0) {
        alert('Please enter a name!')
        return
      }

      this.socket.emit('startRoom', this.playerName, this.password, (roomCode) => {
        Cookies.set('roomCode', roomCode)
        Cookies.set('king', true)
        this.$router.push({
          name: 'game',
          params: {
            roomCode
          }
        })
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