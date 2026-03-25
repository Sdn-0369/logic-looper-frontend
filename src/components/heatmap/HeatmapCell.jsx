import { getIntensity } from "../../utils/intensityUtils"
import { motion } from "framer-motion"

function HeatmapCell({ activity, date }) {

  const intensity = getIntensity(activity)


  const colors = [
    "bg-zinc-800",       
    "bg-emerald-900/80", 
    "bg-emerald-700",    
    "bg-emerald-500",    
    "bg-[var(--accent-glow)] shadow-[0_0_8px_rgba(16,185,129,0.6)]" 
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