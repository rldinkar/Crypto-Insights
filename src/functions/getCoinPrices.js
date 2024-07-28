import axios from "axios";

export const getCoinPrices = async (id, days, priceType) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-m2bYJMfCXFJcoEvuSBiyTEY8'
    }
  };

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      options
    );
    if (response.data) {
      console.log("Prices>>>", response.data);
      if (priceType === "market_caps") {
        return response.data.market_caps;
      } else if (priceType === "total_volumes") {
        return response.data.total_volumes;
      } else {
        return response.data.prices;
      }
    }
  } catch (e) {
    console.error('Error fetching coin prices:', e.message);
    return [];
  }
};
