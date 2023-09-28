import { describe, it, expect, vi } from "vitest";
import {ref} from "vue";
import * as serv  from "./services.js";
import axios from "axios";

// заглушка для fetch
global.fetch = vi.fn()
vi.mock('axios');
//const axios =require("axios");
describe("services", () => {

    it("getCardList function", async () => {
        const cardList = ref({});
        const users = [{name: 'Bob'}];
        const resp = {data: users};
        axios.get.mockResolvedValue(resp);
     //   await serv.getCardList(cardList);
       // console.log(cardList.value);
        //expect(axios).toHaveBeenCalled()
    });
    it("getCardPrice function", () => {

    });
    it("pushOrder function", () => {
        serv.pushOrder({}, ()=>{});
        expect(fetch).toHaveBeenCalled()
    });
});

/*НЕ ГОТОВО. не понимаю что не так с axios*/
