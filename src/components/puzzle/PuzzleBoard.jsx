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
        const seconds = Math.floor((Date.now() - progress.startTime) / 1000)
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

    const shareText = `🧠 Logic Looper\n\nI solved today's puzzle!\n\n⏱ Time: ${elapsed}s\n⭐ Score: ${finalScore}\n💡 Hints used: ${hintsUsed}\n\nCan you beat my score?`

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

    // 📱 HAPTIC FEEDBACK (Single vibration for interaction)
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }

    const correct = validateAnswer(answer, puzzle.answer)
    setResult(correct)

    if (!correct) {
      // 📱 HAPTIC FEEDBACK (Double vibration for wrong answer)
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([50, 50, 50]);
      }
      return
    }

    const endTime = Date.now()
    const safeStart = startTime ?? endTime
    const timeTaken = Math.max(1, Math.floor((endTime - safeStart) / 1000))

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
      className="flex flex-col gap-6 items-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* PUZZLE DISPLAY */}
      <motion.div
        className="text-3xl md:text-4xl font-bold tracking-widest text-white text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {puzzle.puzzle.join(" ")}
      </motion.div>

      {/* TIMER */}
      <div className="text-sm font-mono text-[var(--accent-glow)] bg-emerald-900/30 px-4 py-1.5 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
        ⏱ {elapsed}s
      </div>

      {/* HINT SYSTEM */}
      {!alreadySolved && (
        <div className="flex flex-col items-center gap-3 w-full mt-2">
          {hintsUsed < MAX_HINTS && (
            <button
              onClick={showHint}
              className="text-xs text-zinc-400 hover:text-yellow-400 transition-colors py-2 px-4"
            >
              Need a hint? ({MAX_HINTS - hintsUsed} left)
            </button>
          )}

          <AnimatePresence>
            {currentHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-yellow-200/90 bg-yellow-900/20 px-4 py-3 rounded-lg border border-yellow-700/30 w-full max-w-[300px] text-center shadow-inner"
              >
                💡 {currentHint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* PATTERN PUZZLE INPUT */}
      {puzzle.type === "pattern" && !alreadySolved && (
        <div className="grid grid-cols-3 gap-3 w-full max-w-[240px] mt-4">
          {puzzle.options.map((shape, index) => (
            <button
              key={index}
              onClick={() => {
                startTimerIfNeeded()
                handleSubmit(shape)
              }}
              className="interactive-element text-3xl flex items-center justify-center aspect-square text-white"
            >
              {shape}
            </button>
          ))}
        </div>
      )}

      {/* SEQUENCE PUZZLE INPUT */}
      {puzzle.type === "sequence" && !alreadySolved && (
        <div className="flex gap-3 mt-4 w-full justify-center">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              startTimerIfNeeded()
              setInputValue(e.target.value)
            }}
            className="bg-[#27272a] border border-zinc-600 text-white rounded-lg px-4 py-2 w-28 text-center font-bold text-xl focus:border-[var(--accent-glow)] focus:ring-1 focus:ring-[var(--accent-glow)] outline-none transition shadow-inner"
            placeholder="?"
          />
          <button
            onClick={() => handleSubmit(Number(inputValue))}
            className="bg-[var(--accent-glow)] text-zinc-950 font-bold px-6 py-2 rounded-lg hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Submit
          </button>
        </div>
      )}

      {/* ALREADY SOLVED STATE */}
      <AnimatePresence>
        {alreadySolved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-5 mt-4"
          >
            <p className="text-[var(--accent-glow)] font-bold flex items-center gap-2 text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              Today's puzzle solved
            </p>
            <button
              onClick={shareResult}
              className="bg-white text-zinc-950 font-bold px-8 py-3 rounded-full hover:bg-zinc-200 active:scale-95 transition shadow-lg"
            >
              Share Result
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WRONG ANSWER FEEDBACK */}
      <AnimatePresence>
        {result === false && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 font-semibold mt-2"
          >
            Incorrect. Try again!
          </motion.p>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

export default PuzzleBoard