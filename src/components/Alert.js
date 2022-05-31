import React from 'react'
import '../style/alert.css'

function Alert(props) {
    return (
        <div className='alert-parent'>
            <h2>
                {props.text}
            </h2>
        </div>
    )
}

export default Alert