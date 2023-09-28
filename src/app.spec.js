import {describe, it, expect,vi} from "vitest";
import {shallowMount} from "@vue/test-utils"
import component from "./App.vue"


describe('App component', () => {


    it ('Mount without error', () => {
        const wrapper = shallowMount(component, {
            global: {
                stubs:  {
                    'RouterView': { template: '<div/>' },
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    })
})