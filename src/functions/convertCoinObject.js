export const settingCoinObject = (data,setCoin) => {
    setCoin({
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      image: data.image?.large,
      desc: data.description?.en || "Description not available",
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || "N/A",
      total_volume: data.market_data?.total_volume?.usd || "N/A",
      current_price: data.market_data?.current_price?.usd || "N/A",
      market_cap: data.market_data?.market_cap?.usd || "N/A",
    });
  };
  