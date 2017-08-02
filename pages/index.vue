<template>
  <section class="container">
    <div v-on:click="nav('/startgame')">
      <span>Start A New Game</span>
    </div>
    <div v-on:click="nav('/joingame')">
      <span>Join An Existing Game</span>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import socket from '~/plugins/socket.io'

export default {
  async asyncData (context) {
    const playerRoomData = await axios.get('/api/rooms?socketid=' + socket.id).data

    if (playerRoomData) {
      context.redirect('game')
    }
  },

  mounted () {
    if (this.roomDisconnected) {
      alert('The room you were in no longer exists!')
    }
  },

  methods: {
    nav (loc) {
      this.$router.push(loc)
    }
  }
}
</script>

<style scoped>
.container {
  flex-direction: row;
}

div {
  width: 50%;
  text-align: center;
  cursor: pointer;
}

div:hover {
  background-color: red;
}

span {
  font-size: 50px;
  user-select: none;
}
</style>
