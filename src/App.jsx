import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const [timer, setTimer] = useState(10)
  const [rollCount, setRollCount] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
      return
    }
    setTimer(10)
    setTotalTime(0) // Reset total time on new game
  }, [gameWon])

  useEffect(() => {
    if (gameWon) return
    if (timer === 0) {
      rollDice()
      setTimer(10)
      return
    }
    const interval = setInterval(() => {
      setTimer(t => t - 1)
      setTotalTime(t => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    if (!gameWon) {
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ?
          die :
          { ...die, value: Math.ceil(Math.random() * 6) }
      ))
      setRollCount(count => count + 1)
    } else {
      setDice(generateAllNewDice())
      setRollCount(0)
    }
    setTimer(10)
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    ))
  }

  const diceElements = dice.map(dieObj =>
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)} />)

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      <div className="stats">
        <span>Rolls: {rollCount}</span>
        <span>Total Time: {totalTime}s</span>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="timer">
        {gameWon ? "🎉" : `⏰ ${timer}s`}
      </div>
      {gameWon && <h2>You win!</h2>}
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}