import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { API_BASE } from "../../config/api"

function Leaderboard() {

    const [scores, setScores] = useState([])

    useEffect(() => {

        async function loadLeaderboard() {

            try {

                const res = await fetch(`${API_BASE}/leaderboard`)
                const data = await res.json()
                setScores(data)

            } catch (err) {

                console.log("Leaderboard fetch failed")

            }

        }

        loadLeaderboard()

    }, [])

    function getMedal(index) {
        if (index === 0) return "🥇"
        if (index === 1) return "🥈"
        if (index === 2) return "🥉"
        return `#${index + 1}`
    }

    function formatName(email) {

        if (!email) return "Anonymous"

        const name = email.split("@")[0]

        return name.charAt(0).toUpperCase() + name.slice(1, 10)

    }

    return (

        <div className="w-full mt-6">

            <h2 className="text-xl font-bold mb-4">
                🏆 Leaderboard
            </h2>

            <div className="flex flex-col gap-2">

                {scores.map((entry, index) => (

                    <motion.div
                        key={entry.id}
                        className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-3 hover:scale-[1.02] transition"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >

                        <span className="font-semibold text-lg">
                            {getMedal(index)}
                        </span>

                        <span className="flex-1 text-center truncate font-medium">
                            {formatName(entry.user?.email)}
                        </span>

                        <span className="font-semibold">
                            {entry.score}
                        </span>

                    </motion.div>

                ))}

            </div>

        </div>

    )

}

export default Leaderboard