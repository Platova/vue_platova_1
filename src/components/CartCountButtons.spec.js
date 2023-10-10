import {describe, it, expect,vi} from "vitest";
import {mount} from "@vue/test-utils"
import component from "../components/CartCountButtons.vue"

describe('CartCountButtons component', () => {
    it ('Mount without error', () => {
        const  wrapper = mount(component);
        expect(wrapper.exists()).toBeTruthy();
    })
    it('press del button', async () => {
        const  wrapper = mount(component, { props: {
                count: 1
            }});
        expect(wrapper.vm.count).toBe(1);
        const button = wrapper.find('[name="ButtonDel"]')
        await button.trigger('click')
        expect(wrapper.vm.count).toBe(0)
        expect(wrapper.emitted().changeCount).toEqual([[-1]])
    })
    it('press add button', async () => {
        const  wrapper = mount(component, { props: {
                count: 1
            }});
        expect(wrapper.vm.count).toBe(1);
        const button = wrapper.find('[name="ButtonAdd"]')
        await button.trigger('click')
        expect(wrapper.vm.count).toBe(2)
        expect(wrapper.emitted().changeCount).toEqual([[1]])
    })
    it('press ButtonDelAll button', async () => {
        const  wrapper = mount(component, { props: {
                count: 1
            }});
        const button = wrapper.find('[name="ButtonDelAll"]')
        await button.trigger('click')
        expect(wrapper.emitted().changeCount).toEqual([[0]])
    })
})
