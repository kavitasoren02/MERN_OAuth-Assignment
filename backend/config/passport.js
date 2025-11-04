import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import FacebookStrategy from "passport-facebook"
import GitHubStrategy from "passport-github"
import User from "../models/User.js"
import dotenv from 'dotenv'
dotenv.config()

// Google Strategy
passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) return done(null, user)

                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    avatar: profile.photos[0]?.value,
                })
                await user.save()
                done(null, user)
            } catch (err) {
                done(err)
            }
        },
    ),
)

// Facebook Strategy
passport.use(
    new FacebookStrategy.Strategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ["id", "displayName", "photos", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ facebookId: profile.id })
                if (user) return done(null, user)

                user = new User({
                    facebookId: profile.id,
                    email: profile.emails?.[0]?.value,
                    name: profile.displayName,
                    avatar: profile.photos?.[0]?.value,
                })
                await user.save()
                done(null, user)
            } catch (err) {
                done(err)
            }
        },
    ),
)

// GitHub Strategy
passport.use(
    new GitHubStrategy.Strategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id })
                if (user) return done(null, user)

                user = new User({
                    githubId: profile.id,
                    email: profile.emails?.[0]?.value,
                    name: profile.displayName,
                    avatar: profile.photos[0]?.value,
                })
                await user.save()
                done(null, user)
            } catch (err) {
                done(err)
            }
        },
    ),
)
