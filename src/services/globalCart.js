import {computed, ref} from "vue";
import {getCardList, getCardPrice} from "./services"
export const cartArray = ref([]);
export function addDelToCart(id, value) {
    let product = cartArray.value.find((i)=>{
        return i.id == id;
    });
    if (product) {
        product.count += value;
        if ( +product.count === 0) {
            cartArray.value = cartArray.value.filter((j)=> {
                return j.id != product.id
            })
        }
    } else {
        cartArray.value.push({id:id, count: 1})
    }
};
export function clearCartArray(){
    cartArray.value.length = 0;
}
export const cartProductCount = computed(calcCount);
function calcCount(){
    let sum = 0
    cartArray.value.forEach(function(item){
        sum += item.count
    })
    return sum;
}

export function getProductFromCart(id) {
    return cartArray.value.find((i)=>{
        return i.id == id
    })
}
export function dellProductFromCard(id){
    cartArray.value = cartArray.value.filter((i)=>{
        return i.id != id
    })
}

export function calcSumm(){
    let sum = 0;
    cartArray.value.forEach(function(item){
        sum += item.count * +getCardPrice(item.id);
    })
    return sum.toFixed(2);
}