🎬 Movie Application

A fully functional movie browsing application built with React, Redux Toolkit, Axios, Tailwind CSS, and Framer Motion.
This app allows users to explore movies by category, search and filter titles, manage favorites, and view detailed movie information — with authentication, persistence, and smooth animations.

🚀 Features
🎥 Movie Browsing

1. Home page displays Popular, Trending, and Horror movies.

2. All Movies section with pagination support.

3. Search Filter to find movies by title.

4. Individual Movie Details page showing movie info (poster, rating, description, etc).

5. Favorites feature — users can save movies they love.

👤 User Authentication

1. Login and Sign Up functionality.

2. User data stored securely in a local db.json file (mock database).

3. Authenticated routes with ProtectedRoute logic.

💾 Data Persistence

1. Uses LocalStorage to persist:

2. Favorite movies

3. Cached movie lists (popular, trending, horror, etc.)

🧭 Navigation & UI

1. Responsive Navbar with navigation links.

2. About and Contact pages.

3. Profile page shows all user’s favorite movies.

4. Not Found (404) page for undefined routes.

5. Smooth animations with Framer Motion.

6. Auto-scrolling carousel for movies using React Slick.

🏗️ Tech Stack
1. Library / Framework	Purpose
2. React	UI Components
3. React Redux / Redux Toolkit	State Management
4. Axios	API calls to fetch movies
5. React Router DOM	Navigation and Routing
6. React Slick	Carousel for auto-scrolling movies
7. Tailwind CSS	Styling and responsiveness
8. Framer Motion	Smooth animations and transitions

⚙️ Installation & Setup
1️⃣ Clone the repository

2️⃣ Install dependencies
npm install

3️⃣ Start the mock database (if using json-server)
npx json-server --watch src/database/db.json --port 3000

4️⃣ Start the React app
npm start
