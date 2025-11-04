# Image Search - MERN Stack with OAuth

A full-stack application built with MERN (MongoDB, Express, React, Node.js) that allows authenticated users to search images from Unsplash, view trending searches, and maintain search history. Features secure OAuth authentication with JWT tokens stored in HTTP-only cookies.

## Features

- **OAuth Authentication**: Sign in with Google, Facebook, or GitHub using OAuth 2.0
- **JWT + Secure Cookies**: Token-based authentication with HTTP-only cookies (XSS protection)
- **Image Search**: Search millions of images from Unsplash API
- **Multi-Select Grid**: Select multiple images with visual feedback and counter
- **Search History**: View your personal search history with timestamps
- **Top Searches**: See trending searches across all users
- **Real-time Updates**: Live search results and trending data
- **Responsive Design**: Works on mobile, tablet, and desktop with Tailwind CSS

## Project Structure

```
/Backend              # Express server with MongoDB
  ├── models/         # User and Search schemas
  ├── routes/         # Authentication and Search APIs
  ├── config/         # Passport OAuth configuration
  ├── utils/          # JWT utilities
  ├── server.js       # Main server file
  └── package.json

/Frontend             # React + Vite + React Router application
  ├── src/
  │   ├── pages/      # LoginPage, SearchPage, AuthCallback
  │   ├── components/ # Navbar, SearchBar, SearchResults, etc.
  │   ├── utils/      # API client configuration
  │   ├── config/     # OAuth configuration
  │   ├── App.jsx     # Router setup
  │   ├── main.jsx    # React entry point
  │   └── index.css   # Tailwind CSS
  ├── index.html
  ├── vite.config.js
  ├── package.json
  └── tailwind.config.js
```

## Prerequisites

- Node.js (v22 or higher)
- MongoDB (local or Atlas)
- Unsplash API Key
- OAuth credentials (Google, Facebook, GitHub)

## Quick Start (30 minutes)

### 1. Clone and Install

```bash
# Backend
cd Backend
npm install

# Frontend
cd Frontend
npm install
```

### 2. Configure Environment Variables

**Backend/.env**
```
MONGODB_URI=mongodb://localhost:27017/image-search
UNSPLASH_ACCESS_KEY=your_unsplash_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
FACEBOOK_APP_ID=your_facebook_id
FACEBOOK_APP_SECRET=your_facebook_secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
JWT_SECRET=your_random_secret_key_here
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

**Frontend/.env**
```
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Start Services

```bash
# Terminal 1 - Backend
cd Backend && npm run dev

# Terminal 2 - Frontend
cd Frontend && npm run dev

# Terminal 3 - MongoDB (if local)
mongod
```

Visit `http://localhost:5173` and start searching!

## Setup Instructions (Detailed)

### Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Fill in environment variables** - See Environment Variables section below

5. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## Environment Variables

### Backend (.env)

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/image-search

# Unsplash API Key
UNSPLASH_ACCESS_KEY=your_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_id_here
GOOGLE_CLIENT_SECRET=your_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Facebook OAuth
FACEBOOK_APP_ID=your_id_here
FACEBOOK_APP_SECRET=your_secret_here
FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_id_here
GITHUB_CLIENT_SECRET=your_secret_here
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

# JWT Configuration
JWT_SECRET=your_long_random_secret_key_here

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000
```

## Authentication Flow

1. User clicks OAuth provider button (Google, Facebook, or GitHub)
2. Frontend redirects to backend OAuth route (`/auth/google`, `/auth/facebook`, `/auth/github`)
3. Backend initiates OAuth flow with provider
4. User logs in with OAuth provider
5. Provider redirects to backend callback URL
6. Backend exchanges authorization code for user information
7. Backend generates JWT token and sets it in an HTTP-only cookie
8. Backend redirects to `/auth/callback?success=true`
9. Frontend validates and fetches user data
10. Frontend redirects to search page

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/auth/google` | No | Initiate Google OAuth |
| GET | `/auth/facebook` | No | Initiate Facebook OAuth |
| GET | `/auth/github` | No | Initiate GitHub OAuth |
| GET | `/auth/user` | JWT | Get current user |
| POST | `/auth/logout` | JWT | Logout user |

### Search APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/search` | JWT | Search images (12 per search) |
| GET | `/api/history` | JWT | Get user's search history (last 20) |
| GET | `/api/top-searches` | No | Get top 5 trending searches |

## Search Response Format

```json
{
  "results": [
    {
      "id": "abc123",
      "urls": {
        "small": "https://images.unsplash.com/...",
        "regular": "https://images.unsplash.com/..."
      },
      "alt_description": "Mountain landscape",
      "user": {
        "name": "Photographer Name",
        "portfolio_url": "https://..."
      }
    }
  ],
  "total": 5000,
  "term": "mountain"
}
```

## Search History Response

```json
[
  {
    "_id": "mongodb_id",
    "userId": "user_id",
    "term": "mountain",
    "timestamp": "2024-01-15T10:30:00Z"
  }
]
```

