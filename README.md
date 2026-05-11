# 🚀 3D Portfolio — MERN Stack

**A jaw-dropping 3D portfolio with objects popping outside the screen,
smooth scroll, glass morphism, neon aesthetic, and full MERN backend.**

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## ✨ Features

- 🌐 **3D Hero Scene** — Torus knot, icosahedron, octahedron and rings floating **outside** the screen bounds using Three.js
- 🖱️ **Mouse Parallax** — 3D objects react to cursor movement
- 🎨 **Custom Neon Cursor** — Dot + follower ring with hover effects (auto-hidden on touch devices)
- ⌨️ **Typewriter Effect** — Animated role text in the hero
- 🃏 **3D Card Tilt** — Project cards tilt on mouse hover using `perspective`
- 📊 **Animated Skill Bars** — Smooth fill animation on scroll into view
- 🔍 **Project Filter** — Filter projects by technology
- 📋 **Project Modal** — Detailed view with links
- 📅 **Timeline** — Work experience and education with vertical timeline
- 📬 **Working Contact Form** — Saves to MongoDB + optional email notification
- 📜 **Smooth Scroll** — Powered by Lenis
- 📍 **Scroll Progress** — Top bar + side navigation dots
- 🌊 **Floating Particles** — Background particle system per section
- 💎 **Glass Morphism** — Cards with blur + transparency
- 📱 **Fully Responsive** — Mobile, tablet, and desktop
- 🍔 **Mobile Hamburger** — Solid backdrop, tap-outside-to-close
- 🎬 **Loading Screen** — Cinematic progress loader

---

## 📁 Project Structure

```
portfolio/
├── client/                          # Frontend — Vite + React + Tailwind
│   ├── public/
│   │   ├── profile.jpg              ← PUT YOUR PHOTO HERE
│   │   ├── resume.pdf               ← PUT YOUR RESUME HERE
│   │   └── projects/
│   │       ├── project1.jpg         ← PROJECT SCREENSHOTS
│   │       ├── project2.jpg
│   │       └── project3.jpg
│   └── src/
│       ├── components/
│       │   ├── HeroCanvas.jsx       # Three.js 3D scene
│       │   ├── FloatingParticles.jsx
│       │   ├── Cursor.jsx
│       │   ├── Loader.jsx
│       │   ├── ScrollProgress.jsx
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Experience.jsx
│       │   ├── Contact.jsx
│       │   └── Footer.jsx
│       ├── context/
│       │   └── PortfolioContext.jsx  # Fetches all data from API
│       ├── hooks/
│       │   ├── useInView.js         # Intersection observer
│       │   └── useTilt.js           # 3D card tilt
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
└── server/                          # Backend — Express + MongoDB
    ├── models/
    │   └── Contact.js               # Contact form schema
    ├── routes/
    │   ├── portfolio.js             ← ⭐ FILL YOUR CONTENT HERE
    │   └── contact.js               # Contact form API + email
    ├── index.js                     # Express entry point
    ├── .env                         # Your secrets (never commit!)
    └── .env.example                 # Template
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18 or higher |
| MongoDB | Atlas account (free tier works) |
| npm | 9 or higher |

### 1 — Clone and install

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### 2 — Configure environment

```bash
# Copy the example env file
cp server/.env.example server/.env
```

Open `server/.env` and fill in:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Optional — for email notifications from contact form
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=your_gmail@gmail.com
```

> **MongoDB Atlas setup:**
> 1. Create free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
> 2. **Network Access** → Add IP → Allow from anywhere (`0.0.0.0/0`)
> 3. **Database Access** → Create user with `readWriteAnyDatabase` role
> 4. **Connect** → Drivers → copy the connection string

### 3 — Fill your content

Open **`server/routes/portfolio.js`** and fill in every section:

```js
const portfolioData = {
  hero: {
    name: 'YOUR NAME',           // ← your full name
    tagline: 'YOUR TAGLINE',
    subTagline: 'Your Role',
    resumeLink: '/resume.pdf',
  },
  about: { ... },
  skills: [ ... ],
  projects: [ ... ],
  experience: [ ... ],
  education: [ ... ],
  contact: {
    email: 'you@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    ...
  },
};
```

### 4 — Add your files

```
client/public/profile.jpg          ← your profile photo
client/public/resume.pdf           ← your resume
client/public/projects/project1.jpg ← project screenshots
```

### 5 — Start development

```bash
# Run both frontend and backend simultaneously
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| API check | http://localhost:5000/api/portfolio |

---

## 🎨 Customization

### Change accent colors

Edit `client/tailwind.config.js`:

```js
colors: {
  void:   '#030305',   // page background
  plasma: '#0a0a12',   // section background
  neon:   '#00f5ff',   // primary accent (cyan)
  acid:   '#39ff14',   // secondary accent (green)
  magma:  '#ff4500',   // tertiary accent (orange)
},
```

### Change 3D objects

Edit `client/src/components/HeroCanvas.jsx` — swap `TorusKnotGeometry`, `IcosahedronGeometry`, etc. with any Three.js geometry. Adjust `position.set(x, y, z)` to place them outside the screen.

### Change fonts

Edit `client/index.html` (Google Fonts link) and `client/tailwind.config.js` `fontFamily` section.

### Disable the custom cursor

Remove `<Cursor />` from `client/src/App.jsx`. The cursor is already auto-hidden on touch/mobile devices.

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | UI framework + build tool |
| Styling | Tailwind CSS v3 | Utility-first CSS |
| 3D | Three.js | Hero canvas, floating objects |
| Animation | Framer Motion | Page animations, transitions |
| Smooth Scroll | Lenis | Buttery smooth scrolling |
| HTTP | Axios | API calls from frontend |
| Backend | Express.js | REST API server |
| Database | MongoDB + Mongoose | Store contact form messages |
| Email | Nodemailer | Contact form notifications |

---

## 📦 Build for Production

```bash
# Build the React frontend
npm run build
# Output: client/dist/
```

Then configure your Express server to serve `client/dist/` as static files:

```js
// Add to server/index.js for production
import path from 'path';
app.use(express.static(path.join(process.cwd(), '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '../client/dist/index.html'));
});
```

---

## 🔒 Security Reminders

- ❌ **Never commit** `server/.env` to Git — it's in `.gitignore`
- ❌ **Never share** your MongoDB URI or credentials publicly
- ✅ **Rotate** your MongoDB password if it was ever exposed
- ✅ **Use App Passwords** for Gmail (not your account password)
- ✅ **Restrict IP access** on MongoDB Atlas for production

---

## 📄 License

MIT — free to use, modify, and deploy for personal and commercial projects.

---

<div align="center">
Built with ❤️ using the MERN Stack + Three.js
</div>