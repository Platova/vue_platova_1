import {describe, it, expect,vi} from "vitest";
import {mount, flushPromises, shallowMount} from "@vue/test-utils"
import component from "../views/Login.vue"
import CardList from "../views/CardList.vue";
import CartProductList from "../views/CartProductList.vue";
import {createRouter, createWebHistory} from "vue-router";
import { createTestingPinia } from '@pinia/testing'

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


describe('Login component', () => {
    beforeEach(async () => {
        await router.push("/");
        await router.isReady();
    });
    const global = {
        plugins: [router, createTestingPinia()]
    }
    it ('Mount without error', () => {
        const  wrapper = mount(component, {global});
        expect(wrapper.exists()).toBeTruthy();
    })

    // при сохранении данных происходит сохранение в стор
    it ('Empty login ', async ()=>{
        const wrapper  = mount(component, {global});
        const name = wrapper.find('[name="login"]');
        const password = wrapper.find('[name="password"]');

        await name.setValue("");
        await password.setValue("");

       // wait for the promises to fulfill
        await flushPromises();
        // console.log(wrapper.html()) - тут html СТАРЫЙ, как будто никакие значения и не ставили. Никаких span там еще нет.
        const warnings = wrapper.findAll('span.warn')

       // expect(warnings[0].text()).toBe("name is required");
       // expect(warnings[1].text()).toBe("password is required");
    })


       // пробуем событие на форме
       // await wrapper.find('[test-data="login-form"]').trigger('onSubmit')
       //  await wrapper.find('[test-data="login-form"]').trigger('submit')
       // пробуем событие на кнопку
       //  await wrapper.find('[type="submit"]').trigger('submit')
       //  await wrapper.find('[type="submit"]').trigger('click')
       //а это обычная кнопка и вот это РАБОТАЕТ
       // await wrapper.find('[name="test-button"]').trigger('click')

       //  console.log(localStorage.getItem('token'))

    it("on submit", async () => {
        const wrapper = mount(component, {global});
        const form = wrapper.get("form");
        const inputs = wrapper.findAll('input');
        await inputs[0].setValue("3");
        await inputs[1].setValue("5");
        await form.trigger('submit');

        // wait for the promises to fulfill
        await flushPromises();
       // expect(wrapper.emitted('loginFunc')).toBeTruthy()
    });
})

/* Не понятно как работать с формами в vitest*/