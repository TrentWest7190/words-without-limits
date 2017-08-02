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
  asyncData (context) {
    const roomCode = context.isClient ? Cookies.get('roomCode') : context.req.cookies.roomCode
    if (roomCode) {
      context.redirect('game')
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
