export default function TopSearchesBanner({ topSearches, onSearchClick }) {
    if (!topSearches || topSearches.length === 0) return null

    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-sm font-semibold mb-3">Trending Searches</p>
                <div className="flex flex-wrap gap-2">
                    {topSearches.map((search, index) => (
                        <button
                            key={index}
                            onClick={() => onSearchClick(search._id)}
                            className="bg-white text-black bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium transition"
                        >
                            {search._id} ({search.count})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
