import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import Header from '../components/Common/Header';
import { settingCoinObject } from '../functions/convertCoinObject';
import List from '../components/DashBoard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import SelectDays from '../components/Coin/selectDays';
import { settingChartData } from '../functions/settingChartData';
import PriceToggle from '../components/Coin/PriceToggle.js';

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState({});
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [priceType, setPriceType] = useState('prices');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, days, priceType]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const coinData = await getCoinData(id);
      console.log('Coin data:', coinData);
      if (coinData) {
        settingCoinObject(coinData, setCoinData);
        const prices = await getCoinPrices(id, days, priceType);
        console.log('Prices data:', prices);
        if (Array.isArray(prices) && prices.length > 0) {
          settingChartData(setChartData, prices);
        } else {
          setError('No prices data available');
          console.error('Prices data is empty or not an array:', prices);
        }
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDaysChange = async (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }

    setIsLoading(true);
    setError(null);

    const daysValue = event.target.value;
    setDays(daysValue);

    try {
      const prices = await getCoinPrices(id, daysValue, priceType);
      console.log('Prices fetched on days change:', prices);
      if (Array.isArray(prices) && prices.length > 0) {
        settingChartData(setChartData, prices);
      } else {
        setError('No prices data available');
        console.error("Prices data is empty or not an array:", prices);
      }
    } catch (error) {
      setError('Failed to fetch prices');
      console.error("Error fetching prices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    setError(null);

    try {
      const prices = await getCoinPrices(id, days, newType);
      console.log('Prices fetched on price type change:', prices);
      if (Array.isArray(prices) && prices.length > 0) {
        settingChartData(setChartData, prices);
      } else {
        setError('No prices data available');
        console.error('Prices data is empty or not an array:', prices);
      }
    } catch (error) {
      setError('Failed to fetch coin prices');
      console.error('Error fetching coin prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className='grey-wrapper'>
            <List coin={coinData} />
          </div>
          <div className='grey-wrapper'>
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceToggle priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <div className='grey-wrapper'>
            <CoinInfo name={coinData.name} desc={coinData.desc} />
          </div>
        </>
      )}
    </div>
  );
}

export default CoinPage;
