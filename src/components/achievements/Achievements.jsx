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
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-white">🏆 Achievements</h2>
            <div className="flex gap-3 flex-wrap">
                {badges.length === 0 ? (
                    <p className="text-zinc-500 text-sm italic">Play games to earn badges!</p>
                ) : (
                    badges.map((b, i) => (
                        <div key={i} className="bg-zinc-800/80 border border-yellow-500/30 text-yellow-400 font-medium px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                            {b}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Achievements