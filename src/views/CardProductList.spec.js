import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import component from "../views/CartProductList.vue";
import {useProductStore} from "../store/ProductStore";
import {createPinia, setActivePinia} from "pinia";
import CardList from "./CardList.vue";
import {createRouter, createWebHistory} from "vue-router";
import OrderForm from "../components/OrderForm.vue";
import {useCartStore} from "../store/CartStore.js";
import CardInfo from "./CardInfo.vue";

const routes = [
    {
        path: '/',
        name: 'CardList',
        component: CardList
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
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

describe('CartProductList component', () => {
    beforeEach(async () => {
        await router.push("/");
        await router.isReady();
        setActivePinia(createPinia());
    });
    const global = {
        plugins: [router]
    }
    it ('Mount without error', () => {
        const wrapper = mount(component, {global});
        expect(wrapper.exists()).toBeTruthy();
    })
    it ('show empty cart', async () => {
        const wrapper = mount(component, {global});
        expect(wrapper.html()).toContain('data-testid="cart-empty"');
        expect(wrapper.html()).not.toContain('test-data="route-to-order"');
    })

    it ('clean cart', async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count = 15;
        const wrapper = mount(component, {global});
        const button = wrapper.find('[test-data="clean-cart"]')
        expect(wrapper.html()).not.toContain('data-testid="cart-empty"');
        expect(wrapper.html()).toContain('test-data="route-to-order"');
        await button.trigger('click');
        // стор отчистился, кнопка Оформить заказ пропала
        expect(cartStore.count).toBe(0);
        expect(wrapper.html()).toContain('data-testid="cart-empty"');
        expect(wrapper.html()).not.toContain('test-data="route-to-order"');
    })
    it ('change price when button add click', async () => {
        // стор с корзиной
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count = 15;
        // стор с продуктами
        const prodStore = useProductStore();
        prodStore.products=[{id: 1, price: 5}, {id: 2, price: 10}]
        const wrapper = mount(component, {global});
        const button = wrapper.find('[test-data="buttons-1"]').find('[name="ButtonAdd"]')
        expect(wrapper.find('[test-data="price"]').text()).toBe('125.00')
        await button.trigger('click');
        expect(wrapper.find('[test-data="price"]').text()).toBe('130.00')

    })
    it ('change price when button del click', async () => {
        // стор с корзиной
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count = 15;
        // стор с продуктами
        const prodStore = useProductStore();
        prodStore.products=[{id: 1, price: 5}, {id: 2, price: 10}]
        const wrapper = mount(component, {global});
        const button = wrapper.find('[test-data="buttons-1"]').find('[name="ButtonDel"]')
        expect(wrapper.find('[test-data="price"]').text()).toBe('125.00')
        await button.trigger('click');
        expect(wrapper.find('[test-data="price"]').text()).toBe('120.00')

    })
    it ('Routing to OrderForm', async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count=15;
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global});
        const button = wrapper.find('[test-data="route-to-order"]')
        await button.trigger('click');
        expect(push).toBeCalledWith({name: "OrderForm"});
    })

})
