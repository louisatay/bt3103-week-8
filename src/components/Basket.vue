<template>
  <div>
    
    <ul>
        <li v-for="item in itemsSelected" v-bind:key="item.name">
            <ul>{{item[0]}} x {{item[1]}}</ul>
            <br>
        </li>
    </ul>
    <button @click="f1() + findTotal()">Calculate Total</button>
    <button v-on:click.prevent="sendOrder">Add Order</button>
    <br><br>
    <div v-show="totes" id="totals">
        <p>Subtotal: ${{ this.price['subtotal'] }}<br></p>
        <p>Total:       ${{ findFinal }}<br></p>
        </div>
    
  </div>
</template>

<script>
    import database from "../firebase.js"

    export default {
    
        data(){
            return{
                price: {'subtotal': 0, 'total': 0},
                gst: 1.07,
                totes: false
            }   

        },
        props:{
            itemsSelected:{
                type:Array
            }
        },
        methods:{
            f1: function(){
                this.totes = true;
            },
            findTotal: function(){
                let subtotal = 0;
                for (let i = 0; i < this.itemsSelected.length; i++){
                    const curr_item = this.itemsSelected[i];
                    subtotal += curr_item[1] * curr_item[2];
                    
                }
                subtotal = subtotal.toFixed(2);
                this.$set(this.price, 'subtotal', subtotal);
            },
            sendOrder: function(){
                var curr_order = {'Prawn omelette': 0, 
                                'Dry Beef Hor Fun': 0,
                                'Sambal KangKung': 0,
                                'Pork Fried Rice': 0,
                                'Mapo Tofu': 0,
                                'Cereal Prawn': 0};
                for (let i = 0; i < this.itemsSelected.length; i++){
                    const curr_item = this.itemsSelected[i];
                    const name = curr_item[0];
                    const qty = curr_item[1];
                    curr_order[name] = qty;
                }
                database.collection('orders').add({
                        ordered: curr_order
                    }).then( () => {location.reload()} );
                
            }
        },
        computed:{
            findFinal: function(){
                let total = this.price['subtotal']*this.gst;
                return total.toFixed(2);
            }
        }
        }
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    button {
        font-family: Helvetica, Arial, sans-serif;
        color: rgb(255, 255, 255);
        display: inline-block;
        border: 1px solid #ddd;
        margin: 0px;
        width: 100px;
        height: 40px;
        text-align: center;
        vertical-align: middle;
        padding: 11px 0;
        background: rgb(0, 33, 71);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>