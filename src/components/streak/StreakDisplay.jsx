import { useEffect, useState } from "react"
import { getAllActivity } from "../../db/indexedDB"
import { activityArrayToMap } from "../../utils/activityUtils"
import { calculateStreak } from "../../engine/streakEngine"
import { motion } from "framer-motion"

function StreakDisplay() {

  const [streak, setStreak] = useState(0)

  useEffect(() => {

    async function loadStreak() {

      const activities = await getAllActivity()

      const map = activityArrayToMap(activities)

      const currentStreak = calculateStreak(map)

      setStreak(currentStreak)

    }

    loadStreak()

  }, [])

  return (

    <motion.div
      className="text-lg font-semibold flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <motion.span
        animate={{ scale: [1, 1.25, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🔥
      </motion.span>

      Current Streak: {streak} {streak === 1 ? "day" : "days"}

    </motion.div>

  )

}

export default StreakDisplay