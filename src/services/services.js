import axios from "axios";

export function getCardList(cardData) {
    const url = `https://fakestoreapi.com/products`
    axios.get(url)
        .then(responce => {
            cardData.value = responce.data;
        })
        .catch(e => {
            console.log(e)
        })
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


