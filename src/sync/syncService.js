import { getAllActivity, saveDailyActivity } from "../db/indexedDB"
import { API_BASE } from "../config/api"

export async function syncDailyScores() {


    const activities = await getAllActivity()

    const unsynced = activities.filter(a => !a.synced)

    if (unsynced.length === 0) return

    const userId = localStorage.getItem("userId")


    if (!userId) return

    const payload = {
        userId,
        entries: unsynced.map(a => ({
            date: a.date,
            score: a.score,
            timeTaken: a.timeTaken,
            hintsUsed: a.hintsUsed
        }))
    }


    try {

        const res = await fetch(`${API_BASE}/sync`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (data.success) {

            for (const entry of unsynced) {

                entry.synced = true
                await saveDailyActivity(entry)

            }

        }

    } catch (err) {

        console.log("Sync failed (offline mode)")

    }

}