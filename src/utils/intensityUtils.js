export function getIntensity(activity) {

  if (!activity) return 0

  const { score, difficulty } = activity

  if (score >= 100 && difficulty >= 2) return 4
  if (score >= 90) return 3
  if (score >= 70) return 2
  if (score >= 50) return 1

  return 0
}