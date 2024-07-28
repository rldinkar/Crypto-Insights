import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
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
  const {id}=useParams();
  const [isLoading, setisLoading]=useState(true);
  const [coinData,setcoinData]=useState([]);
  const [days,setDays]=useState(30);
  const [ChartData ,setChartData]=useState({ labels: [], datasets: [{}] });
  const [priceType, setPriceType] = useState('prices');
useEffect(() => {
  if(id)
  {
    fetchData();
  }
}, []);
async function  fetchData()
  {
    setisLoading(true);
    const coinData = await getCoinData(id);
    if(coinData)
    {
      settingCoinObject(coinData,setcoinData);
      const prices = await getCoinPrices(id,days,priceType);
      if(prices.length >0)
      {
        settingChartData(setChartData,prices);
        setisLoading(false);
      }
    }
  }
  const handleDaysChange = async (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }
  
    setisLoading(true);
  
    const daysValue = event.target.value;
    const prices = await getCoinPrices(id, daysValue, priceType);
  
    if (Array.isArray(prices) && prices.length > 0) {
      settingChartData(setChartData, prices);
      setisLoading(false);
    } else {
      console.error("Prices is undefined or not an array");
      setisLoading(false); // Ensure to stop loading if there's an error
    }
  
    setDays(daysValue);
  };
  


  const handlePriceTypeChange = async (event, newType) => {
    setisLoading(true);
    setPriceType(newType);

    try {
        const prices = await getCoinPrices(id, days, newType);
        if (prices && prices.length > 0) {
            settingChartData(setChartData, prices);
        } else {
            console.error('No prices received or prices is empty:', prices);
        }
    } catch (error) {
        console.error('Error fetching coin prices:', error);
    } finally {
        setisLoading(false);
    }
};


  return (
    <div>
       <Header/>
       {isLoading ? <Loader/> : (<>
        <div className='grey-wrapper' >
        <List coin={coinData} />
        </div>
        <div className='grey-wrapper'>
        <SelectDays days={days} handleDaysChange={handleDaysChange} />
        <PriceToggle priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
        <LineChart chartData={ChartData} priceType={priceType} />
        </div>
      <div  className='grey-wrapper'>
        <CoinInfo name={coinData.name} desc={coinData.desc}/>
       </div>
       </>
      )
       }
    </div>
   
    
  )
}

export default CoinPage
