import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Common/Header';
import TabComponent from '../components/DashBoard/TabsComponent';
import Search from '../components/DashBoard/Search';
import PaginationControlled from '../components/DashBoard/Pagination';
import Loader from '../components/Common/Loader';

function Dashboard() {
    const [search, setSearch] = useState("");
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const onSearchChange = (e) => {
        setSearch(e.target.value)
    }

    var filteredCoins = coins.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase());
    })
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-m2bYJMfCXFJcoEvuSBiyTEY8'
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        var initialCount = (value - 1) * 10;
        setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
    };

    const getData = () => {
        setLoading(true);
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
            .then(response => {
                setCoins(response.data);
                setPaginatedCoins(response.data.slice(0, 10));
                setLoading(false);

            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <Header />
            {loading ? (<Loader/>) : (
                <>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabComponent coins={search ? filteredCoins : paginatedCoins} />
                    {
                        !search && (<PaginationControlled
                            page={page}
                            handlePageChange={handlePageChange} />)}
                </>
            )}
            
        </>
        
        

    );
}

export default Dashboard;
