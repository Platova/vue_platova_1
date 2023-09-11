import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore',{
    state: () => ({
        user: {},
    }),
    getters:{
        isEmpty(){
            return !this.user.hasOwnProperty('name');
        }
    },
    actions:{
        logIn(name) {
            this.user.name = name;
        },
        saveUserInfo(obj) {debugger;
            console.log(obj)
            for (let key in obj) {
                if (this.user.hasOwnProperty(key)){
                    this.user[key] = obj[key];
                } else {

                    this.user[key] = obj[key];}
            }

        },
        logOut() {
            for (const prop of Object.keys(this.user)) {
                delete this.user[prop];
            }
        }
    }
})