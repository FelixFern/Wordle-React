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
            <h2>STATISTICS</h2>
        </div>
    )
}

export default Finish