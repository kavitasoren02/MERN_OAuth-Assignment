import { useState } from "react"

export default function SearchBar({ onSearch, loading }) {
    const [input, setInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(input)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for images..."
                    className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
        </form>
    )
}
