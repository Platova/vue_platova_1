import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "./UserStore";

describe("user store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it("logIn function", () => {
        const userStore = useUserStore();
        userStore.logIn('test');
        expect(userStore.user).toHaveProperty('name')
        expect(userStore.user.name).toBe('test')
    });
    it("logIn function not string login", () => {
        const userStore = useUserStore();
        userStore.logIn(['test']);
        expect(userStore.user).not.toHaveProperty('name')

    });
    it("saveUserInfo function", () => {
        const userStore = useUserStore();
        userStore.logIn('login');
        userStore.saveUserInfo({fio:'test', address:'Home 5'});
        expect(userStore.user).toStrictEqual({ name: 'login', fio: 'test', address: 'Home 5' })
        expect(userStore.user).not.empty
    });
    it("saveUserInfo function obj is not object", () => {
        const userStore = useUserStore();
        userStore.saveUserInfo('Home 5');
        expect(userStore.user).empty
    });
    it("logOut function", () => {
        const userStore = useUserStore();
        userStore.saveUserInfo({fio:'test', address:'Home 5'})
        expect(userStore.user).not.empty
        userStore.logOut();
        expect(userStore.user).empty
    });
});
