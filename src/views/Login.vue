<template>
  <div>
    <h1> Введите данные{{props}} </h1>
    <div>
      <Form @submit="loginFunc" class="form" :validation-schema="schema"  v-slot="{ meta, errors }" test-data="login-form">
        <table class="formTable">
          <tr>
            <td> Логин:</td>
            <td> <Field name="login" :class="{invalid: errors.login}" />
              <ErrorMessage name="login" class="error" /> <br /> </td>
          </tr>
          <tr>
            <td>Пароль:</td>
            <td> <Field name="password" type="password" :class="{invalid: errors.password}"/>
              <ErrorMessage name="password" class="error"/></td>
          </tr>
          <tr>
            <td></td>
            <td> <button type="submit" value="Войти" :disabled="!meta.valid"/>
              <!--button name="test-button" @click="loginFunc"/-->
            </td>
          </tr>
        </table>
      </Form>
    </div>

  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useRouter, useRoute } from "vue-router";
import * as yup from 'yup';
import {useUserStore} from '../store/UserStore'
import {ref} from "vue";


const router = useRouter();
const route = useRoute();
const props = defineProps({
  nextPage: String
});

const userStore = useUserStore();
const schema = yup.object({
  login: yup.string().trim().required("Поле обязательно для заполнения"),
  password: yup.string().trim().required("Поле обязательно для заполнения").matches(/^(\d{6}\d*)$/gm)
});
async function loginFunc(values){
console.log(123)
  localStorage.setItem('token', values.login);
  await userStore.logIn(values.login);
  if (route.query.goto === 'AddCard') {
    router.push({name: 'AddCard'});
  }else {
    router.go(-1);
  }
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