<template>
  <div class="container">
    <header>
      <h1>Start A New Game</h1>
    </header>
    <div class="pure-g">
      <div class="pure-u-1">
        <span>Name</span>
        <input placeholder="Give yourself a name">
      </div>
      <div class="pure-u-1">
        <span>Password (if you want)</span>
        <input placeholder="Enter a password">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pure-u-1 {
  align-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0px 20%;

  input {
    font-size: 40px;
  }

  span {
    text-align: left;
    font-size: 25px;
    margin: 4px 0px;
    letter-spacing: 0.1em;
  }
}
</style>