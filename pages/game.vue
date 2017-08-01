<template>
  <section class="container">
    <div>Welcome to room {{ roomCode }}</div>
    <button v-on:click="closeRoom">disband room</button>
  </section>
</template>

<script>
import socket from '~/plugins/socket.io'

export default {
  asyncData (context) {
    if (!context.params.roomCode) {
      context.redirect('/')
    }
    return { roomCode: context.params.roomCode }
  },

  data () {
    return {
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