<template>
    <div>
        
        <button @click="decreaseCounter()">-</button>
        <span id="box">{{ counter }}</span>
        <button @click="increaseCounter()">+</button>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                counter: 0
            }
        },
        methods:{
            increaseCounter: function() {
                if (this.counter == 10){
                    alert("You cannot buy more than 10 items.");
                } else {
                    this.counter++;
                }
                this.$emit('counter', this.item, this.counter);

            },
            decreaseCounter: function() {
                if (this.counter > 0){
                    this.counter--;
                }
                this.$emit('counter', this.item, this.counter);
            }
        },
        props:{
            item: {
                type:Object
            }
        }
    }
</script>

<style scoped>
    button {
        font-family: Helvetica, Arial, sans-serif;
        color: rgb(255, 255, 255);
        display: inline-block;
        border: 1px solid #ddd;
        margin: 0px;
        width: 40px;
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
    #box {
        text-align: center;
        margin: 20px;
    }

</style>