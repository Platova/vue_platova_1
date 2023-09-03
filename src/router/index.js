import { createRouter, createWebHistory } from 'vue-router'
import CardList from "../views/CardList.vue";
import AddCardForm from "../views/AddCardForm.vue";
import CardInfo from "../views/CardInfo.vue";
import OrderForm from "../components/OrderForm.vue"
import CartProductList from "../views/CartProductList.vue";
import Login from "../views/Login.vue";
const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList
    },
    {
        path: '/addCard',
        name: 'AddCardForm',
        component: AddCardForm,
        meta: {
            reqAuth: true
        }
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

    },
    {
        path: '/login',
        name: "login",
        component: Login

    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to, from,next) => {
    if (to.meta.reqAuth && !localStorage.getItem('token')) {
        if (confirm("Для добавления товара необходимо авторизоваться. Перейти на форму авторизации?")) {
            return next({path: "/login"})
        }
    } else {
        next();
    }
})

export default router