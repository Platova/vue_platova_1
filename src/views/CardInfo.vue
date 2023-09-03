<template >
  <div style="text-align: -webkit-center">
    <h1> Подробная информация о товаре</h1>
    <div style="width: 700px;padding-bottom: 100px">
      <div style="overflow: hidden">
        <h2>{{cardData.title}}</h2>
      </div>
      <div v-if="cardData.rating" style="padding-bottom:20px">
        <b> {{cardData.rating.rate}}<img src="/src/images/star.png" style="width:20px"/>
          <label> Отзывов: {{cardData.rating.count}}</label></b>
      </div>
      <div>
        <img :src="cardData.image" class="cardImage"/>
      </div>
      <div style="font-size: 25pt">{{cardData.price}}</div>
      <div class="cardDescriptionInfo">{{cardData.description}}</div>
      <div style="padding-bottom:20px">
          <label> Категории:<b> {{cardData.category}}</b></label>
      </div>
      <CartButtons :count="cartCount" @changeCount="addToCart($event)"/>
    </div>
  </div>
</template>

<script setup>
 import {useRoute} from "vue-router";
 import {getCardList} from "../services/services"
 import {onBeforeMount, ref} from "vue";
 import {addDelToCart, getProductFromCart} from "../services/globalCart.js";
 import CartButtons from "../components/CartButtons.vue";
 const route = useRoute();
 const cardId = route.params.id;
 const cartCount= ref(0);
 const cardData= ref([]);
 onBeforeMount(() => {
    getCardList(cardData, cardId)
    const cartProd = getProductFromCart(cardId);
    cartCount.value = cartProd ? cartProd.count : 0;
 })
 function addToCart(val){
   cartCount.value += val;
   addDelToCart(cardId, val);
 }
</script>

<style scoped>
.cardDescriptionInfo {
  font-size: 15pt;
  padding-bottom:10px;
  text-align: -webkit-center;
}

</style>