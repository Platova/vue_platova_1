<template>
  <div class="card">
    <RouterLink style=" text-decoration: none;" :to="{name:'cardInto', params: {id: props.carddata.id}}">
    <div style="text-align: -webkit-center">
    <div style="height:100px; overflow: hidden">
      <h2>{{props.carddata.title}}</h2>
    </div>
    <div style="height:300px;width:200px; overflow: hidden">
      <img :src="props.carddata.image" class="cardImage"/>
    </div>
    <div style="font-size: 25pt">{{props.carddata.price}}</div>
    <div class="cardDescription">{{props.carddata.description}}</div>
    </div>
    </RouterLink>
    <CartButtons :count="cartCount" @changeCount="changeCartCount($event)"/>
  </div>
</template>

<script setup>
  import CartButtons from "../components/CartButtons.vue";
  import {onBeforeMount,  ref} from "vue";
  import {addDelToCart, getProductFromCart} from "../services/globalCart.js";

  const props = defineProps({'carddata': Object});
  const cartCount = ref(0);
  function changeCartCount(val){
    cartCount.value += val;
    addDelToCart(props.carddata.id, val);
  }
  onBeforeMount(()=>{
    const cartProd = getProductFromCart(props.carddata.id);
    cartCount.value = cartProd ? cartProd.count : 0;
    //console.log(cartCount.value);
  })
</script>

<style scoped>
.card {
  text-align:center;
  border: 5px solid cadetblue;
  margin:5px;
  padding:10px;
  width:400px;
  heigth:500px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  flex-wrap: wrap;

}
.cardDescription {
  font-size: 15pt;
  overflow: hidden;
  height:50px;
  padding-bottom:10px
}
.butt {
  width:200px;
  padding: 5px;
  margin: 3px;
}
.cardImage {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>