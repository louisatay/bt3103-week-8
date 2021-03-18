<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header.vue'

  export default {
    data(){
      return{
        }
      },
    components:{
      Header: Header,
      // PageContent: PageContent
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 0px;
    font-size:30px;
  }
  h1{
    background:rgb(0, 33, 71);
    padding: 15px;
    color: white;
    height: 80px;
    text-align: center;
    vertical-align: middle;
    font-family: Helvetica, Arial, sans-serif;
    top: 0;
  }
</style>