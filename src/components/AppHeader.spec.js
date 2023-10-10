import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import component from "../components/AppHeader.vue";
import {createRouter, createWebHistory } from "vue-router";
import CardList from "../views/CardList.vue";
import AddCardForm from "../views/AddCardForm.vue";
import CartProductList from "../views/CartProductList.vue";
import Login from "../views/Login.vue";
import {createTestingPinia} from "@pinia/testing";
import {useUserStore} from "../store/UserStore";

const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList
    },
    {
        path: '/addCard',
        name: 'AddCard',
        component: AddCardForm,
        meta: {
            reqAuth: true
        }
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
    history: createWebHistory(),
    routes
});

describe('AppHeader component', () => {

    const global = {
        plugins: [router, createTestingPinia()
        ]
    }

    it ('Mount without error', () => {
        const wrapper = mount(component, {global});
        expect(wrapper.exists()).toBeTruthy();
    })

    //проверка роутинга
    it('route to CardList', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global});
        const rout = wrapper.find('[name="routeCardList"]');
        await rout.trigger('click');
        expect(push).toBeCalledWith('/');
    })
    it('route to routeAddCard', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global});
        const rout = wrapper.find('[name="routeAddCard"]');
        await rout.trigger('click');
        expect(push).toBeCalledWith('/addCard');
    })
    it('route to routeLogIn', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global});
        const rout = wrapper.find('[name="routeLogIn"]');
        await rout.trigger('click');
        expect(push).toBeCalledWith({ "name": "login"});
    })
    //кнопка войти или выйти в заивисмоти от заполненности стора
    it('show routeLogIn if userStore is empty',  () => {
        const wrapper = mount(component, {global});
        expect(wrapper.html()).toContain('name="routeLogIn"');
    })
    it('show LogOut if userStore not empty',  () => {
        const userStore = useUserStore();
        userStore.user.name='test'
        const wrapper = mount(component, {global});
        const log = wrapper.find('[name="divLogin"]');
        expect(log.text()).toContain('test')
        expect(wrapper.html()).not.toContain('name="routeLogIn"');
        expect(wrapper.html()).toContain('name="buttonLogOut"');
    })

    // При разлогине с окна Добавления товара переходим в окно списка товаров
    it('LogOut function routing from addCard', async () => {
        await router.push("/addCard");
        await router.isReady();
        const push = vi.spyOn(router, 'push');
        const userStore = useUserStore();
        userStore.user.name='test'
        localStorage.setItem('token', 'test2');
        const wrapper = mount(component,  {global});
        const logout = wrapper.find('[name="buttonLogOut"]');
        await logout.trigger('click');
        expect(push).toBeCalledWith({ "name": "CardList"});
    })
    // при разлогине сбрасывается токен
    it('LogOut function', async () => {

        const userStore = useUserStore();
        userStore.user.name='test'
        localStorage.setItem('token', 'test2');
        const wrapper = mount(component,  {global});
        const logout = wrapper.find('[name="buttonLogOut"]');
        await logout.trigger('click');
        expect(localStorage.getItem('token')).toBe('');

        //НЕ ДО КОНЦА РАБОТАЕТ, не срабатывают функции стора.
        // как сделать, чтобы работало?
        //Либо каким образом написать мок для стора? от наличия логина в сторе зависит отображается
        // ли кнопка Выйти, которая используется в данном тесте.
        //expect(userStore.user.name).toBe('');
        //expect(wrapper.html()).not.toContain('name="buttonLogOut"');

    })
})

