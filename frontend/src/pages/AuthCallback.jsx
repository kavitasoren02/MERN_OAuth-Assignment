import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function AuthCallback({ onAuthSuccess }) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const success = searchParams.get("success")
                const errorMsg = searchParams.get("error")

                if (errorMsg) {
                    setError(decodeURIComponent(errorMsg))
                    setTimeout(() => navigate("/login"), 3000)
                    return
                }

                if (success === "true") {
                    onAuthSuccess()
                    navigate("/search")
                } else {
                    setError("Authentication failed")
                    setTimeout(() => navigate("/login"), 3000)
                }
            } catch (err) {
                setError("Something went wrong")
                setTimeout(() => navigate("/login"), 3000)
            }
        }

        handleCallback()
    }, [searchParams, navigate, onAuthSuccess])

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center">
                {error ? (
                    <>
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <p className="text-gray-400">Redirecting to login...</p>
                    </>
                ) : (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white text-lg">Signing you in...</p>
                    </>
                )}
            </div>
        </div>
    )
}
