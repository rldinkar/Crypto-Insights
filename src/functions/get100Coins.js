import axios from "axios";

export const get100Coins = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-m2bYJMfCXFJcoEvuSBiyTEY8'
    }
  };

  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options);
    return response.data; 
  } catch (err) {
    console.error(err);
    return [];
  }
};
