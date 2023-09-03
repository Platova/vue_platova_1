import axios from "axios";
import {ref} from "vue";
export const cards = ref([]);
getCardList(cards);
export function getCardList(cardData, id) {
    const url = `https://fakestoreapi.com/products/`+ (id ? id :'');
    axios.get(url)
        .then(responce => {
            cardData.value = responce.data;
        })
        .catch(e => {
            console.log(e)
        })
}
export function getCardPrice(id) {
    return cards.value.find((i)=>{
        return i.id === id
    }).price;

}
export function pushOrder(data, callback) {
    const url = 'https://httpbin.org/post';
    try {
        const response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        callback();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


