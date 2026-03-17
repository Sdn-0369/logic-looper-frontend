import { calculateStreak } from "./streakEngine"
import { test, expect } from "vitest"

test("calculates continuous streak", () => {
  const activity = {
    "2026-03-17": { solved: true },
    "2026-03-16": { solved: true },
    "2026-03-15": { solved: true }
  }

  expect(calculateStreak(activity)).toBe(3)
})

test("break resets streak", () => {
  const activity = {
    "2026-03-17": { solved: true },
    "2026-03-16": { solved: false },
    "2026-03-15": { solved: true }
  }

  expect(calculateStreak(activity)).toBe(1)
})

test("no activity gives zero streak", () => {
  expect(calculateStreak({})).toBe(0)
})