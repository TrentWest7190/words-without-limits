<template>
  <section class="container">
    <div>Welcome to room {{ roomCode }}</div>
    <button v-if="king" v-on:click="closeRoom">Disband Room</button>
    <button v-else v-on:click="leaveRoom">Leave Room</button>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'

export default {
  asyncData (context) {
    if (!context.params.roomCode) {
      context.redirect('/')
    }
    return {
      king: context.params.king,
      roomCode: context.params.roomCode,
      playerName: context.params.playerName,
      players: context.params.players
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
      this.socket.emit('closeRoom', this.roomCode, () => {
        this.$router.push('/')
      })
    },

    leaveRoom () {
      this.socket.emit('leaveRoom', this.roomCode, () => {
        this.$router.push('/')
      })
    }
  }
}
</script>