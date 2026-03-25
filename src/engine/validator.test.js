import { validateAnswer } from "./validator"
import { test, expect } from "vitest"

test("validates correct answer", () => {
  expect(validateAnswer(8, 8)).toBe(true)
})

test("rejects wrong answer", () => {
  expect(validateAnswer(5, 8)).toBe(false)
})