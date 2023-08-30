<template>
  <div style=" padding-top: 7.5rem;text-align: center;">
    <h1> Добавить заказ </h1>
    <div >
      <Form @submit="addOrder" class="form" :validation-schema="schema"  v-slot="{ meta, errors }">
        <table class="formTable">
          <tr>
            <td> ФИО:</td>
            <td> <Field name="fio" :class="{invalid: errors.fio}" />
              <ErrorMessage name="fio" class="error" /> <br /> </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td> <Field id="email" name="email" type="email" :class="{invalid: errors.email}"/>
              <ErrorMessage name="email" class="error"/></td>
          </tr>
          <tr>
            <td>Телефон:</td>
            <td>  <Field id="phone" name="phone" :class="{invalid: errors.phone}"/>
              <ErrorMessage name="phone" class="error"/></td>
          </tr>
          <tr>
            <td>Адрес доставки:</td>
            <td><Field id="address" name="address" :class="{invalid: errors.address}"/>
              <ErrorMessage name="address" class="error"/></td>
          </tr>
          <tr>
            <td>Желаемая дата доставки:</td>
            <td><Field id="delivery" name="delivery" type="date" />
              <ErrorMessage name="delivery" class="error"/></td>
          </tr>
          <tr>
            <td>Номер карты для оплаты:</td>
            <td>
              <Field id="cardNum" name="cardNum"/>
              <ErrorMessage name="cardNum" class="error"/>
            </td>
          </tr>
          <tr>
            <td>Согласен с правилами обработки заказа</td>
            <td><input v-model="is_check" type="checkbox"/></td>
          </tr>
          <tr>
            <td></td>
            <td> <input type="submit" value="Оформить заказ" :disabled="!meta.valid || !is_check"/> </td>
          </tr>
        </table>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useRouter } from "vue-router";
import * as yup from 'yup';
import {ref} from "vue";
import {pushOrder} from "../services/services.js";

const router = useRouter();
const is_check = ref(false);
const schema = yup.object({
  email: yup.string().trim().required("Поле обязательно для заполнения").email("Не корректный email"),
  phone: yup.string().trim().required("Поле обязательно для заполнения").matches(/^(\d{6}\d*)$/gm, "Телефон дожен быть больше 6 цифр"),
  cardNum: yup.string().trim().matches(/^(\d{16})$/gm, "Номер карты должен быть из 16 цифр"),
  fio: yup.string().trim().required("Поле обязательно для заполнения"),
  address: yup.string().trim().required("Поле обязательно для заполнения"),
  delivery: yup.string()
});
function addOrder(values){

  const newOrder =  Object.assign({}, values);
  //sendData(newOrder);
  pushOrder(newOrder, ()=>{
    alert('Заказ оформлен');
    router.push({name: 'CardList'})
  })
}
async function sendData(data){
  /*const url = 'https://httpbin.org/post';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert('Заказ оформлен');
    await router.push({name: 'CardList'})
  } catch (error) {
    console.error('Ошибка:', error);
  }*/

}
</script>

<style scoped>
.form label{
  text-align: left;
}
.formTable tr td{
  text-align: left;

}
.invalid {
  border-color: red;
}
.error {
  color: red;
}
</style>