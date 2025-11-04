import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import searchRoutes from "./routes/search.js"

dotenv.config()

const app = express()

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err))

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookieParser())

// Passport
app.use(passport.initialize())

// Routes
app.use("/auth", authRoutes)
app.use("/api", searchRoutes)

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "Backend running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
