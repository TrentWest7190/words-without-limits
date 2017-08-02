<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 10%;
}
</style>
