import { generateDailyPuzzle } from "../engine/puzzleEngine"
import PuzzleBoard from "../components/puzzle/PuzzleBoard"
import HeatmapContainer from "../components/heatmap/HeatmapContainerComponent"
import StreakDisplay from "../components/streak/StreakDisplay"
import { lazy, Suspense } from "react"

const Leaderboard = lazy(() => import("../components/leaderboard/Leaderboard"))
const Achievements = lazy(() => import("../components/achievements/Achievements"))

function HomePage() {

  const puzzle = generateDailyPuzzle()

  function logout() {
    localStorage.removeItem("userId")
    window.location.reload()
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex flex-col items-center py-8 px-4">

      {/* HEADER */}
      <div className="w-full max-w-[1100px] flex justify-between items-center mb-8">

        <div className="flex flex-col">

          <h1 className="text-3xl md:text-4xl font-bold text-[#1A2A44]">
            Logic Looper
          </h1>

          <StreakDisplay />

        </div>

        <button
        aria-label="Submit answer"
          onClick={logout}
          className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded transition"
        >
          Logout
        </button>

      </div>


      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1100px]">

        {/* Puzzle */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-5 w-full">
          <PuzzleBoard puzzle={puzzle} />
        </div>

        {/* Heatmap */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-5 w-full">
          <HeatmapContainer />
        </div>

        {/* Leaderboard */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-5 w-full">
            <Suspense fallback={<div>Loading...</div>}>
                 <Leaderboard />
            </Suspense>
         
        </div>

        {/* Achievements */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-5 w-full">
          <Achievements />
        </div>

      </div>

    </div>

  )

}

export default HomePage