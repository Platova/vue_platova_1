<template>
  <div>
    <h1> Для добавления товара необходимо зарегистрироваться </h1>
    <div>
      <Form @submit="login" class="form" :validation-schema="schema"  v-slot="{ meta, errors }">
        <table class="formTable">
          <tr>
            <td> Логин:</td>
            <td> <Field name="login" :class="{invalid: errors.login}" />
              <ErrorMessage name="login" class="error" /> <br /> </td>
          </tr>
          <tr>
            <td>Пароль:</td>
            <td> <Field id="email" name="email" type="email" :class="{invalid: errors.email}"/>
              <ErrorMessage name="email" class="error"/></td>
          </tr>
          <tr>
            <td></td>
            <td> <input type="submit" value="Войти" :disabled="!meta.valid || !is_check"/> </td>
          </tr>
        </table>
      </Form>
    </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useRouter } from "vue-router";
import * as yup from 'yup';
import {ref} from "vue";

const router = useRouter();
const schema = yup.object({
  login: yup.string().trim().required("Поле обязательно для заполнения"),
  password: yup.string().trim().required("Поле обязательно для заполнения")
});
function login(){
  //localStorage
  router.push({name:'OrderForm'})
}
</script>

<style scoped>

</style>