## Top Searches Response

```json
[
  {
    "_id": "mountain",
    "count": 45
  },
  {
    "_id": "landscape",
    "count": 32
  }
]
```

## cURL Examples

### Login with Google
```bash
curl -i http://localhost:5000/auth/google
# Redirects to Google login, then back to frontend with JWT cookie
```

### Search Images (requires JWT token)
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term":"nature"}' \
  -b "token=YOUR_JWT_TOKEN" \
  --cookie-jar cookies.txt
```

### Get Search History (requires JWT token)
```bash
curl http://localhost:5000/api/history \
  -b "token=YOUR_JWT_TOKEN"
```

### Get Top Searches (no authentication required)
```bash
curl http://localhost:5000/api/top-searches
```

## Getting OAuth Credentials

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web Application)
5. Set authorized redirect URIs: `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create new app
3. Add "Facebook Login" product
4. Set Valid OAuth Redirect URIs: `http://localhost:5000/auth/facebook/callback`
5. Get App ID and App Secret to `.env`

### GitHub OAuth

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Create new OAuth Application
3. Set Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Get Client ID and Client Secret to `.env`

## Getting Unsplash API Key

1. Create account at https://unsplash.com
2. Go to [Unsplash Developers](https://unsplash.com/oauth/applications)
3. Create new application
4. Accept terms and copy Access Key to `.env`

## MongoDB Setup

### Local MongoDB
```bash
mongod
```

### MongoDB Atlas (Cloud)
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Get connection string
4. Update MONGODB_URI in `.env`

## Running the Application

### Terminal 1 - Backend
```bash
cd Backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd Frontend
npm run dev
```

### Terminal 3 - MongoDB (if running locally)
```bash
mongod
```

Then open `http://localhost:5173` in your browser.

## Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 | UI library |
| Frontend | Vite | Build tool |
| Frontend | Tailwind CSS | Styling (no custom classes) |
| Frontend | React Router v6 | Client-side routing |
| Frontend | Axios | HTTP client |
| Backend | Node.js | Runtime |
| Backend | Express.js | Web framework |
| Backend | MongoDB | Database |
| Backend | Passport.js | OAuth provider |
| Backend | JWT | Token management |
| API | Unsplash | Image provider |

## Features Implementation

### 1. OAuth Authentication
- JWT token generation instead of sessions
- Secure HTTP-only cookies for token storage
- Passport.js strategies for Google, Facebook, GitHub
- Automatic token refresh on page reload

### 2. Image Search
- Integration with Unsplash API
- Search queries stored in MongoDB with user ID
- 12 results per search
- Real-time result display

### 3. Multi-Select
- Client-side state management with React hooks
- Checkbox overlay on images (visible on hover)
- Dynamic counter display
- Selection persists during session

### 4. Search History
- Personal search history for each user
- Sorted by most recent first
- Limited to last 20 searches
- Click to repeat search

### 5. Top Searches Banner
- Aggregation pipeline to count searches across all users
- Top 5 trending searches displayed
- Click trending terms to auto-search

### 6. React Router Setup
- Protected routes for authenticated pages
- Login page for unauthenticated users
- OAuth callback handler for provider redirects
- Automatic redirection based on auth state

## Security Features

✅ JWT tokens in secure HTTP-only cookies (XSS protection)  
✅ CORS configured with credentials enabled  
✅ Environment variables for all secrets  
✅ Passport.js OAuth 2.0 best practices  
✅ Token expiration (7 days)  
✅ `sameSite: lax` for CSRF protection  

## Common Issues

### MongoDB Connection Failed
- Ensure MongoDB is running (`mongod`)
- Check MONGODB_URI format in `.env`
- For Atlas, whitelist your IP address

### OAuth "Redirect URI mismatch" Error
- Verify callback URLs match exactly in provider settings
- Format: `http://localhost:5000/auth/PROVIDER/callback`
- Check for trailing slashes and http vs https

### CORS Errors
- Ensure FRONTEND_URL in backend `.env` matches frontend origin
- Verify axios has `withCredentials: true`
- Check backend CORS configuration

### Images Not Loading
- Verify UNSPLASH_ACCESS_KEY is valid and correct
- Check API rate limits (50 requests/hour free tier)
- Test with different search terms

### JWT Token Errors
- Verify JWT_SECRET is set in `.env`
- Check if token has expired (7 day expiry)
- Try clearing browser cookies and re-login

### "React Router not found" Error
- Run `npm install react-router-dom` in Frontend folder
- Verify `react-router-dom` is in package.json dependencies

## Deployment

### Frontend (Vercel, Netlify)
```bash
npm run build
# Deploy dist/ folder
```

Update `VITE_BACKEND_URL` to production backend URL

### Backend (Vercel, Railway, Heroku)
```bash
# Update environment variables for production
# Update FRONTEND_URL to deployed frontend domain
# Update OAuth callback URLs in provider settings
npm install && npm start
```
