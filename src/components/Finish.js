import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext, FinishContext } from '../contexts/global-state'
import '../style/finish.css'

function Finish(props) {
    const { finishToggle, setFinish } = useContext(FinishContext)
    const { darkMode, setDarkMode } = useContext(DarkModeContext)
    const [seconds, setSeconds] = useState()
    const [minutes, setMinutes] = useState()
    const [hours, setHours] = useState()
    var yesterday = new Date()
    yesterday.setDate(yesterday.getDate() + 1)
    const countdownDate = new Date(yesterday.toLocaleDateString()).getTime()

    useEffect(() => {
        const now = new Date().getTime()
        const updateDisplay = () => {
            const distance = countdownDate - now;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(hours.toString().length == 1) {
                setHours("0" + hours.toString())
            } else {
                setHours(hours)
            }
            if(minutes.toString().length == 1) {
                setMinutes("0" + minutes.toString())
            } else {
                setMinutes(minutes)
            }
            if(seconds.toString().length == 1) {
                setSeconds("0" + seconds.toString())
            } else {
                setSeconds(seconds)
            }
        }
        updateDisplay();
        setInterval(updateDisplay, 1000);
    })

    let guessDist_data = ['','','','','']
    
    const addGuessDist = (arr) => {
        arr.map(data => {
            for(let i = 0; i < data; i++) {
                guessDist_data[props.guess_dist.indexOf(data)] += "x"
            }
        })
        
    }
    addGuessDist(props.guess_dist)
    return (
        <div className={darkMode ? "finish-parent dark bg-dark" : "finish-parent light bg-light"  }>
            <div className='close-button' onClick={() => {
                console.log("Exit clicked!")
                if (finishToggle) { setFinish(false) }
                else { setFinish(true) }
            }}>
                <h2>x</h2>
            </div>
            <h1 className='title' id={darkMode ? "dark" : "light"}>STATISTICS</h1>
            <div className='stats-parent' id={darkMode ? "dark" : "light"}>
                <div className='stats'>
                    <div className='sub-stats'>
                        <h2>{props.played}</h2>
                        <p>Played</p>
                    </div>
                    <div className='sub-stats'>
                        <h2>{props.played != 0 ? (props.win/props.played * 100).toFixed() : 0}%</h2>
                        <p>Win %</p>
                    </div>
                    <div className='sub-stats'>
                        <h2>{props.curr_streak}</h2>
                        <p>Current<br/>Streak</p>
                    </div>
                    <div className='sub-stats'>
                        <h2>{props.max_streak}</h2>
                        <p>Max<br/>Streak</p>
                    </div>
                </div>
            </div>
            <h1 className='guess-dist-title'>GUESSING DISTRIBUTION</h1>
            <div className='guess-dist-parent'>
                <div className='guess-dist'>
                    <div className='sub-guess-dist'>
                        <p>1 :</p>
                        <div className='gap'></div>
                        <p className='data'>{guessDist_data[0]}</p>         
                        <p>{props.guess_dist[0]}</p>        
                    </div>
                    <div className='sub-guess-dist'>
                        <p>2 :</p>
                        <div className='gap'></div>
                        <p className='data'>{guessDist_data[1]}</p>         
                        <p>{props.guess_dist[1]}</p>        
                    </div>
                    <div className='sub-guess-dist'>
                        <p>3 :</p>
                        <div className='gap'></div>
                        <p className='data'>{guessDist_data[2]}</p>         
                        <p>{props.guess_dist[2]}</p>        
                    </div>
                    <div className='sub-guess-dist'>
                        <p>4 :</p>
                        <div className='gap'></div>
                        <p className='data'>{guessDist_data[3]}</p>         
                        <p>{props.guess_dist[3]}</p>        
                    </div>
                    <div className='sub-guess-dist'>
                        <p>5 :</p>
                        <div className='gap'></div>
                        <p className='data'>{guessDist_data[4]}</p>         
                        <p>{props.guess_dist[4]}</p>        
                    </div>
                </div>
            </div>
            <div className='countdown-parent'>
                <h1>Next Word <br></br>Countdown</h1>
                <div className='countdown'>
                    <h2>{hours}</h2>
                    <h2>:</h2>
                    <h2>{minutes}</h2>
                    <h2>:</h2>
                    <h2>{seconds}</h2>
                </div>
            </div>
        </div>
    )
}

export default Finish