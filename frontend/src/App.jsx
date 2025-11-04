import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import apiClient from "./utils/api"
import LoginPage from "./pages/LoginPage"
import SearchPage from "./pages/SearchPage"
import AuthCallback from "./pages/AuthCallback"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await apiClient.get("/auth/user")
      setUser(response.data)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/search" /> : <LoginPage />} />
        <Route path="/auth/:provider/callback" element={<AuthCallback onAuthSuccess={() => checkAuth()} />} />
        <Route
          path="/search"
          element={
            user ? (
              <SearchPage user={user} setUser={setUser} onLogout={() => setUser(null)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={user ? "/search" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
