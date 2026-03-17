import HeatmapCell from "./HeatmapCell"
import { generateYearDates, groupDatesByWeek } from "../../utils/dateUtils"

function HeatmapGrid({ activityMap }) {

  const dates = generateYearDates()

  const weeks = groupDatesByWeek(dates)

  return (

    <div className="flex gap-1">

      {weeks.map((week, weekIndex) => (

        <div key={weekIndex} className="flex flex-col gap-1">

          {week.map((date) => (

            <HeatmapCell
              key={date}
              date={date}
              activity={activityMap[date]}
            />

          ))}

        </div>

      ))}

    </div>

  )

}

export default HeatmapGrid