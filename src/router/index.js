import { createRouter, createWebHistory } from 'vue-router'
import CardList from "../views/CardList.vue";
import AddCardForm from "../views/AddCardForm.vue";
import CardInfo from "../views/CardInfo.vue";
import OrderForm from "../components/OrderForm.vue"
const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList,
        props:true
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

    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router