# 🎬 Search My Cinema

A **React-based movie search application** that allows users to **browse popular movies, search for specific titles, and add favorites**. This app fetches movie data dynamically from an external API.

---

## 🚀 Features
- 🔍 **Search for Movies** – Find movies by title using an external API.
- 🎥 **Browse Popular Movies** – Discover trending and upcoming movies.
- ⭐ **Add to Favorites** – Save your favorite movies to a separate list.
- 🎨 **Responsive UI** – Optimized for all screen sizes.
- ⚡ **Fast Performance** – Built with **Vite** for rapid development.

---

## 🛠️ Technologies Used
- ⚛ **React.js** – JavaScript library for UI development.
- ⚡ **Vite** – Fast frontend tooling for React.
- 🎬 **TMDB API** – Fetch movie data dynamically.
- 💅 **CSS** – Styled components for UI design.
- 🔥 **Context API** – Global state management for favorites.

---

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/KananIbadzade/search-my-cinema.git
cd search-my-cinema
```

Install Dependencies
```bash
npm install
```

Set Up API Key
This app fetches movie data from the TMDB API.

Sign up on TMDB and generate an API key.
Create a .env file in the root directory:
```bash
VITE_API_KEY=your_api_key_here
```

Use it in your API calls inside src/services/api.js:
```bash
const API_KEY = import.meta.env.VITE_API_KEY;
```

Start the Development Server
```bash
npm run dev
```

Open the app in your browser at http://localhost:5173
