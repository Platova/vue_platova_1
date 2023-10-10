<template>
    <header class="header">
        <nav  class="headerNav">
          <RouterLink to="/" class="headerLink" name="routeCardList">Список товаров</RouterLink>
          <RouterLink to="/addCard" class="headerLink" name="routeAddCard">Добавить товар</RouterLink>
          <RouterLink to="/cart" class="headerLink" name="routeCart">Корзина
            <div data-testid="cart-counter">{{cartStore.count}}</div> </RouterLink>
          <div v-if="userStore.isEmpty">
             <RouterLink :to="{ name: 'login'}" class="headerLink" name="routeLogIn">
               <button>Войти</button>
             </RouterLink>
          </div>
          <div v-else class="headerLink" >
            <div name="divLogin">{{userStore.user.name}}</div>
            <button @click="logOutFunc" name="buttonLogOut">Выйти</button>
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
    console.log(123131)
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