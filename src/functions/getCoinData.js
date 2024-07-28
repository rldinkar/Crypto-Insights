import axios from "axios";
export const getCoinData = (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-m2bYJMfCXFJcoEvuSBiyTEY8'
        }
    };
    const myData = axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, options)
        .then(response => {
            return response.data;
        })
        .catch(err => console.error(err));
        return myData;
}
