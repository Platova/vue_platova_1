import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import component from "../components/OrderForm.vue"
import CardList from "../views/CardList.vue";
import CartProductList from "../views/CartProductList.vue";
import {createRouter, createWebHistory} from "vue-router";

import { createTestingPinia } from '@pinia/testing'
import {useUserStore} from '../store/UserStore';
import {useCartStore} from '../store/CartStore'
import {createPinia, setActivePinia} from "pinia";

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
describe('OrderForm component', () => {
    beforeEach(async () => {
        await router.push("/");
        await router.isReady();

    });
    const global = {
        plugins: [router, createTestingPinia({
            initialState: {
                userStore: { user:{fio: '20'} },
            },
        })
        ]
    }
    it ('Mount without error', () => {
        const  wrapper = mount(component, {global});
        expect(wrapper.exists()).toBeTruthy();
    })
    // it('navigation', async () => {
    //     const push = vi.spyOn(router, 'push');
    //     const wrapper = mount(component, {global});
    //     const button = wrapper.find('[name="ButtonAdd"]')
    //     await button.trigger('click');
    //     expect(push).toBeCalledWith('/кк');
    //
    // })
    it('validate', async () => {

    })
    it('press addOrder button', async () => {
         // uses the testing pinia!
        // положили данные в  юсер стор если переменная заполнена
        // не положили если не заполнена
        // отчистили корзину
        setActivePinia(createPinia());
        const userStore = useUserStore();
        userStore.saveUserInfo({fio:'test', address:'Home 5'})
        const wrapper = mount(component, {global});
        console.log(wrapper.html())
        console.log(wrapper.vm)
        wrapper.vm.is_save = 1;
        // wrapper.vm.initialValues = {
        //     email: 'test@r.com',
        //     fio: 'Test'
        // };
        await wrapper.find('[name="fio"]').setValue("hello");

        const button = wrapper.find('[value="Оформить заказ"]')
        await button.trigger('click');
        console.log(button)

    })
    // проверить что кнопка доступна
})

/* НЕ ГОТОВО*/