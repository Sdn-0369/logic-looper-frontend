import { openDB } from "idb"

const dbPromise = openDB("logicLooperDB", 2, {
  upgrade(db) {

    if (!db.objectStoreNames.contains("dailyActivity")) {
      db.createObjectStore("dailyActivity", { keyPath: "date" })
    }

    if (!db.objectStoreNames.contains("puzzleProgress")) {
      db.createObjectStore("puzzleProgress", { keyPath: "date" })
    }

  }
})

export async function saveDailyActivity(activity) {

  const db = await dbPromise

  await db.put("dailyActivity", activity)

}

export async function getAllActivity() {

  const db = await dbPromise

  return db.getAll("dailyActivity")

}

export async function savePuzzleProgress(progress) {

  const db = await dbPromise

  await db.put("puzzleProgress", progress)

}

export async function getPuzzleProgress(date) {

  const db = await dbPromise

  return db.get("puzzleProgress", date)

}