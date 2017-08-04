<template>
  <div class="container">
    <header>
      <h1>Words Without Limits!</h1>
    </header>
    <div class="pure-g">
      <div class="pure-u-1-2">
        <router-link class="button" to="/startgame">
          Start A New Game
        </router-link>
      </div>
      <div class="pure-u-1-2">
        <router-link class="button" to="/joingame">
          Join An Existing Game
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  text-align: center;

  h1 {
    font-size: 90px;
  }
}

.pure-u-1-2 {
  text-align: center;
  padding: 200px 0px;
}

.button {
  font-size: 50px;
}
</style>