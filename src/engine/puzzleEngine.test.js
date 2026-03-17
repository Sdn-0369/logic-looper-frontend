import { generateDailyPuzzle, generateSequencePuzzle, generatePatternPuzzle } from "./puzzleEngine"
import { test, expect } from "vitest"

test("same date returns same puzzle", () => {
  const puzzle1 = generateDailyPuzzle()
  const puzzle2 = generateDailyPuzzle()
  expect(puzzle1).toEqual(puzzle2)
})

test("puzzle has correct structure", () => {
  const puzzle = generateDailyPuzzle()
  expect(puzzle).toHaveProperty("type")
  expect(puzzle).toHaveProperty("puzzle")
  expect(puzzle).toHaveProperty("answer")
})

test("sequence puzzle follows pattern", () => {
  const puzzle = generateSequencePuzzle("test-seed")
  const seq = puzzle.puzzle

  expect(seq[1]).toBe(seq[0] * 2)
  expect(seq[2]).toBe(seq[1] * 2)
})

test("pattern puzzle repeats same shape", () => {
  const puzzle = generatePatternPuzzle("test-seed")
  const [a, b, c] = puzzle.puzzle

  expect(a).toBe(b)
  expect(b).toBe(c)
})