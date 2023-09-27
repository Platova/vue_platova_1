import {describe, it, expect,vi} from "vitest";
import {mount, shallowMount} from "@vue/test-utils"
import component from "../views/Login.vue"
import CardList from "../views/CardList.vue";
import CartProductList from "../views/CartProductList.vue";
import {createRouter, createWebHistory} from "vue-router";

import {useUserStore} from '../store/UserStore';
import {createPinia, setActivePinia} from "pinia";
import {useProductStore} from "../store/ProductStore.js";

const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList
    },
    {
        path: '/cart',
        name: "cart",
        component: CartProductList

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

const div = document.createElement('div')
document.body.appendChild(div)
describe('Login component', () => {
    beforeEach(async () => {
        await router.push("/");
        await router.isReady();
        setActivePinia(createPinia())
    });
    const global = {
        plugins: [router],
       // attachTo: div
    }
    it ('Mount without error', () => {
        const  wrapper = mount(component, {global});
        expect(wrapper.exists()).toBeTruthy();
    })
    // кнопка недоступна, пока оба поля не заполнены
    // it('navigation', async () => {
           // кнопка недоступна, пока оба поля не заполнены
    //     const push = vi.spyOn(router, 'push');
    //     const wrapper = mount(component, {global});
    //     const button = wrapper.find('[name="ButtonAdd"]')
    //     await button.trigger('click');
    //     expect(push).toBeCalledWith('/кк');
    //
    // })
    // console.log(wrapper.find('[name="login"]').valueOf())
    // console.log(wrapper.find('[test-data="login-form"]'))
    // console.log(userstore.user)
    //         console.log(wrapper.vm.t1)
    //         console.log(localStorage.getItem('token'))
    // при сохранении данных происходит сохранение в стор
    it ('login button click', async ()=>{
        const userstore = useUserStore()
        const wrapper  = mount(component, {global});

        // задаем значение логина/пароля
        await wrapper.find('[name="login"]').setValue("test")
        await wrapper.find('[name="password"]').setValue("ps")
        // пробуем событие на форме
       await wrapper.find('[test-data="login-form"]').trigger('onSubmit')
        await wrapper.find('[test-data="login-form"]').trigger('submit')
        // пробуем событие на кнопку
        await wrapper.find('[type="submit"]').trigger('submit')
        await wrapper.find('[type="submit"]').trigger('click')
        //а это обычная кнопка и вот это РАБОТАЕТ
       // await wrapper.find('[name="test-button"]').trigger('click')


       console.log(localStorage.getItem('token'))
    })
})

/* НЕ ГОТОВО*/