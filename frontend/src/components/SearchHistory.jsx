export default function SearchHistory({ history, onTermClick }) {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Search History</h3>

            {history.length === 0 ? (
                <p className="text-gray-500 text-sm">No searches yet</p>
            ) : (
                <div className="space-y-3">
                    {history.map((search, index) => (
                        <button
                            key={index}
                            onClick={() => onTermClick(search.term)}
                            className="w-full text-left p-3 rounded-lg bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition"
                        >
                            <p className="font-medium text-gray-900 truncate">{search.term}</p>
                            <p className="text-xs text-gray-500">{formatDate(search.timestamp)}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
