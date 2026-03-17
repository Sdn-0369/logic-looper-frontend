import { getIntensity } from "./intensityUtils"
import { test, expect } from "vitest"

test("returns 0 for no activity", () => {
  expect(getIntensity(null)).toBe(0)
})

test("returns higher intensity for higher score", () => {
  expect(getIntensity({ score: 50 })).toBeGreaterThan(0)
  expect(getIntensity({ score: 100 })).toBeGreaterThan(1)
})