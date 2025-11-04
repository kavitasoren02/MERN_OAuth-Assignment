import { useState } from "react"

export default function SearchResults({ results, searchTerm, loading, selectedCount, setSelectedCount }) {
    const [selected, setSelected] = useState(new Set())

    const toggleSelect = (id) => {
        const newSelected = new Set(selected)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelected(newSelected)
        setSelectedCount(newSelected.size)
    }

    if (!results.length && !loading) return null

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    {searchTerm && (
                        <h2 className="text-2xl font-bold text-gray-900">
                            You searched for "<span className="text-blue-600">{searchTerm}</span>" — {results.length} results
                        </h2>
                    )}
                </div>
                {selectedCount > 0 && (
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                        Selected: {selectedCount} images
                    </div>
                )}
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Searching...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {results.map((image) => (
                        <div
                            key={image.id}
                            className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-200 aspect-square"
                        >
                            <img
                                src={image.urls.small || "/placeholder.svg"}
                                alt={image.alt_description}
                                className="w-full h-full object-cover group-hover:opacity-75 transition"
                            />
                            <input
                                type="checkbox"
                                checked={selected.has(image.id)}
                                onChange={() => toggleSelect(image.id)}
                                className="absolute top-3 left-3 w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                            />
                            <div className="absolute top-3 left-3 w-5 h-5 border-2 border-white rounded pointer-events-none group-hover:opacity-100 transition" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
