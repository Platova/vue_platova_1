import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import component from "../components/CatrProduct.vue";
import {createRouter, createWebHistory } from "vue-router";
import CardList from "../views/CardList.vue";
import CardInfo from "../views/CardInfo.vue";

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
        dellProductFromCard: () => {},
        addDelToCart: () => {}
    }))
}))
describe('CartProduct component', () => {

    const global = {
        plugins: [router ]
    }
    const propsData ={
        id: 1,
        count: 2
    }
    it ('Mount without error', () => {
        const wrapper = mount(component, {global, props: propsData});
        expect(wrapper.exists()).toBeTruthy();
    })
    it('navigation image', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global, props: propsData});
        const rout = wrapper.find('[name="rout1"]');
        await rout.trigger('click');
        expect(push).toBeCalledWith({name:"cardInto",  params: {id: 1}});
    })
    it('navigation text', async () => {
        const push = vi.spyOn(router, 'push');
        const wrapper = mount(component, {global, props: propsData});
        const rout = wrapper.find('[name="rout2"]');
        await rout.trigger('click');
        expect(push).toBeCalledWith({name:"cardInto",  params: {id: 1}});
    })
    it('show Info', async () => {
        const wrapper = mount(component, {global, props: propsData});
        const rout = wrapper.find('[name="rout2"]');
      // console.log(wrapper.html())

    })
})

/* 1.Могу ли я проверить загрузку данных на хуки onBeforeMount?
*  эта функция не запускается даже,  текст не отображается
2. Проверка запуска функции с опредененным значением
* changeCount- проверить что отрабатывают нужные функции*/