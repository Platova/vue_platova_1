<template>
  <div class="product">
    <div style="width:100px">
      <RouterLink :to="{name:'cardInto', params: {id: props.id}}" name="rout1">
        <img :src="product.image" style="height:180px;width:150px; overflow: hidden"/>
      </RouterLink>
    </div>
    <div style="width:700px; padding-top:30px; ">
      <RouterLink :to="{name:'cardInto', params: {id: props.id}}" name="rout2">
        <label style="font-size: 16pt; word-wrap: break-word">{{product.title}}</label>
      </RouterLink>
    </div>
    <div style="width:100px; padding-top:30px">
      {{product.price}}
    </div>
    <div style="width:100px; padding-top:20px">
      <cartCountButtons :count="count" @changeCount="changeCount($event)" :test-data="`buttons-${props.id}`"/>
    </div>
  </div>
</template>

<script setup>
import {getCardList} from "../services/services"
import {onBeforeMount, ref} from "vue";
import cartCountButtons from "./CartCountButtons.vue"
import {useCartStore} from '../store/CartStore'
const cartStore = useCartStore();
const props = defineProps({'id':Number, 'count':Number});
const product = ref({});
const count = props.count;
onBeforeMount(() => {
  getCardList(product, props.id);

})
function changeCount(val){
  if (val === 0) {
    cartStore.dellProductFromCard(props.id)
  } else {
    cartStore.addDelToCart(props.id, val);
  }

}

</script>

<style scoped>
.product{
  display: flex;
  height:200px;
  overflow:hidden;
  border-bottom:1px solid cadetblue;
  margin-top:30px;
  padding:0 50px;

}
</style>