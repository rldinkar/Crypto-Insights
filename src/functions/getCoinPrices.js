import axios from "axios";
export const getCoinPrices = (id, days,priceType) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-m2bYJMfCXFJcoEvuSBiyTEY8'
        }
    };
    const prices = axios
        .get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
            options
        )
        .then((response) => {
            return response.data[priceType];
        })
        .catch((err) => console.error(err));
    return prices;

}