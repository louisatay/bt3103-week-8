<template>
    <div>
        <div id="ordersList">
            <ul>
                <li v-for="order in orders" :key="order[0]" v-on:click="order.show = !order.show">
                    
                    <span v-for="(qty, item) in order[1].ordered" :key="item">
                        {{item}} : {{qty}}<br>
                    </span>
                    <br><br>

                    <button v-bind:key="order[0]" v-on:click="deleteItem(order[0])">Delete</button>
                    <button v-bind:key="order[0]" v-on:click="route(order[0])">Modify</button>         

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import database from "../firebase.js"

    export default {
    
        data(){
            return{
                orders: []
            }   
        },
        methods:{
            fetchItems: function(){
                database.collection('orders').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        this.orders.push([doc.id, doc.data()]);
                    });
                }); 
            },
            deleteItem: function(id){
                // let doc_id = event.target.getAttribute("id");
                console.log(id);
                database.collection('orders').doc(id).delete()
                .then( () => {location.reload()}); 
            },
            route: function(doc_id){
                this.$router.push({name: 'modify', params: {id: doc_id}}); 
            }
        },
        created(){
            this.fetchItems()
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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