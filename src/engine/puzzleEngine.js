import seedrandom from "seedrandom"
import SHA256 from "crypto-js/sha256"


function getDailySeed() {

  const today = new Date().toLocaleDateString("sv-SE")

  const SECRET_KEY = "logic_looper_secret"

  const hash = SHA256(today + SECRET_KEY).toString()

  return hash

}


function generateSequencePuzzle(seed) {

  const rng = seedrandom(seed)

  const start = Math.floor(rng() * 5) + 1

  const sequence = [start]

  for (let i = 1; i < 4; i++) {
    sequence.push(sequence[i - 1] * 2)
  }

  const answer = sequence[sequence.length - 1] * 2

  return {
    type: "sequence",
    puzzle: sequence,
    answer: answer,
    hints: [
      "Look at how the numbers change",
      "Each number is multiplied by 2"
    ]
  }

}


function generatePatternPuzzle(seed) {

  const rng = seedrandom(seed)

  const shapes = ["▲", "■", "●", "◆", "★", "⬟", "⬢"]

  const shape = shapes[Math.floor(rng() * shapes.length)]

  const pattern = [shape, shape, shape]

  // pick 4 random options
  const shuffled = [...shapes].sort(() => rng() - 0.5)
  const options = shuffled.slice(0, 4)

  // ensure correct answer is included
  if (!options.includes(shape)) {
    options[Math.floor(rng() * options.length)] = shape
  }

  return {
    type: "pattern",
    puzzle: pattern,
    answer: shape,
    options,
    hints: [
      "Look at the repeating shape",
      "The same shape appears every time"
    ]
  }

}


export function generateDailyPuzzle() {

  const seed = getDailySeed()

  const rng = seedrandom(seed)

  const type = rng() > 0.5 ? "sequence" : "pattern"

  if (type === "sequence") {
    return generateSequencePuzzle(seed)
  }

  return generatePatternPuzzle(seed)

}