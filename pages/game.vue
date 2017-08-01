<template>
  <section class="container">
    <div>Welcome to room {{ roomCode }}</div>
    <button v-on:click="closeRoom">disband room</button>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'

export default {
  data () {
    return {
      roomCode: this.$route.params.roomCode,
      socket
    }
  },

  methods: {
    closeRoom () {
      this.socket.emit('closeRoom', this.roomCode, () => {
        this.$router.push('/')
      })
    }
  }
}
</script>