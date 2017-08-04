<template>
  <section id="app">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'app'
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
