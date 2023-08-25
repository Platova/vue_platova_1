<template>
  <div style=" padding-top: 7.5rem;text-align: center;">
    <h1 style=""> Добавить товар в список </h1>
        <table class="formTable">
          <colgroup>
            <col style="width:200px"/>
          </colgroup>
          <tr>
            <td>Наименование товара</td>
            <td> <input v-model.trim="newCard.title" style="width:100%"/></td>
          </tr>
          <tr>
            <td>Стоимость</td>
            <td><input v-model.number="newCard.price" style="width:100%"/></td>
          </tr>
          <tr>
            <td>Путь до  изображения</td>
            <td><input v-model.trim="newCard.image" style="width:100%"/></td>
          </tr>
          <tr>
            <td>Описание</td>
            <td><textarea v-model.trim="newCard.description" style="width:100%" /></td>
          </tr>
          <tr>
            <td>Варианты доставки</td>
            <td>
              <select v-model="transport" multiple style="width:100%">
                <option  value="0"> Пункт выдачи</option>
                <option value="1"  >Курьером</option>
                <option value="2" >Почтой</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Участовать в акциях</td>
            <td> <input type="checkbox" v-model="newCard.is_sale" /></td>
          </tr>
          <tr>
            <td></td>
            <td> <button @click="addCard" typeof="button" style="width:200px"> Добавить </button> </td>
          </tr>
        </table>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {reactive} from "vue";

const transport = ref([]);
const newCard = reactive({});
const emit = defineEmits()
function addCard() {
  newCard.transport=transport;
 // emit('addCard', newCard);
}
</script>

<style scoped>
.cardForm{
  text-align: center;
}
.formTable tr td{
  text-align: left;

}
</style>