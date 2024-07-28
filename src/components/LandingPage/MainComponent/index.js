import React from 'react'
import "./styles.css";
import Button from '../../Common/Button';
import phone from "../../../assets/phone.png";
import gradient from "../../../assets/gradient.png";
import { motion } from "framer-motion";
function MainComponent() {
  return (
    <div className='flex-info'>
      <div className='left-compo'>
        <motion.h1 className='crypto-heading' initial={{ opacity: 0, scale: 0, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 }}>Track Crypto</motion.h1>
        <motion.h1 className='real-time-heading' initial={{ opacity: 0, scale: 0, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 ,delay:0.5 }} >Real Time.</motion.h1>
        <motion.p className='info-text'  initial={{ opacity: 0, scale: 0, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 ,delay:1}}>
          Track crypto through a public api in real time. Visit the dashboard to
          do so!
        </motion.p >
        <motion.div className='btn-flex'  initial={{ opacity: 0, scale: 0, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 ,delay:1.5 }}>
          <Button text={"DashBoard"} />
          <Button text={"Share"} outlined={true} />
        </motion.div>
      </div>
      <div className='right-compo'>
        <motion.img src={phone} className='phone-img' initial={{  y: -20 }} animate={{y: 20 }} transition={{ type:"smooth" ,repeatType:"mirror", duration:2,repeat:Infinity}} />
        <img src={gradient} className='gradient-img' />

      </div>
    </div>
  )
}

export default MainComponent;