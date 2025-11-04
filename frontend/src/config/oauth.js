// OAuth Configuration
// These credentials are used for OAuth flows
// Client-side credentials are safe to expose (they're public anyway)

export const oauthConfig = {
    google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
        scope: "openid profile email",
    },
    facebook: {
        appId: import.meta.env.VITE_FACEBOOK_APP_ID || "",
        version: "v18.0",
        scope: "public_profile,email",
    },
    github: {
        clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || "",
        scope: "user:email",
    },
    redirectUri: import.meta.env.VITE_OAUTH_REDIRECT_URI || "http://localhost:5173",
}

// Helper function to generate Google OAuth URL
export const getGoogleOAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: oauthConfig.google.clientId,
        redirect_uri: `${oauthConfig.redirectUri}/auth/google/callback`,
        response_type: "code",
        scope: oauthConfig.google.scope,
        access_type: "offline",
        prompt: "consent",
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

// Helper function to generate Facebook OAuth URL
export const getFacebookOAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: oauthConfig.facebook.appId,
        redirect_uri: `${oauthConfig.redirectUri}/auth/facebook/callback`,
        scope: oauthConfig.facebook.scope,
        state: Math.random().toString(36).substring(7),
    })
    return `https://www.facebook.com/${oauthConfig.facebook.version}/dialog/oauth?${params.toString()}`
}

// Helper function to generate GitHub OAuth URL
export const getGithubOAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: oauthConfig.github.clientId,
        redirect_uri: `${oauthConfig.redirectUri}/auth/github/callback`,
        scope: oauthConfig.github.scope,
        state: Math.random().toString(36).substring(7),
    })
    return `https://github.com/login/oauth/authorize?${params.toString()}`
}
