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
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--accent-glow)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Daily Leaderboard
            </h2>

            <div className="flex flex-col gap-3">
                {scores.length === 0 ? (
                    <p className="text-zinc-500 text-sm text-center py-4">No scores yet today. Be the first!</p>
                ) : (
                    scores.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            className={`flex justify-between items-center px-4 py-3 rounded-lg transition-colors border ${index === 0 ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-[#27272a]/50 border-zinc-700/50 hover:border-zinc-500'}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <span className={`font-bold w-8 ${index < 3 ? 'text-2xl' : 'text-zinc-400'}`}>
                                {getMedal(index)}
                            </span>
                            
                            <span className="flex-1 px-4 truncate font-medium text-zinc-200">
                                {formatName(entry.user?.email)}
                            </span>
                            
                            <span className="font-mono font-bold text-[var(--accent-glow)]">
                                {entry.score}
                            </span>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Leaderboard