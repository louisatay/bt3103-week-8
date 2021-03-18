<template>
   <div>
        <h1>Delicious Zi Char</h1>
        <div class="navbar">
            <nav>
            <ul>
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/orders" exact>Orders</router-link></li>
                <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
            </ul>
            </nav>
        </div>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: rgb(0, 47, 117);
    color: rgb(255, 255, 255);
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  background: rgb(60, 138, 255);
}

button {
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 10px;
  border-width: 1px;
}
</style>