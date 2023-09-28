<template>
  <div class="groupButton">
    <button @click="delFromShopCart" class="buttCount" name="ButtonDel">-</button>
    <div style="width: 30px">{{count}}</div>
    <button @click="addToShopCart"  class="buttCount" name="ButtonAdd">+</button>
    <div style="padding-right: 10px"><button @click="delAllProdFormCart" class="butt" name="ButtonDelAll">Удалить</button></div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({count:Number})
const emit = defineEmits(['changeCount']);
const count = ref();
count.value = props.count;

function addToShopCart(){
  count.value ++;
  emit('changeCount', 1)
}
function delFromShopCart(){
  count.value --;
  emit('changeCount', -1)
}
function delAllProdFormCart(){
  emit('changeCount', 0)
}
</script>

<style scoped>

.butt {
  font-size: 14pt;
  height:40px;
  border-radius: 12px;
}
.groupButton{
  align-items: center;
  display: inline-flex;
  margin-left: 50px;
}
.buttCount{
  font-size: 22pt;
  width:30px;
  height:40px;
  border-radius: 12px;
  margin: 0 5px;
}

</style>