import React, { useState } from 'react'
import '../style/box.css'

function Box(props) {
    const [wordColor, setColor] = useState([])
    
    if(props.state) {
        console.log("test")
        console.log(props.character)
        for(let i; i < 5; i++) {
            for(let j; j < 5; j++) {
                if(props.character[i] == props.words[j] && i == j) {
                    setColor((color) => [...color, 'G'])
                    break
                } else if(props.character[i] == props.words[j] && i != j) {
                    setColor((color) => [...color, 'Y'])
                    break
                } else {
                    setColor((color) => [...color, 'N'])
                }
            }
        }
    }
    return (
        <div className='box'>
            <div className={props.state ? "box-char " + wordColor[0] : "box-char"}>
                <p>{props.character[0]}</p>
            </div>
            <div className={props.state ? "box-char " + wordColor[1] : "box-char"}>
                <p>{props.character[1]}</p> 
            </div>
            <div className={props.state ? "box-char " + wordColor[2] : "box-char"}>
                <p>{props.character[2]}</p>
            </div>
            <div className={props.state ? "box-char " + wordColor[3] : "box-char"}>
                <p>{props.character[3]}</p>
            </div>
            <div className={props.state ? "box-char " + wordColor[4] : "box-char"}>
                <p>{props.character[4]}</p>
            </div>

        </div>
  )
}

export default Box