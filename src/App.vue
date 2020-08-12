<template>
  <div id="app">
    <img alt="logo" src="./assets/logo.png" class="logo" />
    <Country msg="Welcome, please provide your details" />
  </div>
</template>

<script>
import Country from "./components/Country.vue";

export default {
  name: "App",
  components: {
    Country,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Gilroy", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img.logo {
  width: 100px;
  height: 100px;
}
</style>
