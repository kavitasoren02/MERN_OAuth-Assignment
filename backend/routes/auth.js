import express from "express"
import passport from "passport"
import "../config/passport.js"
import { generateToken } from "../utils/jwt.js"
import { verifyToken } from "../utils/jwt.js"
import User from "../models/User.js"

const router = express.Router()

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "Not authenticated" })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }

    req.userId = decoded.userId
    next()
}

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    const token = generateToken(req.user._id)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.redirect(process.env.FRONTEND_URL)
})

// Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }))
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
    const token = generateToken(req.user._id)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.redirect(process.env.FRONTEND_URL)
})

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }))
router.get("/github/callback", passport.authenticate("github", { session: false }), (req, res) => {
    const token = generateToken(req.user._id)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.redirect(process.env.FRONTEND_URL)
})

// Get current user
router.get("/user", verifyJWT, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" })
    }
})

// Logout
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    res.json({ message: "Logged out successfully" })
})

export default router
