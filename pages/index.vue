<template>
  <section class="container">
    <button v-on:click="startRoom">Start Room</button>
    <ul>
      <li v-for="room in rooms" :key="room">{{ room }}</li>
    </ul>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/rooms')
    return { rooms: data }
  },

  data () {
    return {
      socket
    }
  },

  created () {
    this.socket.on('roomStarted', (rooms) => {
      this.rooms = rooms
    })
  },

  methods: {
    startRoom () {
      this.socket.emit('startRoom', (roomCode) => {
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
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
