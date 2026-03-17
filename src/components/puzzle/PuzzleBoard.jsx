import { useState, useEffect } from "react"
import { validateAnswer } from "../../engine/validator"
import {
  saveDailyActivity,
  savePuzzleProgress,
  getPuzzleProgress
} from "../../db/indexedDB"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

function PuzzleBoard({ puzzle }) {

  const [result, setResult] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [alreadySolved, setAlreadySolved] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const [hintsUsed, setHintsUsed] = useState(0)
  const [currentHint, setCurrentHint] = useState(null)

  const MAX_HINTS = 2
  const today = new Date().toLocaleDateString("sv-SE")

  useEffect(() => {

    async function restoreProgress() {

      const progress = await getPuzzleProgress(today)

      if (!progress) return

      if (progress.completed) {

        setAlreadySolved(true)

        if (progress.finalTime) {
          setElapsed(progress.finalTime)
        }

        return
      }

      if (progress.started) {

        const seconds = Math.floor(
          (Date.now() - progress.startTime) / 1000
        )

        setStartTime(progress.startTime)
        setElapsed(seconds)
        setTimerRunning(true)

      }

    }

    restoreProgress()

  }, [])

  useEffect(() => {

    if (!timerRunning || !startTime) return

    const interval = setInterval(() => {

      const seconds = Math.floor((Date.now() - startTime) / 1000)
      setElapsed(seconds)

    }, 1000)

    return () => clearInterval(interval)

  }, [timerRunning, startTime])


  async function startTimerIfNeeded() {

    if (timerRunning || alreadySolved) return

    const now = Date.now()

    setStartTime(now)
    setTimerRunning(true)
    setElapsed(0)

    await savePuzzleProgress({
      date: today,
      started: true,
      startTime: now,
      completed: false
    })

  }


  function showHint() {

    if (hintsUsed >= MAX_HINTS) return

    const hint = puzzle.hints[hintsUsed]

    setCurrentHint(hint)
    setHintsUsed(hintsUsed + 1)

  }


  function triggerConfetti() {

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    })

  }


  function shareResult() {

    const baseScore = 100
    const penalty = hintsUsed * 20
    const finalScore = baseScore - penalty

    const shareText =
      `🧠 Logic Looper

I solved today's puzzle!

⏱ Time: ${elapsed}s
⭐ Score: ${finalScore}
💡 Hints used: ${hintsUsed}

Can you beat my score?`

    if (navigator.share) {

      navigator.share({
        title: "Logic Looper",
        text: shareText,
        url: window.location.href
      }).catch(() => { })

    } else {

      navigator.clipboard.writeText(shareText)
      alert("Result copied to clipboard!")

    }

  }


  async function handleSubmit(answer) {

    if (alreadySolved) return

    const correct = validateAnswer(answer, puzzle.answer)

    setResult(correct)

    if (!correct) return

    const endTime = Date.now()

    const safeStart = startTime ?? endTime

    const timeTaken = Math.max(
      1,
      Math.floor((endTime - safeStart) / 1000)
    )

    const baseScore = 100
    const penalty = hintsUsed * 20
    const finalScore = baseScore - penalty

    setTimerRunning(false)
    setAlreadySolved(true)
    setElapsed(timeTaken)

    triggerConfetti()

    await saveDailyActivity({
      date: today,
      solved: true,
      score: finalScore,
      hintsUsed: hintsUsed,
      timeTaken: timeTaken,
      difficulty: 1,
      synced: false
    })

    await savePuzzleProgress({
      date: today,
      started: true,
      startTime: safeStart,
      completed: true,
      finalTime: timeTaken
    })

  }


  return (

    <motion.div
      className="flex flex-col gap-4 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <motion.div
        className="text-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {puzzle.puzzle.join(" ")}
      </motion.div>

      <div className="text-sm text-gray-600">
        ⏱ {elapsed}s
      </div>

      {!alreadySolved && (
        <div className="flex flex-col items-center gap-2">

          <div className="text-sm text-gray-500">
            Hint: {MAX_HINTS - hintsUsed} remaining
          </div>

          {hintsUsed < MAX_HINTS && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showHint}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Show Hint
            </motion.button>
          )}

          <AnimatePresence>
            {currentHint && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-700"
              >
                💡 {currentHint}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      <AnimatePresence>
        {alreadySolved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-2"
          >

            <p className="text-green-500 font-semibold">
              ✓ Today's puzzle already solved
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareResult}
              className="bg-[#1A2A44] text-white px-4 py-1 rounded"
            >
              Share Result
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>

      {puzzle.type === "pattern" && !alreadySolved && (

        <div className="flex gap-4 text-2xl flex-wrap justify-center">

          {puzzle.options.map((shape, index) => (

            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                startTimerIfNeeded()
                handleSubmit(shape)
              }}
              className="px-2"
            >
              {shape}
            </motion.button>

          ))}

        </div>

      )}

      {puzzle.type === "sequence" && !alreadySolved && (

        <div className="flex gap-3">

          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              startTimerIfNeeded()
              setInputValue(e.target.value)
            }}
            className="border rounded px-3 py-1 w-24 text-center"
            placeholder="?"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubmit(Number(inputValue))}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Submit
          </motion.button>

        </div>

      )}

      <AnimatePresence>
        {result === true && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-500">
            Correct!
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result === false && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-500">
            Wrong!
          </motion.p>
        )}
      </AnimatePresence>

    </motion.div>
  )

}

export default PuzzleBoard