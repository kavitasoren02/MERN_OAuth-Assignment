import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import api from "../utils/api"

export default function OAuthCallback() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = searchParams.get("code")
                const state = searchParams.get("state")
                const provider = window.location.pathname.split("/")[2]
                if (!code) {
                    setError("No authorization code received")
                    setLoading(false)
                    return
                }

                const response = await api.post(`/auth/${provider}/callback`, {
                    code,
                    state,
                })

                if (response.data.success) {
                    navigate("/search")
                } else {
                    setError(response.data.message || "Authentication failed")
                }
            } catch (err) {
                setError(err.response?.data?.message || "Authentication failed. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        handleCallback()
    }, [searchParams, navigate])

    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white text-lg">Signing you in...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-center max-w-md">
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        )
    }

    return null
}
