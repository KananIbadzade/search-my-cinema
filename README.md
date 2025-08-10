# Search My Cinema

Small React + Vite app to search TMDB movies and save favorites per signed-in user (Firebase Auth + Firestore).

## Features

- Search & popular movies (TMDB) ([src/services/api.js](src/services/api.js))
- Google sign-in ([src/firebase.js](src/firebase.js))
- Per-user favorites persisted in Firestore ([src/contexts/MovieContext.jsx](src/contexts/MovieContext.jsx))
- Favorite toggle on each movie card ([src/components/MovieCard.jsx](src/components/MovieCard.jsx))
- Routing + protected favorites page ([src/App.jsx](src/App.jsx))

## Quick Start

```bash
git clone https://github.com/KananIbadzade/search-my-cinema.git
cd search-my-cinema
npm install
cp .env.example .env  # create then fill in keys
npm run dev
```

Open http://localhost:5173

## Environment (.env)

Do NOT commit real keys.

```bash
VITE_API_KEY=TMDB_API_KEY

VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx
VITE_FIREBASE_MEASUREMENT_ID=G-xxxx
```

## Firestore Setup

1. Enable Authentication (Google provider)
2. Enable Firestore (native)
3. Security rules (basic per-user access):

```
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Build

```bash
npm run build
npm run preview
```

## Folder Overview

- src/firebase.js: Firebase init & auth helpers
- src/contexts/MovieContext.jsx: Favorites state + Firestore sync
- src/services/api.js: TMDB fetch helpers
- src/components/: UI pieces
- src/pages/: Route pages

## Remaining TODO (optional)
