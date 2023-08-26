<template>
  <div style=" padding-top: 7.5rem;text-align: center;">
    <h1 style=""> Добавить товар в список </h1>
    <form id ="addCardF"  @submit.prevent="addCard">
        <table class="formTable">
          <colgroup>
            <col style="width:200px"/>
          </colgroup>
          <tr>
            <td>Наименование товара</td>
            <td> <input v-bind="title" style="width:100%"  :class="{invalid: errors.title}"/> </td>
            <td><span class="error">{{ errors.title }}</span></td>
          </tr>
          <tr>
            <td>Стоимость</td>
            <td><input v-bind="price" style="width:100%" :class="{invalid: errors.price}"/></td>
            <td><span class="error">{{ errors.price }}</span></td>
          </tr>
          <tr>
            <td>Путь до  изображения</td>
            <td><input v-bind="image" style="width:100%" :class="{invalid: errors.image}"></td>
            <td><span class="error">{{ errors.image }}</span></td>
          </tr>
          <tr>
            <td>Описание</td>
            <td><textarea v-bind="description" style="width:100%" :class="{invalid: errors.description}"/></td>
            <td><span class="error">{{ errors.description }}</span></td>
          </tr>
          <tr>
            <td>Email производителя</td>
            <td><textarea v-bind="email" style="width:100%" :class="{invalid: errors.email}"/></td>
            <td><span class="error">{{ errors.email }}</span></td>
          </tr>
          <tr>
            <td>Варианты доставки</td>
            <td>
              <select v-model="transport" multiple style="width:100%">
                <option v-for="i in postMethods" :value="i.value" :key="i"> {{i.label}}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Участовать в акциях</td>
            <td> <input type="checkbox" v-model="is_sale" /></td>
          </tr>
          <tr>
            <td></td>
            <td> <input type="submit" style="width:200px" value="Добавить"/> </td>
          </tr>
        </table>
    </form>
  </div>

</template>

<script setup>
  import {ref} from 'vue'
  import { useForm } from 'vee-validate';

  function required(value) {
    return value ? true : 'Поле обязательно для заполнения';
  }
  function  validateEmail(value) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return 'Поле должно быть адресом электронной почты';
    }
    // All is good
    return true;
  }

  // Create the form
  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: {
      title: required,
      price: required,
      image: required,
      description: required,
      email: [required, validateEmail],
    },
  });

  // Define fields
  const title = defineInputBinds('title');
  const price = defineInputBinds('price');
  const image = defineInputBinds('image');
  const description = defineInputBinds('description');
  const email = defineInputBinds('email');
  const transport = ref([]);
  const is_sale = ref('');

  // Submit handler
  const addCard = handleSubmit(values => {
    const newCard =  Object.assign({}, values);
    Object.assign(newCard, {'transport': transport.value, 'is_sale': is_sale});
    alert('Товар добавлен')
  });

  const postMethods =[{
      label:'В пункт выдачи',
      value:'1'
    },
    {
      label:'Курьером',
      value:'2'
    },
    {
      label:'Почтой',
      value:'3'
    },
  ]
</script>

<style scoped>
.cardForm{
  text-align: center;
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