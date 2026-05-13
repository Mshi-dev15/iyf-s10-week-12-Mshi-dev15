# Week 12: CommunityHub - Full-Stack Social Platform

<!-- Badges -->
<p align="center">
  <a href="https://react.dev" target="_blank">
    <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://nodejs.org" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://mongodb.com" target="_blank">
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <a href="https://vitejs.dev" target="_blank">
    <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </a>
</p>


<p align="center">
  <a href="https://convo-app-murex.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-brightgreen?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/Mshi-dev15" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-@Mshi--dev15-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

---

## Author
- **Name:** Faith Mine
- **GitHub:** [@Mshi-dev15](https://github.com/Mshi-dev15)
- **Date:** May 14, 2026

## Project Description
CommunityHub is a modern, full-stack social media platform built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, create posts with images, like and comment on content, browse a TikTok-style Reels feed, and toggle between dark/light themes. The app features a responsive Facebook-inspired UI with a clean sidebar navigation, smooth scrolling, and mobile-friendly design.

---

## Technologies Used

### Frontend
- React 18 + Vite
- Tailwind CSS for styling
- React Router DOM for navigation
- Axios for API requests
- Context API for authentication state

### Backend
- Node.js + Express
- MongoDB + Mongoose (Atlas cloud database)
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- CORS & dotenv for security and environment management

### Deployment & Tools
- GitHub for version control
- Render for backend hosting
- Vercel for frontend hosting
- Git Bash (Windows) for terminal commands

---

## Features

✅ **User Authentication**
- Register with name, email, password
- Secure login with JWT tokens
- Protected routes for authenticated users

✅ **Social Feed**
- Create posts with text and images
- Like and comment on posts
- Delete your own posts
- Object-fit images (full visibility, no cropping)

✅ **Reels Page**
- Full-screen vertical video feed (TikTok-style)
- External up/down navigation arrows
- Like, comment, share buttons
- Smooth scroll-snap navigation

✅ **UI/UX Enhancements**
- Dark/Light mode toggle with persistence
- Responsive sidebar navigation (collapses on mobile)
- Hidden scrollbars that appear on hover
- Facebook/Instagram-inspired card design
- Centered, rounded reel cards with gradient overlays

✅ **Profile Page**
- View your posts in a clean card layout
- Avatar, name, email, and post count display
- Reuses PostCard component for consistency

---

## How to Run

### 🖥️ Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Mshi-dev15/iyf-s10-week-12-Mshi-dev15.git
cd iyf-s10-week-12-Mshi-dev15
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Create backend .env file
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT_SECRET
```

### 4. Start backend server
```bash
npm start
# Server runs on http://localhost:3000
```

### 5. Install frontend dependencies (in new terminal)
```bash
cd ../frontend
npm install
```

### 6. Create frontend .env file
```bash
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

### 7. Start frontend dev server
```bash
npm run dev
# App runs on http://localhost:5173
```
---

## 🌐 Live Demo
No setup required! Visit the deployed app:

- **Frontend**: [https://convo-app-murex.vercel.app](https://convo-app-murex.vercel.app)
- **Backend API**: [https://community-hub-backend.onrender.com/api](https://community-hub-backend.onrender.com/api)

---

## Lessons Learned
🔹 **State Management**: Using React Context for auth simplified prop-drilling across components.

🔹 **Tailwind + Custom CSS**: Combining utility classes with custom CSS variables enabled a robust dark/light theme system.

🔹 **Scroll Behavior**: Mastering `snap-y`, `overflow-hidden`, and `::-webkit-scrollbar` created smooth, platform-specific scrolling experiences.

🔹 **Deployment Workflow**: Learning to separate frontend/backend deployments (Vercel + Render) and manage CORS/environment variables was crucial for production readiness.

🔹 **Image Handling**: Using `object-contain` vs `object-cover` dramatically improved user experience for uploaded photos.

---

## Challenges Faced
🔸 **Scrollbar Visibility**: Global CSS rules were hiding all scrollbars. Solved by using `!important` overrides and targeting specific containers (`main`, `.sidebar`) with hover-based visibility.

🔸 **Reels Layout**: Getting full-screen, centered, rounded video cards with external navigation required careful flexbox positioning and `calc(100vh - 3.5rem)` height calculations.

🔸 **Theme Toggle Persistence**: Ensuring dark/light preference survived page reloads required `localStorage` + `useEffect` synchronization with the `<html>` class.

🔸 **CORS & Environment Variables**: Connecting Vercel frontend to Render backend required precise `VITE_API_URL` and `FRONTEND_URL` configuration to avoid blocked requests.

🔸 **Merge Conflicts**: Resolving `.gitignore` conflicts during initial push taught me to use clean, project-specific ignore rules and commit resolutions clearly.