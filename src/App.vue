<script setup>
import AppHeader from "./components/AppHeader.vue";

</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style >
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
<!-- Сделать
2. Добавление в этот массив
3. клик на товар открывает полную карточку
-->