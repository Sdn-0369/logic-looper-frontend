export function calculateStreak(activityMap) {

  let streak = 0

  let currentDate = new Date()

  while (true) {

    const dateKey = currentDate.toLocaleDateString("en-CA")

    if (!activityMap[dateKey] || !activityMap[dateKey].solved) {
      break
    }

    streak++

    currentDate.setDate(currentDate.getDate() - 1)

  }

  return streak
}