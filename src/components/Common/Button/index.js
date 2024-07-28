import React from 'react' 
import "./styles.css";
export default function  Button({text,onClick,outlined}) {
  return (
    <div className={outlined ? "outlined-btn" : "btn"}>{text}</div>
  )
}
