import { useEffect, useState } from "react"
import { getAllActivity } from "../../db/indexedDB"
import { activityArrayToMap } from "../../utils/activityUtils"
import HeatmapGrid from "./HeatmapGrid"

function HeatmapContainer() {

  const [activityMap, setActivityMap] = useState({})

  useEffect(() => {

    async function loadActivity() {

      const activities = await getAllActivity()

      const map = activityArrayToMap(activities)

      setActivityMap(map)

    }

    loadActivity()

  }, [])

  return (

    <div className="flex flex-col items-center w-full">

      <h2 className="text-xl font-semibold mb-4">
        Activity
      </h2>

      {/* Scroll Container */}
      <div className="w-full overflow-x-auto pb-2">

        <div className="inline-block min-w-max">

          <HeatmapGrid activityMap={activityMap} />

        </div>

      </div>

      {/* GitHub style legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">

        <span>Less</span>

        <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-800 rounded-sm"></div>

        <span>More</span>

      </div>

    </div>

  )
}

export default HeatmapContainer