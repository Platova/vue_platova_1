import {describe, it, expect,vi} from "vitest";
import {shallowMount} from "@vue/test-utils"
import component from "../views/CardList.vue";
import {useProductStore} from "../store/ProductStore";
import {createPinia, setActivePinia} from "pinia";


describe('CardList component', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it ('Mount without error', () => {
        const wrapper = shallowMount(component);
        expect(wrapper.exists()).toBeTruthy();
    })
    it('filter by price', async () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5}, {id:2, price:10}, {id:3, price: 5}];

        const wrapper = shallowMount(component);
        wrapper.vm.findMethod = 1;
        await wrapper.find('[data-testid="filterField"]').setValue("5")

        expect(wrapper.vm.cardListFilter).toHaveLength(2)
    })
    it('filter by price not Number', async () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5}, {id:2, price:10}, {id:3, price: 5}];

        const wrapper = shallowMount(component);
        wrapper.vm.findMethod = 1;
        await wrapper.find('[data-testid="filterField"]').setValue("2dfg")

        expect(wrapper.vm.cardListFilter).toHaveLength(0)
    })
    it('filter by name', async () => {
        const prodStore = useProductStore();
        prodStore.products=[{id:1, price:5, title:'test'}, {id:2, price:10, title: 'test2'}, {id:3, price: 5, title: 'hello'}];

        const wrapper = shallowMount(component);
        wrapper.vm.findMethod = 0;
        await wrapper.find('[data-testid="filterField"]').setValue("test2")
        expect(wrapper.vm.cardListFilter).toHaveLength(1)
        await wrapper.find('[data-testid="filterField"]').setValue("test")
        expect(wrapper.vm.cardListFilter).toHaveLength(2)
        /*поиск идет как like '%filterText% */
        await wrapper.find('[data-testid="filterField"]').setValue("e")
        expect(wrapper.vm.cardListFilter).toHaveLength(3)
    })
})
