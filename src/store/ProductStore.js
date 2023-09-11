import {defineStore} from 'pinia'
import {reactive, ref} from "vue";
export const useProductStore = defineStore('productStore', () =>{
    const products = reactive([]);
     function findProdById(id) {
         return this.products.find((i) =>{return +i.id === +id})
     };
    function getProductPrice(id) {
        return  this.products.find((i)=>{
            return i.id === id
        }).price;

    }
    function getProductList(){
        return this.products
    }
    async function getProductStore (){
        const res = await fetch(`https://fakestoreapi.com/products/`);
        const data = await res.json();
        this.products = data;
    }
    return{products,  getProductStore, getProductPrice, findProdById, getProductList}
})