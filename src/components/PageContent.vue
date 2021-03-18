<template>
    <div>
        <div id="itemsList">
            <ul>
                <li v-for="item in items" v-bind:key="item.name" v-on:click="item.show = !item.show">
                    <h2 id="itemName">{{item.name}}</h2>
                    <img v-bind:src="item.imageURL"><br><br>
                    <span id ="price">${{item.price}}</span>
                    <br><br>
                    <QuantityCounter v-bind:item='item' v-on:counter="onCounter"></QuantityCounter>         
                    
                </li>
            </ul>
        </div>
        
        <div id="shoppingBasket">
            <h2>Menu:</h2>
            <Basket v-bind:itemsSelected = "itemsSelected"></Basket>
        </div>
    </div>

</template>


<script>
    import QuantityCounter from './QuantityCounter.vue'
    import Basket from './Basket.vue'
    import database from "../firebase.js"

    export default {
    
        data(){
            return{
                itemsSelected: [],
                items: []
            }   
        },
        components:{
            QuantityCounter: QuantityCounter,
            Basket: Basket
        },
        methods: {
            onCounter: function(item, count) {
                if (this.itemsSelected.length === 0 && count > 0) {
                    //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                } else {
                    var added = 0;
                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];

                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if (item_name === item.name && count > 0){

                            this.itemsSelected.splice(i, 1, [item_name, count, item.price]);
                            added = 1;
                            // this.itemsSelected[i].push([item_name, count, item.price]);
                        }
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        else if (item_name === item.name && count === 0){
                            this.itemsSelected.splice(i, 1);
                        }
                    }
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    if (added === 0){
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
            },
            fetchItems: function(){
                database.collection('menu').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        this.items.push(doc.data());
                    });
                }); 
            }
        },
        created(){
            this.fetchItems()
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
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
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 40%;
  left: 75%;
  text-align: left;
  font-size: 30px;
  margin: 0px;
  padding: 10 5px;
}
</style>