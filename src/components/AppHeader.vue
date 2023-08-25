<template>
    <header class="header">
        <nav  class="headerNav">
          <RouterLink to="/" class="headerLink" >Список товаров</RouterLink>
          <RouterLink to="/addCard" class="headerLink">Добавить товар</RouterLink>
        </nav>
    </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  text-align: center;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  background-color: cadetblue;
}
.header__title {
  color: goldenrod;
}
.headerNav {
  display: flex;
  justify-content: space-evenly;
}
.headerLink {
  color: white;
}
</style>