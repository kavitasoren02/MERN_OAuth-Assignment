import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    githubId: String,
    email: { type: String, unique: true, sparse: true },
    name: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("User", userSchema)
