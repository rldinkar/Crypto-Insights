import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '../Grid';
import List from '../List';
import "./styles.css";
export default function TabComponent({ coins }) {
    const [value, setValue] = React.useState('grid');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        "& .Mui-selected": {
            color: "var(--blue) !important",
        },
        fontFamily: "Inter,sans-serif",
        fontWeight: 600,
        textTransform: "capitalize",
    };

    return (
        
            <TabContext value={value}>
                <TabList onChange={handleChange} variant='fullWidth'>
                    <Tab label="Grid" value="grid" sx={style} />
                    <Tab label="List" value="list" sx={style} />
                </TabList>

                <TabPanel value="grid">
                    <div className='grid-flex'>
                    {coins.map((coin,i)=>{
                        return  <Grid coin={coin} key={i} />;
                    })}   
                    </div>
                </TabPanel>
                <TabPanel value="list">
                <div className='list-flex'>
                    <table classname='list-flex'>
                        { coins.map((item,i)=>{
                          return  <List coin={item} key={i}/>
                        }) 
                        }                    
                    </table>
                    </div>


                </TabPanel>
            </TabContext>
        
    );
}
