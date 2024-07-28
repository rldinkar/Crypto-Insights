import React from 'react'
import "./styles.css";
import TemporaryDrawer from './Drawer';
import Button from '../Button';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>CryptoInsights<span style={{color : "var(--blue)"}}>.</span></h1>
      <div className='links'>
        <Link to='/'><p className='link'>Home</p></Link>
        <Link to='/compare'><p className='link'>Compare</p></Link>
        <Link to='/watchlist'><p className='link'>Watchlist</p></Link>
        <Link to='/dashboard'><Button text={"DashBoard"} outlined={true} /></Link>

      </div>
      <div className='mobile-drawer'>
       <TemporaryDrawer/>
      </div>
    </div>
  )
}
