import { getIntensity } from "../../utils/intensityUtils"
import { motion } from "framer-motion"

function HeatmapCell({ activity, date }) {

  const intensity = getIntensity(activity)

  const colors = [
    "bg-gray-200",
    "bg-green-200",
    "bg-green-400",
    "bg-green-600",
    "bg-green-800"
  ]

  const color = colors[intensity]

  let tooltip = "No activity"

  if (activity) {
    tooltip = `
Date: ${date}
Score: ${activity.score}
Time: ${activity.timeTaken}s
Difficulty: ${activity.difficulty}
`
  }

 return (
  <motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    scale: intensity > 0 ? [1, 1.3, 1] : 1
  }}
  transition={{ duration: 0.4 }}
  whileHover={{ scale: 1.4 }}
  className={`w-3 h-3 rounded-sm cursor-pointer ${color}`}
  title={tooltip}
/>
)
}

export default HeatmapCell