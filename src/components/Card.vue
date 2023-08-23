<template>
<div class="card">

  <h2>{{title}}</h2>
  <div>
    <img :src="src" style="width:200px"/>
  </div>
  <p style="font-size: 25pt">{{price}}</p>
  <p style="font-size: 15pt">{{description}}</p>
  <button @click="addToBasket"  typeof="button" style="width:200px">Добавить в корзину</button>
</div>
</template>

<script>
export default {
  name: "Card",
  props:{
    title:{
      type: String
    },
    price:{
      type: Number
    },
    src:{
      type: String
    },
    description:{
      type: String
    },
    category:{
      type: String
    },
    rating:{
      type: Object
    },
  },
  data() {
    return {
    }
  },
  methods: {
    addToBasket() {

    }
  }
}
</script>

<style scoped>
.card {
  text-align:center;
  border: 5px solid #e9d8fd;
  margin:5px;
  padding:10px;
  width:400px;
  heigth:500px
}
.card_mouse {
  border: 5px solid red;
}
</style>