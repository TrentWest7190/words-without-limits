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
import Cookies from '~/plugins/js-cookie'

export default {
  async asyncData (context) {
    const roomCode = context.isClient ? Cookies.get('roomCode') : context.req.cookies.roomCode
    const roomDisconnected = context.isClient ? Cookies.get('roomDisconnected') : context.req.cookies.roomDisconnected

    if (roomCode) {
      context.redirect('game')
    }

    if (roomDisconnected) {
      context.isClient ? Cookies.remove('roomDisconnected') : context.res.clearCookie('roomDisconnected')
    }

    return {
      roomDisconnected
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
