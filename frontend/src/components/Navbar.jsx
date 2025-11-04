import { useNavigate } from "react-router-dom"
import apiClient from "../utils/api"

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await apiClient.post("/auth/logout")
            onLogout()
            navigate("/login")
        } catch (error) {
            onLogout()
            navigate("/login")
        }
    }

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Image Search</h1>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300">{user?.name || "User"}</span>
                    {user?.avatar && (
                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
