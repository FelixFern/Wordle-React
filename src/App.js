import './style/style.css';
import './style/keyboard.css'
import './App.css';
import Box from './components/Box'
import React, { useState, useEffect } from 'react'

var wordList = require('word-list-json');
let word_list = ['', '', '', '', '']
let color_list = ['', '', '', '', '']
let keyboardColor = [['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n'],
					['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n'], 
					['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n']
					]

function App() {
	useEffect(() => {
		document.title = ("Wordle Recreated")
		window.addEventListener('keypress', e => {
			keyboardInput(e.key)
			console.log(e.key)
		});
	},[])
	const [currentWord, setWord] = useState([])
	const [currentLine, setLine] = useState(0)

	const guessing_word = "tests"

	const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const thirdRow = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<']

	function keyboardInput(alphabet) {
		if(alphabet != "Enter" && alphabet != "<") {
			if(currentLine < 5 && currentWord.length < 5) {
				setWord((word) => [...word, [alphabet.toUpperCase()]])
			}
		}
	}
	function setKeyboardColor(alphabet) {
		let bool = false
		let row = 0
		let ind = -1
		firstRow.forEach((n, i) => {
			if(n.toUpperCase() == alphabet) {
				bool = true
				row = 0
				ind = i
				// console.log(fRowColor)
			}
		})
		secondRow.forEach((n, i) => {
			if(n.toUpperCase() == alphabet) {
				bool = true
				row = 1
				ind = i
				// console.log(sRowColor)
			}
		})
		thirdRow.forEach((n, i) => {
			if(n.toUpperCase() == alphabet) {
				bool = true
				row = 2
				ind = i
				// console.log(tRowColor)
			}
		})
		return {bool, ind, row}
	}

	return (
		<div className="App">
			<header>
				<h1>WORDLE</h1>
			</header>
			<div className='component'>
				<div className='text-box'>
					<Box character={currentLine == 0 ? currentWord : word_list[0]} state={currentLine > 0 ? true : false} color={color_list[0]}></Box>
					<Box character={currentLine == 1 ? currentWord : word_list[1]} state={currentLine > 1 ? true : false} color={color_list[1]}></Box>
					<Box character={currentLine == 2 ? currentWord : word_list[2]} state={currentLine > 2 ? true : false} color={color_list[2]}></Box>
					<Box character={currentLine == 3 ? currentWord : word_list[3]} state={currentLine > 3 ? true : false} color={color_list[3]}></Box>
					<Box character={currentLine == 4 ? currentWord : word_list[4]} state={currentLine > 4 ? true : false} color={color_list[4]}></Box>
				</div>
				<div className='keyboard-component'>
					<div className='keyboard'>
						<div className='keyboard-row'>
							{firstRow.map((element) => {
								return (
									<div className='keyboard-key' id={keyboardColor[0][firstRow.indexOf(element)]} key={firstRow.indexOf(element)} onClick={
										() => {
											if(currentLine < 5 && currentWord.length < 5) {
												setWord((word) => [...word, element.toUpperCase()])
											}
										}
									}>
										<p>{element.toUpperCase()}</p>
									</div>
								)
							})}
						</div>
						<div className='keyboard-row'>
							{secondRow.map((element) => {
								return (
									<div className='keyboard-key' id={keyboardColor[1][secondRow.indexOf(element)]} key={secondRow.indexOf(element)} onClick={
										() => {
											if(currentLine < 5 && currentWord.length < 5) {
												setWord((word) => [...word, [element.toUpperCase()]])
											}
										}
									}>
										<p>{element.toUpperCase()}</p>
									</div>
								)
							})}
						</div>
						<div className='keyboard-row'>
							{thirdRow.map((element) => {
								return (
									<div className='keyboard-key' id={keyboardColor[2][thirdRow.indexOf(element)]} key={thirdRow.indexOf(element)} onClick={
										() => {
											if(element != "enter" && element != "<") {
												if(currentLine < 5 && currentWord.length < 5) {
													setWord((word) => [...word, [element.toUpperCase()]])
												}
											}
											else if(element == "<") {
												const word_copy = currentWord
												word_copy.splice(currentWord.length - 1, 1)
												setWord((word) => [...word_copy])
											}
											else if(element == "enter") {
												console.log("Row 1 : " + keyboardColor[0])
												console.log("Row 2 : " + keyboardColor[1])
												console.log("Row 3 : " + keyboardColor[2])
												if(currentWord.length == 5) {
													let colors = ""
													let color = ""
													currentWord.map((word, i) => {
														color = ""
														let available = false
														for(let j = 0; j < 5; j++) {
															if(word == guessing_word[j].toUpperCase() && i == j) {
																color = "G"
																let {bool, row, ind} = setKeyboardColor(word)
																if(bool) {
																	keyboardColor[row][ind] = "g"
																}
																console.log(keyboardColor)
																// console.log(word + "x" + guessing_word[j] + "xG")
																break
															}
															else if(word == guessing_word[j].toUpperCase() && i != j) {
																available = true
																let {bool, row, ind} = setKeyboardColor(word)
																if(bool && keyboardColor[row][ind] != "g") {
																	keyboardColor[row][ind] = "y"
																}
																// console.log(word + "x" + guessing_word[j] + "xY")
																console.log(keyboardColor)
																color = "Y"
															}
															else if(available == false){
																let {bool, row, ind} = setKeyboardColor(word)
																if(bool) {
																	keyboardColor[row][ind] = "N"
																}
																console.log(keyboardColor)
																// console.log(word + "x" + guessing_word[j] + "xN")
																color = "N"
															}
														}
														colors += color
													})
													word_list[currentLine] = currentWord
													color_list[currentLine] = colors
													colors = ""
													setLine(currentLine + 1)											
													setWord(word => [] )
												}
											}
										}
									}>
										<p>{element.toUpperCase()}</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>	
			</div>
		</div>
	);
}

export default App;
