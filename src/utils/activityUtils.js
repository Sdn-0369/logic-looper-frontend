export function activityArrayToMap(activityArray) {

  const map = {}

  activityArray.forEach(item => {
    map[item.date] = item
  })

  return map

}