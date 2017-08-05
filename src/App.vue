<template>
  <section id="app">
    <router-view></router-view>
  </section>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'app',

  beforeCreate () {
    const lobbyCode = Cookies.get('lobbyCode')
    const userID = Cookies.get('userID')
    if (lobbyCode && userID) {
      this.$socket.emit('reconnectToLobby', { lobbyCode, userID }, (error) => {
        if (error) {
          alert('Room no longer exists!')
          Cookies.remove('lobbyCode')
          Cookies.remove('userID')
          this.$router.replace('/')
        } else {
          this.$router.replace(`/game/${lobbyCode}`)
        }
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  margin: 0px 15%;
}

header {
  text-align: center;

  h1 {
    font-size: 90px;
  }
}
</style>
