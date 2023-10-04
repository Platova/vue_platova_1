import { describe, it, expect, vi } from "vitest";
import {ref} from "vue";
import * as serv  from "./services.js";
import axios from "axios";

// заглушка для fetch
global.fetch = vi.fn()

vi.mock("axios")
const usersMock = [{ id: 1 }, { id: 2 }]
axios.get.mockResolvedValue({
    data: usersMock
})
describe("services", () => {
    it("getCardList function", async () => {
        const cardList = ref();
        await serv.getCardList(cardList);
        expect(axios.get).toHaveBeenCalled()
        expect(cardList.value).toStrictEqual([{ id: 1 }, { id: 2 }])
    });
    it("getCardList function with id", async () => {
        const cardList = ref();
        await serv.getCardList(cardList ,121);
        expect(axios.get).toHaveBeenLastCalledWith('https://fakestoreapi.com/products/121')
        expect(cardList.value).toStrictEqual([{ id: 1 }, { id: 2 }])
    });

    it("pushOrder function", () => {
        serv.pushOrder({}, ()=>{});
        expect(fetch).toHaveBeenCalled()
    });
});

