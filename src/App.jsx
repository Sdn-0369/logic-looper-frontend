import { useEffect, useState } from "react"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"

function App() {

  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const storedUser = localStorage.getItem("userId")

    if (storedUser) {
      setUserId(storedUser)
    }

    setLoading(false)

  }, [])

  if (loading) {
    return null
  }

  if (!userId) {
    return <LoginPage />
  }

  return <HomePage />

}

export default App