import seedrandom from "seedrandom"

export function generatePatternPuzzle(seed) {
  const rng = seedrandom(seed)

  const shapes = ["▲", "■", "●", "◆", "★", "⬟", "⬢"]

  const shape = shapes[Math.floor(rng() * shapes.length)]

  return {
    type: "pattern",
    puzzle: [shape, shape, shape, "?"],
    answer: shape
  }
}