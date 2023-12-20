<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar'

export default {
  name: 'App',
  components: {
    Navbar: Navbar
  }
}
</script>

<style>
body{
  background-color: #FEEFDD !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
