import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "./CartStore";
import {useProductStore} from "./ProductStore.js";


describe("cart store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it("getCount function", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5},{id:2, count:10}];
        cartStore.getCount();
        expect(cartStore.count).toBe(15)
    });
    it("addDelToCart function add",  () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count = 15;
        cartStore.addDelToCart(1, 1);
        let prodInCart = cartStore.cart.find((i) => {
            return i.id == 1;
        });
        expect(prodInCart.count).toBe(6)
        expect(cartStore.count).toBe(16)
    });
    it("addDelToCart function add new", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count = 15;
        cartStore.addDelToCart(3, 1);
        let prodInCart = cartStore.cart.find((i) => {
            return i.id == 3;
        });
        expect(prodInCart).not.toBeUndefined()
        expect(prodInCart.count).toBe(1)
        expect(cartStore.count).toBe(16)
    });
    it("addDelToCart function del without del from cart", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:5}, {id:2, count:10}];
        cartStore.count = 15;
        cartStore.addDelToCart(1, -1);
        let prodInCart = cartStore.cart.find((i) => {
            return i.id == 1;
        });
        expect(prodInCart.count).toBe(4)
        expect(cartStore.count).toBe(14)
    });
    it("addDelToCart function del with del from cart", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:1}, {id:2, count:10}];
        cartStore.count = 11;
        cartStore.addDelToCart(1, -1);
        let prodInCart = cartStore.cart.find((i) => {
            return i.id == 1;
        });
        expect(prodInCart).toBeUndefined()
        expect(cartStore.count).toBe(10)
    });
    it("getProductFromCart function", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:1}, {id:2, count:10}];
        cartStore.count = 11;

        let prodInCart = cartStore.getProductFromCart(2)
        expect(prodInCart).not.toBeUndefined()
        expect(prodInCart).toStrictEqual({id:2, count:10})
    });
    it("dellProductFromCard function", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:1}, {id:2, count:10}];
        cartStore.count = 11;
        cartStore.dellProductFromCard(2)
        expect(cartStore.cart).toHaveLength(1);
        expect(cartStore.count).toBe(1);
    });
    it("clearCartArray function", async () => {
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:1}, {id:2, count:10}];
        cartStore.count = 11;
        cartStore.clearCartArray()
        expect(cartStore.cart).toHaveLength(0);
        expect(cartStore.count).toBe(0);
    });
    it("getCartSumm function", async () => {
        const prodStore = useProductStore();
        prodStore.products=[{id: 1, price: 5}, {id: 2, price: 10}]
        const cartStore = useCartStore();
        cartStore.cart=[{id:1, count:1}, {id:2, count: 10}];
        cartStore.count = 11;
        expect(cartStore.getCartSumm()).toBe('105.00');
    });
});
