<script setup>
import Card from "../components/Card.vue";
import {ref, computed} from "vue"
import {useProductStore} from "../store/ProductStore";

const findText= ref('');
const findMethod= ref(0);
const storeProduct = useProductStore();

const cardData = computed(storeProduct.getProductList);

const cardListFilter = computed(findCards);
function findCards() {
    if (findText.value === '') {
        return cardData.value;
    } else {
        return cardData.value.filter(t =>
            (+findMethod.value === 1)
                ? !isNaN(+findText.value) && +t.price === +findText.value
                : t.title.toLowerCase().search(findText.value.toLowerCase()) > -1
            )
    }
}
</script>

<template>
  <div>
    <h1 style=""> Список товаров</h1>
      <label>Поиск товаров: </label>
      <input type="text" v-model.trim="findText" @keyup.enter="findCards" test-data="filterField"/>
      <input type="radio" v-model="findMethod"  value="0" @change ="findCards"/> <label> По наименованию</label>
      <input type="radio" v-model="findMethod"  value="1" @change ="findCards"/> <label> По цене</label>
      <div class="cardsList">
        <div  class="cardItem" v-for="i in cardListFilter" v-bind:key="i">
          <Card :carddata="i"/>
        </div>
      </div>
  </div>
</template>



<style scoped>
.cardsList {

  display: grid;
  grid-gap: 10px;
  grid:
    repeat(auto-fill, minmax(10em, 1fr))
    / repeat(auto-fill, minmax(25rem, 1fr));
  grid-auto-rows: auto;
}
.cardItem {
  cursor: pointer;

}
</style>