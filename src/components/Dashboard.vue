<template>
  <div id="app">
    <bar-chart></bar-chart>
    <API></API>
  </div>
</template>

<script>
import BarChart from './Charts/BarChart.vue'
import API from './CallAPI.vue'

export default {
  name: 'app',
  components: {
    BarChart,
    API
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>