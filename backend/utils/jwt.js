import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    console.error(
        "[ERROR] JWT_SECRET environment variable is not set. Please set JWT_SECRET in your .env file before starting the server.",
    )
}

export const generateToken = (userId) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured. Please add JWT_SECRET to your .env file.")
    }
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    })
}

export const verifyToken = (token) => {
    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not configured.")
        return null
    }
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}
