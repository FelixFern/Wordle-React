import React, {useContext} from 'react'
import { FinishContext } from '../contexts/global-state'
import '../style/finish.css'

function Finish(props) {
    const { finishToggle, setFinish } = useContext(FinishContext)
    return (
        <div className='finish-parent'>
            <div className='close-button' onClick={() => {
                console.log("Exit clicked!")
                if (finishToggle) { setFinish(false) }
                else { setFinish(true) }
            }}>
                <h2>x</h2>
            </div>
            <h1 className='title'>STATISTICS</h1>
            <div className='stats-parent'>
                <div className='stats'>
                    <div className='sub-stats'>
                        <h2>{props.played}</h2>
                        <p>Played</p>
                    </div>
                    <div className='sub-stats'>
                        <h2>{(props.win/props.played * 100).toFixed()}%</h2>
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
                        <p>1</p>
                    </div>
                    <div className='sub-guess-dist'>
                        <p>2</p>
                    </div>
                    <div className='sub-guess-dist'>
                        <p>3</p>
                    </div>
                    <div className='sub-guess-dist'>
                        <p>4</p>
                    </div>
                    <div className='sub-guess-dist'>
                        <p>5</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Finish