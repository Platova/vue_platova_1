import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import {createRouter, createWebHistory } from "vue-router";
import component from "./CartButtons.vue"
import CardList from "../views/CardList.vue";
import CartProductList from "../views/CartProductList.vue";


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

describe('CartButtons component', () => {
    const global = {
        plugins: [router]
    }

    it ('Mount without error', () => {
        const wrapper = mount(component, {global});
        expect(wrapper.exists()).toBeTruthy();
    })
    it('show add/del buttons when count > 0', () => {
        const wrapper1 = mount(component, {global, props: {
                count: 1
            }});
        expect(wrapper1.vm.count).toBe(1)
        expect(wrapper1.html()).toContain('name="ButtonDel"');
        expect(wrapper1.html()).toContain('name="ButtonAdd"');
        expect(wrapper1.html()).not.toContain('name="AddToCart"');
    })
    it('show add/del buttons when count = 0', () => {
        const wrapper = mount(component, {global});
        expect(wrapper.vm.count).toBe(0)
        expect(wrapper.html()).not.toContain('name="ButtonDel"');
        expect(wrapper.html()).not.toContain('name="ButtonAdd"');
        expect(wrapper.html()).toContain('name="AddToCart"');
    })
    it('press del button', async () => {
        const wrapper1 = mount(component, {global, props: {
                count: 1
            }});
        expect(wrapper1.vm.count).toBe(1);
        const button = wrapper1.find('[name="ButtonDel"]')
        await button.trigger('click')
        expect(wrapper1.vm.count).toBe(0)
        expect(wrapper1.emitted().changeCount).toBeTruthy()
    })
    it('press add button', async () => {
        // const wrapper1 = mount(component, {global});
        //await wrapper1.setProps({count:1})
        //по документации так должно работать, но не работает
        const wrapper1 = mount(component, {global, props: {
               count: 1
           }});
        expect(wrapper1.vm.count).toBe(1);
        const button = wrapper1.find('[name="ButtonAdd"]')
        await button.trigger('click')
        expect(wrapper1.vm.count).toBe(2)
        expect(wrapper1.emitted().changeCount).toBeTruthy()
    })
    it('press addToCart button', async () => {
        const wrapper = mount(component, {global});
        expect(wrapper.html()).not.toContain('name="ButtonDel"');
        expect(wrapper.html()).not.toContain('name="ButtonAdd"');
        expect(wrapper.vm.count).toBe(0);
        const button = wrapper.find('[name="AddToCart"]')
        await button.trigger('click')
        expect(wrapper.vm.count).toBe(1)
        expect(wrapper.emitted().changeCount).toBeTruthy()
        expect(wrapper.html()).toContain('name="ButtonDel"');
        expect(wrapper.html()).toContain('name="ButtonAdd"');
    })
    it('press goToShopCart button', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper1 = mount(component, {global, props: {
            count: 1
        }});
        const button = wrapper1.find('[name="goToShopCart"]')
        await button.trigger('click');
        expect(push).toBeCalledWith('/cart');
    })

})

