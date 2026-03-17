import { useEffect, useState } from "react"
import { getAllActivity } from "../../db/indexedDB"

function Achievements() {

  const [badges, setBadges] = useState([])

  useEffect(() => {

    async function load() {

      const activity = await getAllActivity()

      const solved = activity.length

      const newBadges = []

      if (solved >= 7) newBadges.push("🔥 7 Day Streak")
      if (solved >= 30) newBadges.push("🏆 30 Puzzles Solved")
      if (solved >= 100) newBadges.push("👑 Puzzle Master")

      setBadges(newBadges)

    }

    load()

  }, [])

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Achievements</h2>

      <div className="flex gap-2 flex-wrap">
        {badges.map((b,i)=>(
          <div key={i} className="bg-yellow-200 px-3 py-1 rounded">
            {b}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Achievements