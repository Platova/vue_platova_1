import {defineStore} from 'pinia'
import {getCardPrice} from "../services/services.js";
import {useProductStore} from "../store/ProductStore";


export const useCartStore = defineStore('cartStore',{
    state: () => ({
        cart: [],
        count:0
    }),
    getters:{

    },
    actions:{
        getCount() {
            this.count = 0;
            this.cart.forEach((el)=>{
                this.count += el.count
            })
        },
        addDelToCart (id, value) {
            let prodInCart = this.cart.find((i) => {
                return i.id == id;
            });
            this.count += value;
            if (prodInCart) {
                prodInCart.count += value;
                if (+prodInCart.count === 0) {
                    this.cart = this.cart.filter((j) => {
                        return j.id != prodInCart.id
                    })
                }
            } else {
                this.cart.push({id: id, count: 1})
            }
        },
        getProductFromCart(id) {
            return this.cart.find((i) => {
                return +i.id === +id
            })
        },
        dellProductFromCard(id) {
            this.cart = this.cart.filter((i)=>{
                return i.id != id
            });
            this.getCount();
        },
        clearCartArray() {
            this.cart.length = 0;
            this.count = 0;
        },
        getCartSumm() {
        const storeProduct = useProductStore();
            let sum = 0;
            this.cart.forEach(function(item){
                sum += item.count * +storeProduct.getProductPrice   (item.id);
            })
            return sum.toFixed(2);
       }
    }
})