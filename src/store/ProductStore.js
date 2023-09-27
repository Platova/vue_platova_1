import {defineStore} from 'pinia'
import {reactive} from "vue";
export const useProductStore = defineStore('productStore', () =>{
    const products = reactive([]);
     function findProdById(id) {
         return this.products.find((i) =>{return +i.id === +id})
     };
    function getProductPrice(id) {
        let prod = this.products.find((i)=>{
            return i.id === id
        })
        return prod ? prod.price : null;

    }
    function getProductList(){
        return this.products
    }
    function addProduct(data){
        data.id = this.products.length + 1;
        this.products.push(data);
    }
    async function getProductStore (){
        const res = await fetch(`https://fakestoreapi.com/products/`);
        const data = await res.json();
        this.products = data;
    }
    return{products,  getProductStore, getProductPrice, findProdById, getProductList, addProduct}
})