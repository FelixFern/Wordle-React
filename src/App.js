import './style/style.css';
import './style/keyboard.css'

import { MdLeaderboard, MdLightMode } from "react-icons/md";
import Box from './components/Box'
import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import Alert from './components/Alert';
import wordList from './words.json'
import guessList from './possible_guess.json'
import englishWord from './english_word.json'
import Finish from './components/Finish';
import { FinishContext, DarkModeContext } from './contexts/global-state';

let word_list = ['', '', '', '', '']
let color_list = ['', '', '', '', '']
let keyboardColor = [['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n'],
					['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n'], 
					['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n']]
let guessing_word = ''

function App() {
	const [currentWord, setWord, currentWordRef] = useState([])
	const [currentLine, setLine, currentLineRef] = useState(0)
	const [solved, setSolved, solvedRef] = useState(false) 
	const [popupToggle, setPopup, popupToggleRef] = useState({show : false, text : ''})
	const [finishToggle, setFinish, finishToggleRef] = useState(false)
	const [darkMode, setDarkMode, darkModeRef] = useState(true)
	const [userData, setUserData, userDataRef] = useState({'win': 0, 'guess_dist': [0,0,0,0,0], 'played': 0, 'max_streak': 0, 'curr_streak': 0, 'prev_win': false, 'last_word':''})
	const [pastWordle, setPastWordle, pastWordleRef] = useState({'word' : ['','','','',''], 'color' : ['','','','',''], 'curr_line' : 0})

	const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
	const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
	const thirdRow = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<']

	useEffect(() => {
		// console.log(englishWordList[0])
		document.title = ("Wordle Recreated")
		window.addEventListener('keydown', e => {
			if((e.keyCode >= 65 && e.keyCode <= 90) || e.key == "Enter" || e.key == "Backspace") {
				keyboardInput(e.key, currentWord)
			}
			// console.log(e.key)
		});
		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);
		// console.log(words)
		wordList.map(word => {
			if(word.Date == today.toLocaleDateString()) {
				guessing_word = word.Word
				// guessing_word = 'tests'
				// console.log(guessing_word)
			} 
		});
		const userData = JSON.parse(localStorage.getItem('userData'))
		if(userData) { 
			setUserData(userData)
		}
		const pastWordle = JSON.parse(localStorage.getItem('pastWordle'))
		if(pastWordle) { 
			setPastWordle(pastWordle)
			setLine(pastWordle.curr_line)
		}
		// console.log(userData.last_word)
		if(userData) {
			if(userData.last_word == guessing_word) {
				// word_list = pastWordle.word
				// color_list = pastWordle.color
				setSolved(true)
				setFinish(true)
			} else if (userData.last_word != guessing_word) {
				setPastWordle({'word' : ['','','','',''], 'color' : ['','','','',''], 'curr_line' : 0})
				setLine(0)
			}
		}
	},[])

	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(userData))
	}, [userData])

	useEffect(() => {
		localStorage.setItem('pastWordle', JSON.stringify(pastWordle))
	}, [pastWordle])
	
	const checkWord = (check) => {
		let isInList = false
		englishWord.words.map((guess) => {
			// console.log(word.toUpperCase())			
			if(check == guess.toUpperCase()) {
				isInList = true
			}
		})
		if(isInList) {
			return true 
		} else { 
			return false
		}
	}
	const sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
	async function enterClicked() {
		// console.log(guessing_word)
		if(currentWordRef.current.length == 5 && checkWord(currentWordRef.current.join(''))) {
			// console.log('entered')
			let colors = ""
			let color = ""
			let tempGuessingWord = guessing_word.split('')
			// console.log(tempGuessingWord)
			currentWordRef.current.map((word, i) => {
				color = ""
				let available = false
				for(let j = 0; j < 5; j++) {
					if(word == tempGuessingWord[j].toUpperCase() && i == j) {
						let {bool, row, ind} = setKeyboardColor(word)
						if(bool) {
							keyboardColor[row][ind] = "g"
						}
						tempGuessingWord[j] = "+"
						// console.log(word + "x" + guessing_word[j] + "xG")
						color = "G"
						break

					}
					else if(word == tempGuessingWord[j].toUpperCase() && i != j) {
						available = true
						let {bool, row, ind} = setKeyboardColor(word)
						if(bool && keyboardColor[row][ind] != "g") {
							keyboardColor[row][ind] = "y"
						}
						tempGuessingWord[j] = "+"
						// console.log(word + "x" + guessing_word[j] + "xY")
						color = "Y"
						break
					}
					else if(available == false){
						let {bool, row, ind} = setKeyboardColor(word)
						if(bool) {
							keyboardColor[row][ind] = "N"
						}
						// console.log(word + "x" + guessing_word[j] + "xN")
						color = "N"
					}
				}
				colors += color
			})
			// console.log(tempGuessingWord)
			word_list[currentLineRef.current] = currentWordRef.current
			color_list[currentLineRef.current] = colors
			setPastWordle({'word' : word_list, 'color' : color_list, 'curr_line' : currentLineRef.current + 1})
			setLine(currentLineRef.current + 1)											
			setWord(word => [])

			let prevUserData = JSON.parse(localStorage.getItem('userData'))
			let prevGuessDist = prevUserData.guess_dist
			let prevPrevWin= prevUserData.prev_win
			let prevCurrentStreak = prevUserData.curr_streak
			let prevMaxStreak = prevUserData.max_streak

			if(colors == "GGGGG") {
				console.log("TESTS")
				setSolved(true)
				setPopup({show : true, text : "Nice job!"})
				await sleep(500)
				setPopup({show : false, text : "Nice job!"})
				setFinish(true)
				
				prevGuessDist[currentLineRef.current - 1] += 1

				if(prevPrevWin) {
					prevCurrentStreak += 1
				} else {
					prevPrevWin = true
					prevCurrentStreak = 0
				}
				if(prevCurrentStreak > prevMaxStreak) {
					prevMaxStreak = prevCurrentStreak
				}
				setUserData({'win': prevUserData.win + 1, 'guess_dist': prevGuessDist, 'played': prevUserData.played + 1, 'max_streak' : prevMaxStreak, 'curr_streak': prevCurrentStreak, 'prev_win': prevPrevWin, 'last_word': guessing_word})
			}
			colors = ""
			if (currentLineRef.current == 5 && !solvedRef.current) {
				// console.log("test")
				setPopup({show : true, text : guessing_word})
				await sleep(500)
				setFinish(true)
				setSolved(true)
				if(prevPrevWin) {
					prevPrevWin = false
					prevCurrentStreak = 1
				} else {
					prevCurrentStreak = 1
				}
				setUserData({'win': prevUserData.win, 'guess_dist': prevGuessDist, 'played': prevUserData.played + 1, 'max_streak' : prevMaxStreak, 'curr_streak': prevCurrentStreak, 'prev_win': prevPrevWin, 'last_word': guessing_word})
			}
		} else if ((!checkWord(currentWordRef.current.join('')) && currentLineRef.current != 5)  || !solvedRef.current) {
			setPopup({show : true, text : "Not in word list"})
			await sleep(500)
			setPopup({show : false, text : "Not in word list"})
		} 
	}

	function backspaceClicked() {
		const word_copy = currentWordRef.current
		word_copy.splice(currentWordRef.current.length - 1, 1)
		setWord((word) => [...word_copy])
	}

	function keyboardInput(alphabet) {
		if(alphabet != "Enter" && alphabet != "Backspace" && !solvedRef.current && !finishToggleRef.current) {
			if(currentLine < 5 && currentWordRef.current.length < 5) {
				setWord((word) => [...word, [alphabet.toUpperCase()]])
			}
		} else if(alphabet == "Enter" && !solvedRef.current && !finishToggleRef.current) {
			enterClicked()
		} else if (alphabet == "Backspace" && !solvedRef.current && !finishToggleRef.current) {
			backspaceClicked()
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
		<DarkModeContext.Provider value={{ darkMode, setDarkMode}}>
		<FinishContext.Provider value={{ finishToggle, setFinish }}>
		<div className={darkMode ? "background bg-dark" : "background bg-light"} id={darkMode ? "dark bg-dark" : "light bg-light"}></div>
		<div>
			<header id={darkMode ? "dark bg-dark" : "light bg-light"}>
				<h1 className='title' id={darkMode ? "dark" : "light"}>WORDLE</h1>
				<div className='setting' id={darkMode ? "dark" : "light"}>
					<i><MdLeaderboard onClick={() => {
						// console.log(finishToggle)
						if(finishToggle) {setFinish(false)}
						else {setFinish(true)}
					}}></MdLeaderboard></i>
					<i><MdLightMode onClick={() => {
						if(darkMode) {setDarkMode(false)}
						else {setDarkMode(true)}
					}}>
						</MdLightMode></i>
				</div>
			</header>
			<div className={popupToggle.show ? "alert alert-show" : "alert"} id={darkMode ? "dark bg-white" : "light bg-dark"}>
				<Alert
					text = {popupToggle.text}
					></Alert>
			</div>
			<div className={finishToggle ? "finish finish-show" : "finish"} id={darkMode ? "dark" : "light"}>
				<div className='darken' onClick={
					() => {
						setFinish(false)
					}
				}></div>
				<Finish
					win={userData.win}
					guess_dist={userData.guess_dist}
					played={userData.played}
					max_streak={userData.max_streak}
					curr_streak={userData.curr_streak}	
				></Finish>
			</div>
			<div className='component'>
				<div className='text-box'>
					<Box character={currentLine == 0 ? currentWord : pastWordle.word[0]} state={currentLine > 0 ? true : false} color={pastWordle.color[0]}></Box>
					<Box character={currentLine == 1 ? currentWord : pastWordle.word[1]} state={currentLine > 1 ? true : false} color={pastWordle.color[1]}></Box>
					<Box character={currentLine == 2 ? currentWord : pastWordle.word[2]} state={currentLine > 2 ? true : false} color={pastWordle.color[2]}></Box>
					<Box character={currentLine == 3 ? currentWord : pastWordle.word[3]} state={currentLine > 3 ? true : false} color={pastWordle.color[3]}></Box>
					<Box character={currentLine == 4 ? currentWord : pastWordle.word[4]} state={currentLine > 4 ? true : false} color={pastWordle.color[4]}></Box>
				</div>
				<div className='keyboard-component'>
					<div className='keyboard'>
						<div className='keyboard-row'>
							{firstRow.map((element) => {
								return (
									<div className='keyboard-key' id={keyboardColor[0][firstRow.indexOf(element)]} key={firstRow.indexOf(element)} onClick={
										() => {
											if(currentLine < 5 && currentWord.length < 5 && solved == false) {
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
											if(currentLine < 5 && currentWord.length < 5 && solved == false) {
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
												if(currentLine < 5 && currentWord.length < 5 && solved == false) {
													setWord((word) => [...word, [element.toUpperCase()]])
												}
											}
											else if(element == "<") {
												backspaceClicked()
											}
											else if(element == "enter") {
												enterClicked()
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
		</FinishContext.Provider>
		</DarkModeContext.Provider>
	);
}

export default App;
