<template>
  <div id="app">
    <div id="heading">
      <img id="logo" alt="Vue logo" src="./assets/logo.png">
    </div>
    <div id="base">
      <Base/>
    </div>
  </div>
</template>

<script>
import Base from './components/Base.vue'

export default {
  name: 'app',
  components: {
    Base
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}
#heading {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
  max-height: 100px;
}
#logo {
   max-height: 150px;
}
#base {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
