<template>
  <div v-if="+count === 0">
    <button @click="addToShopCart"  typeof="button" class="butt" name="AddToCart">Добавить в корзину</button>
  </div>
  <div v-else class="groupButton">
    <div style="padding-right: 10px"><button @click="goToShopCart" name="goToShopCart" class="buttLink">Добавлено в корзину<br/>Перейти</button></div>
    <button @click="delFromShopCart" class="buttCount" name="ButtonDel">-</button>
    <div style="width: 30px">{{count}}</div>
    <button @click="addToShopCart"  class="buttCount" name="ButtonAdd">+</button>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

const emit = defineEmits(['changeCount']);
const props = defineProps({count:Number});
const count= ref(props.count || 0);


function addToShopCart(){
  count.value ++;
  emit('changeCount', 1)
}
function delFromShopCart(){
  count.value --;
  emit('changeCount', -1)
}
function goToShopCart(){
  router.push('/cart')
}
</script>

<style scoped>

.butt {
  font-size: 14pt;
  height:50px;
  border-radius: 12px;
}
.groupButton{
  align-items: center;
  display: inline-flex;
}
.buttCount{
  font-size: 22pt;
  width:40px;
  height:50px;
  border-radius: 12px;
}
.buttLink{
  font-size: 12pt;
  word-wrap: break-word;
  height:50px;
  width: 200px;
  background-color: cadetblue;
  box-sizing: border-box;
  justify-content: center;
  border-radius: 12px;
  padding:9px 0;
  margin-left: 10px;
}
</style>