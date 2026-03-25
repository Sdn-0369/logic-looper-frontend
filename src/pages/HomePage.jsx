import { generateDailyPuzzle } from "../engine/puzzleEngine"
import PuzzleBoard from "../components/puzzle/PuzzleBoard"
import HeatmapContainer from "../components/heatmap/HeatmapContainerComponent"
import StreakDisplay from "../components/streak/StreakDisplay"
import { lazy, Suspense, useEffect } from "react"
import { syncDailyScores } from "../sync/syncService"

const Leaderboard = lazy(() => import("../components/leaderboard/Leaderboard"))
const Achievements = lazy(() => import("../components/achievements/Achievements"))

function HomePage() {
    const puzzle = generateDailyPuzzle()

    useEffect(() => {
        syncDailyScores()
    }, [])

    function logout() {
        localStorage.removeItem("userId")
        window.location.reload()
    }

    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col items-center py-8 px-4 md:px-8">
            <div className="w-full max-w-[1100px] flex justify-between items-center mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Logic Looper
                    </h1>
                    <StreakDisplay />
                </div>

                <button
                    aria-label="Logout"
                    onClick={logout}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg transition border border-zinc-700"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[1100px]">
                <div className="premium-card flex flex-col justify-center min-h-[300px]">
                    <PuzzleBoard puzzle={puzzle} />
                </div>

                <div className="premium-card">
                    <HeatmapContainer />
                </div>

                <div className="premium-card">
                    <Suspense fallback={<div className="animate-pulse h-32 bg-zinc-800 rounded-lg"></div>}>
                        <Leaderboard />
                    </Suspense>
                </div>

                <div className="premium-card">
                    <Achievements />
                </div>
            </div>
        </div>
    )
}

export default HomePage