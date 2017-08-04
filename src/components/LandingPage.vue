<template>
  <section>
    <router-link to="/startgame" tag="div">
      Start A New Game
    </router-link>
    <router-link to="/joingame" tag="div">
      Join An Existing Game
    </router-link>
  </section>
</template>

<style scoped>
section {
  display: flex;
  font-size: 40px;
}

div {
  width: 50%;
  user-select: none;
  cursor: pointer;
  height: 20vh;
}

div:hover {
  background-color: red;
}
</style>