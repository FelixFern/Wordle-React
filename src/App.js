import './style/style.css';
import './style/keyboard.css'
import './App.css';
import Box from './components/Box'
import React, { useState, useEffect } from 'react'

let word_list = ['', '', '', '', '']

function App() {
	useEffect(() => {
		document.title = ("Wordle Recreated")
	},[])
	const [currentWord, setWord] = useState([])
	const [currentLine, setLine] = useState(0)

	const guessing_word = "tests"

	const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const thirdRow = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<']
    
	return (
		<div className="App">
			<header>
				<h1>WORDLE</h1>
			</header>
			<div className='component'>
				<div className='text-box'>
					<Box character={currentLine == 0 ? currentWord : word_list[0]} state={currentLine > 0 ? true : false} words={guessing_word}></Box>
					<Box character={currentLine == 1 ? currentWord : word_list[1]} state={currentLine > 1 ? true : false} words={guessing_word}></Box>
					<Box character={currentLine == 2 ? currentWord : word_list[2]} state={currentLine > 2 ? true : false} words={guessing_word}></Box>
					<Box character={currentLine == 3 ? currentWord : word_list[3]} state={currentLine > 3 ? true : false} words={guessing_word}></Box>
					<Box character={currentLine == 4 ? currentWord : word_list[4]} state={currentLine > 4 ? true : false} words={guessing_word}></Box>
				</div>
				<div className='keyboard-component'>
					<div className='keyboard'>
						<div className='keyboard-row'>
							{firstRow.map((element) => {
								return (
									<div className='keyboard-key' key={firstRow.indexOf(element)} onClick={
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
									<div className='keyboard-key' key={secondRow.indexOf(element)} onClick={
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
							{thirdRow.map((element) => {
								return (
									<div className='keyboard-key' key={thirdRow.indexOf(element)} onClick={
										() => {
											if(element != "enter" && element != "<") {
												if(currentLine < 5 && currentWord.length < 5) {
													setWord((word) => [...word, element.toUpperCase()])
												}
											}
											else if(element == "<") {
												const word_copy = currentWord
												word_copy.splice(currentWord.length - 1, 1)
												setWord((word) => [...word_copy])
											}
											else if(element == "enter") {
												if(currentWord.length == 5) {
													word_list[currentLine] = currentWord
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
