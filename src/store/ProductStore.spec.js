import { describe, it, expect, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useProductStore } from "./ProductStore";

// заглушка для fetch
global.fetch = vi.fn()
function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
}
fetch.mockResolvedValue(createFetchResponse([{id:1, price:5},{id:2, price:10}]))

describe("product store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it("findProdById function", () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5},{id:2, price:10}];
        let prod= prodStore.findProdById(1);
        expect(prod).not.toBeUndefined()
        expect(prod).toStrictEqual({id:1, price:5})
    });
    it("getProductPrice function", () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5},{id:2, price:10}];
        let price= prodStore.getProductPrice(1);
        expect(price).toBe(5)
    });
    it("getProductPrice function return null when id is not exists", async () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5},{id:2, price:10}];
        let price= prodStore.getProductPrice(15);
        expect(price).toBeNull()
    });

    it("getProductList function ", () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5},{id:2, price:10}];
        let prods= prodStore.getProductList();
        expect(prods).toHaveLength(2)
        expect(prods).toStrictEqual([{id:1, price:5},{id:2, price:10}])
    });

    it("addProduct function ", () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5},{id:2, price:10}];
        prodStore.addProduct({id:3, price:49});
        let prods= prodStore.getProductList();
        expect(prods).toHaveLength(3)
        expect(prods).toStrictEqual([{id:1, price:5},{id:2, price:10},{id:3, price:49}])
    });

    it("getProductStore function ", async () => {
        const prodStore = useProductStore();
        await prodStore.getProductStore();
        let prods= prodStore.getProductList();
        expect(prods).toHaveLength(2)
        expect(prods).toStrictEqual([{id:1, price:5},{id:2, price:10}])
    });

});
