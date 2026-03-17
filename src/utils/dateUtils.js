export function generateYearDates() {

  const dates = []

  const start = new Date(new Date().getFullYear(), 0, 1)

  for (let i = 0; i < 365; i++) {

    const date = new Date(start)

    date.setDate(start.getDate() + i)

    dates.push(date.toLocaleDateString("en-CA"))

  }

  return dates
}

export function groupDatesByWeek(dates) {

  const weeks = []

  let week = []

  dates.forEach((date, index) => {

    week.push(date)

    if (week.length === 7) {

      weeks.push(week)
      week = []

    }

  })

  if (week.length > 0) {
    weeks.push(week)
  }

  return weeks

}