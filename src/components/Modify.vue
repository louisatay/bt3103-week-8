<template>
    <div>
        <div id="itemsList">
            <span v-for="(qty, item) in datapacket" :key="item">
                {{item}} : {{qty}}<br>
                <input v-bind:id="item" placeholder=0 type="number" min=0><br><br>
            </span>

            <button v-bind:key="id" v-on:click="updateOrder(id)">Update</button>
        </div>
    </div>
</template>

<script>
    import database from "../firebase.js"

    export default {
    
        data(){
            return{
                datapacket: {}
            }   
        },
        props:{
            id: {
                type: Object
            }
        },
        methods: {
            fetchItems: function(){
                console.log(this.id);
                    database.collection('orders').doc(this.id).get().then(snapshot => {
                            console.log(snapshot.data()['ordered']);
                            this.datapacket = snapshot.data()['ordered'];
                        });
            },
            updateOrder: function(){
                for (var item in this.datapacket){
                    console.log("old: " + item + this.datapacket[item]);
                    var qty = document.getElementById(item).value;
                    if (!qty){
                        qty = 0;
                    }
                    this.datapacket[item] = Number(qty);
                    console.log("new: " + item + this.datapacket[item]);
                }
                
                database.collection('orders').doc(this.id).set({
                    ordered: this.datapacket
                }).then(() => {this.$router.push({path: '/orders'})});
            }
        },
        created(){
            this.fetchItems();
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#itemsList {

  flex-wrap: wrap;
  list-style-type: none;
  padding: 20px;
  text-align: left;
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
  text-align: left;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
    width: 65px;
    height: 40px;
    background: rgb(0, 47, 117);
    color: rgb(255, 255, 255);
    border-radius: 10px;
    border-width: 1px;
    padding: 10px;
    text-align: center;
}
</style>