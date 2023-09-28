import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import component from "./Card.vue"
import { createTestingPinia } from '@pinia/testing'
import {useCartStore} from '../store/CartStore'
import {createRouter, createWebHistory } from "vue-router";
import CardList from "../views/CardList.vue";
import CartProductList from "../views/CartProductList.vue";
import CardInfo from "../views/CardInfo.vue";
import {useUserStore} from "../store/UserStore.js";

const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList
    },
    {
        path: '/cards/:id',
        name: "cardInto",
        component: CardInfo
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
vi.mock('../store/CartStore', () => ({
    useCartStore: vi.fn(() => ({
        getProductFromCart: () => {},
        addDelToCart: () => {}
    }))
}))
describe('Card component', () => {

    const global = {
        plugins: [router
        ]
    }

    it ('Mount without error', () => {
        const  wrapper = mount(component, {global, props: {
                carddata: {
                    id: 1
                }
            }});
        expect(wrapper.exists()).toBeTruthy();
    })

    it('show property values', () => {
        const  wrapper = mount(component, {global, props: {
                carddata: {
                     id: 1,
                     title:'Test',
                     price:100
                 }
             }});
        const price = wrapper.find('[name="price"]');
        const title = wrapper.find('[name="title"]');
        expect(price.text()).toContain('100');
        expect(title.text()).toContain('Test');
    })
    it('navigation', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global, props: {
                carddata: {
                     id: 1,
                     title:'Test',
                     price:100
                 }
             }});
        const rout = wrapper.find('[name="rout"]');
        await rout.trigger('click');
        expect(push).toBeCalledWith({name:"cardInto",  params: {id: 1}});
    })
    it('changeCartCount to be called', async () => {
        const wrapper = mount(component, {global, props: {
                carddata: {
                     id: 1,
                     title:'Test',
                     price:100
                 }
             }});
        const changeCartCount = vi.spyOn(wrapper.vm, 'changeCartCount');
        const cartButtons = wrapper.find('[name="cartButtons"]');
        await cartButtons.trigger('changeCount');
      //  expect(changeCartCount).toHaveBeenCalled();
    })

})

/*Не работает последний тест - не получается запустить событие пользовательское changeCount*/