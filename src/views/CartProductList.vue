<template>
  <div>
    <h1>Товары в корзине</h1>
    <div v-if="cartArray.length == 0">Корзина пуста</div>
    <div v-else>
      <div v-for="i in cartArray" v-bind:key="i">
        <CartProduct :id="i.id" :count="i.count"/>
      </div>
      <div style="text-align:center;font-size: 20pt;margin:20px 0; ">
        <label>Итого:</label>
        {{fullSumm}}

      </div>
      <div style="margin-top: 20px">
        <RouterLink style="text-decoration: none;" :to="{name:'OrderForm'}">
          <button class="butt">Оформить заказ</button>
        </RouterLink>
        <button  class="butt" @click="clearCartArray">Очистить корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartProduct from "/src/components/CatrProduct.vue"
import {cartArray, clearCartArray, calcSumm} from "../services/globalCart.js";
import {computed, ref} from "vue";
const fullSumm = computed(calcSumm);




</script>

<style scoped>
.butt{
  margin:5px;
  border-radius: 12px;
  height:40px
}
</style>