import { createRouter, createWebHistory } from 'vue-router'
import CardList from "../views/CardList.vue";
import AddCardForm from "../views/AddCardForm.vue";
import CardInfo from "../views/CardInfo.vue";
import OrderForm from "../components/OrderForm.vue"
import CartProductList from "../views/cartProductList.vue";
const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList
    },
    {
        path: '/addCard',
        name: 'AddCardForm',
        component: AddCardForm
    },
    {
        path: '/addOrder',
        name: 'OrderForm',
        component: OrderForm
    },
    {
        path: '/cards/:id',
        name: "cardInto",
        component: CardInfo

    },
    {
        path: '/cart',
        name: "cart",
        component: CartProductList

    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router