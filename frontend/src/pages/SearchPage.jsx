import { useState, useEffect } from "react"
import apiClient from "../utils/api"
import TopSearchesBanner from "../components/TopSearchesBanner"
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults"
import SearchHistory from "../components/SearchHistory"
import Navbar from "../components/Navbar"

export default function SearchPage({ user, setUser, onLogout }) {
    const [results, setResults] = useState([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [history, setHistory] = useState([])
    const [topSearches, setTopSearches] = useState([])

    useEffect(() => {
        fetchHistory()
        fetchTopSearches()
    }, [])

    const fetchHistory = async () => {
        try {
            const response = await apiClient.get("/api/history")
            setHistory(response.data)
        } catch (error) {
            console.error("Failed to fetch history:", error.response?.data || error.message)
        }
    }

    const fetchTopSearches = async () => {
        try {
            const response = await apiClient.get("/api/top-searches")
            setTopSearches(response.data)
        } catch (error) {
            console.error("Failed to fetch top searches:", error.response?.data || error.message)
        }
    }

    const handleSearch = async (term) => {
        if (!term.trim()) return

        setLoading(true)
        setSearchTerm(term)
        setSelectedCount(0)

        try {
            const response = await apiClient.post("/api/search", { term })
            setResults(response.data.results || [])
            fetchHistory()
            fetchTopSearches()
        } catch (error) {
            console.error("Search failed:", error.response?.data || error.message)
            alert(error.response?.data?.error || "Search failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleQuickSearch = (term) => {
        handleSearch(term)
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar user={user} onLogout={onLogout} />
            <TopSearchesBanner topSearches={topSearches} onSearchClick={handleQuickSearch} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <SearchBar onSearch={handleSearch} loading={loading} />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <SearchResults
                            results={results}
                            searchTerm={searchTerm}
                            loading={loading}
                            selectedCount={selectedCount}
                            setSelectedCount={setSelectedCount}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SearchHistory history={history} onTermClick={handleQuickSearch} />
                    </div>
                </div>
            </div>
        </div>
    )
}
