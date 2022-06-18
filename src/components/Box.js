import React, { useState, useContext } from 'react'
import { DarkModeContext } from '../contexts/global-state'
import '../style/box.css'

function Box(props) {
    const { darkMode, setDarkMode } = useContext(DarkModeContext)
    return (
        <div className='box'>
            <div className={props.state ? "box-char " + props.color[0] : "box-char"} id={darkMode ? "dark" : "light"}>
                <p>{props.character[0]}</p>
            </div>
            <div className={props.state ? "box-char " + props.color[1] : "box-char"} id={darkMode ? "dark" : "light"}>
                <p>{props.character[1]}</p> 
            </div>
            <div className={props.state ? "box-char " + props.color[2] : "box-char"} id={darkMode ? "dark" : "light"}>
                <p>{props.character[2]}</p>
            </div>
            <div className={props.state ? "box-char " + props.color[3] : "box-char"} id={darkMode ? "dark" : "light"}>
                <p>{props.character[3]}</p>
            </div>
            <div className={props.state ? "box-char " + props.color[4] : "box-char"} id={darkMode ? "dark" : "light"}>
                <p>{props.character[4]}</p>
            </div>
        </div>
    )
}

export default Box