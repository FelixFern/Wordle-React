import React, { useContext } from 'react'
import { DarkModeContext } from '../contexts/global-state'
import '../style/alert.css'

function Alert(props) {
    const {darkMode, setDarkMode} = useContext(DarkModeContext)
    return (
        <div className={darkMode ? "alert-parent light bg-light" : "alert-parent light bg-dark"}>
            <h2 className={darkMode ? "light" : "dark"}>
                {props.text}
            </h2>
        </div>
    )
}

export default Alert