import express from "express"
import axios from "axios"
import { verifyToken } from "../utils/jwt.js"
import Search from "../models/Search.js"

const router = express.Router()

const ensureAuth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "You must be logged in to search" })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }

    req.userId = decoded.userId
    next()
}

// Search images from Unsplash
router.post("/search", ensureAuth, async (req, res) => {
    const { term } = req.body

    if (!term || term.trim() === "") {
        return res.status(400).json({ error: "Search term is required" })
    }

    try {
        // Store search in database
        const search = new Search({
            userId: req.userId,
            term: term.trim(),
        })
        await search.save()

        // Fetch from Unsplash API
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: term,
                per_page: 12,
                client_id: process.env.UNSPLASH_ACCESS_KEY,
            },
        })

        res.json({
            results: response.data.results,
            total: response.data.total,
            term: term,
        })
    } catch (error) {
        console.error("Search error:", error.message)
        res.status(500).json({ error: "Failed to search images" })
    }
})

// Get user's search history
router.get("/history", ensureAuth, async (req, res) => {
    try {
        const history = await Search.find({ userId: req.userId }).sort({ timestamp: -1 }).limit(20)

        res.json(history)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history" })
    }
})

// Get top searches across all users
router.get("/top-searches", async (req, res) => {
    try {
        const topSearches = await Search.aggregate([
            {
                $group: {
                    _id: "$term",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ])

        res.json(topSearches)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch top searches" })
    }
})

export default router
