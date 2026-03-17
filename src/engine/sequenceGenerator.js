import seedrandom from "seedrandom"

export function generateSequencePuzzle(seed) {
  const rng = seedrandom(seed)

  const start = Math.floor(rng() * 5) + 1
  const multiplier = Math.floor(rng() * 3) + 2

  const puzzle = [
    start,
    start * multiplier,
    start * multiplier ** 2,
    start * multiplier ** 3
  ]

  const answer = start * multiplier ** 4

  return {
    type: "sequence",
    puzzle,
    answer
  }
}