<template>
    <header class="header">
        <nav  class="headerNav">
          <RouterLink to="/" class="headerLink" >Список товаров</RouterLink>
          <RouterLink to="/addCard" class="headerLink">Добавить товар</RouterLink>
          <RouterLink to="/cart" class="headerLink">Корзина {{cartStore.count}} </RouterLink>
          <div v-if="userStore.isEmpty">
             <RouterLink :to="{ name: 'login'}" class="headerLink">
               <button>Войти</button>
             </RouterLink>
          </div>
          <div v-else class="headerLink">
            {{userStore.user.name}} <button @click="logOutFunc">Выйти</button>
          </div>


        </nav>
    </header>
</template>

<script setup>
  import {useCartStore} from '../store/CartStore'
  import {useUserStore} from '../store/UserStore'
  import {useProductStore} from "../store/ProductStore";
  import {useRouter} from "vue-router";
  import {onBeforeMount} from "vue";
  const cartStore = useCartStore();
  const userStore = useUserStore();
  const storeProduct = useProductStore();
  const router= useRouter()
  onBeforeMount(() => {
    storeProduct.getProductStore();
  })
  function logOutFunc() {
    userStore.logOut();
    localStorage.setItem('token', '');
    if (router.currentRoute.value.path === '/addCard') {
      router.push({name: 'CardList'})
    }
  }
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