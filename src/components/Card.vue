<template>
  <div class="card">
    <div style="height:100px; overflow: hidden">
      <h2>{{props.carddata.title}}</h2>
    </div>
    <div style="height:300px;width:200px; overflow: hidden">
      <img :src="props.carddata.image" class="cardImage"/>
    </div>
    <div style="font-size: 25pt">{{props.carddata.price}}</div>
    <div class="cardDescription">{{props.carddata.description}}</div>
    <RouterLink :to="`/cards/${props.carddata.id}`">
      <button typeof="button"  class="butt" >Подробнее</button>
    </RouterLink>
    <button @click="addToBasket"  typeof="button" class="butt" >Добавить в корзину</button>
  </div>
</template>

<script setup>
  const props = defineProps({'carddata': Object});
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
  height:90px;
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