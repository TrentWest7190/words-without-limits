<template>
  <div class="container">
    <header>
      <h1>Waiting For Players</h1>
    </header>
    <div class="pure-g">
      <ul class="pure-u-1-2">
        <li v-for="player in players" :key="player.userID">{{ player.playerName }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      players: []
    }
  }
}
</script>


<style lang="scss" scoped>
.pure-g {
  justify-content: center;
}

.pure-u-1-2 {
  li {
    text-align: center;
    list-style: none;
    font-size: 25px;
  }
}
</style>
