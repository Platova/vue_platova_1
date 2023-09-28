<template>
  <div>
    <h1>Товары в корзине</h1>
    <div v-if="cartStore.count == 0" test-data="cart-empty">Корзина пуста</div>
    <div v-else>
      <div v-for="i in cartStore.cart" v-bind:key="i">
        <CartProduct :id="i.id" :count="i.count"/>
      </div>
      <div style="text-align:center;font-size: 20pt;margin:20px 0; ">
        <label>Итого:</label>
        <div test-data="price">{{cartStore.getCartSumm()}}</div>
      </div>
      <div v-if="cartStore.count != 0" style="margin-top: 20px" >
        <RouterLink style="text-decoration: none;" :to="{name:'OrderForm'}" >
          <button class="butt" test-data="route-to-order">Оформить заказ</button>
        </RouterLink>
        <button  class="butt" @click="cartStore.clearCartArray" test-data="clean-cart">Очистить корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CartProduct from "/src/components/CatrProduct.vue"
  import {useCartStore} from '../store/CartStore'
  const cartStore = useCartStore();
</script>

<style scoped>
.butt{
  margin:5px;
  border-radius: 12px;
  height:40px
}
</style>