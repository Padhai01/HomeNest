# 🏠 HomeNest — House Rental System

> A full-stack web application connecting property owners with renters. List properties, upload photos, set rules, and find your perfect home — all with zero brokerage.

![HomeNest](https://img.shields.io/badge/HomeNest-v1.0.0-EA580C?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![SQLite](https://img.shields.io/badge/Database-SQLite3-003B57?style=for-the-badge&logo=sqlite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Pages & Routes](#-pages--routes)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Future Improvements](#-future-improvements)

---

## 📌 Overview

HomeNest is a full-stack rental platform built with React.js on the frontend and Node.js + Express on the backend, using SQLite as the database. 

- **Owners** can list properties with photos, amenities, and rules
- **Renters** can browse, filter, bookmark properties and contact owners directly
- **JWT authentication** with role-based access control
- **No brokerage** — renters contact owners directly

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js 18 + Vite | User Interface |
| Styling | Tailwind CSS | Utility-first CSS |
| Routing | React Router v6 | Client-side navigation |
| HTTP Client | Axios | API requests + interceptors |
| Icons | Lucide React | Icon library |
| Fonts | Fraunces + Plus Jakarta Sans | Typography |
| Backend | Node.js + Express.js | REST API server |
| Auth | JWT + bcryptjs | Secure authentication |
| Database | SQLite3 | File-based database |
| File Upload | Multer | Multi-image handling |
| Dev | Nodemon | Auto-restart on change |

---

## 📁 Project Structure

```
homenest/
├── backend/
│   ├── server.js                  ← Express app entry point
│   ├── .env                       ← Environment variables
│   ├── package.json
│   ├── config/
│   │   └── database.js            ← SQLite init + schema + helpers
│   ├── middleware/
│   │   ├── auth.js                ← JWT verify middleware
│   │   └── upload.js              ← Multer image upload config
│   ├── controllers/
│   │   ├── authController.js      ← Register, Login, GetMe
│   │   └── propertyController.js  ← All property CRUD operations
│   ├── routes/
│   │   ├── auth.js                ← /api/auth/* routes
│   │   └── properties.js          ← /api/properties/* routes
│   └── uploads/                   ← Stored property images
│
└── frontend/
    ├── index.html                 ← HTML entry point
    ├── vite.config.js             ← Vite + API proxy config
    ├── tailwind.config.js         ← Tailwind theme
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx               ← React root render
        ├── App.jsx                ← Router + route guards
        ├── index.css              ← Global Tailwind styles
        ├── utils/
        │   └── api.js             ← Axios instance + token interceptor
        ├── context/
        │   └── AuthContext.jsx    ← Global auth state (login/logout)
        ├── components/
        │   ├── Navbar.jsx         ← Top navigation bar
        │   ├── Footer.jsx         ← Page footer
        │   └── PropertyCard.jsx   ← Reusable property card
        └── pages/
            ├── Home.jsx           ← Landing page
            ├── Login.jsx          ← Sign in
            ├── Register.jsx       ← Sign up (owner or renter)
            ├── Browse.jsx         ← Search & filter properties
            ├── PropertyDetail.jsx ← Full property view
            ├── Bookmarks.jsx      ← Saved properties (renter)
            ├── PropertyForm.jsx   ← Shared add/edit form (owner)
            ├── OwnerDashboard.jsx ← Listings overview (owner)
            ├── AddProperty.jsx    ← Create new listing (owner)
            ├── EditProperty.jsx   ← Update listing (owner)
            ├── ManageImages.jsx   ← Upload/delete photos (owner)
            └── ContactRequests.jsx← View renter messages (owner)
```

---

## ✨ Features

### 👤 For Renters
- Browse all available properties in a responsive grid
- Filter by city, state, rent range, BHK, property type, and furnishing
- View full property detail with image gallery, amenities, and rules
- Save favourite properties with the bookmark/heart button
- Send a message directly to the property owner
- View owner contact details (phone & email) from the listing

### 🏡 For Owners
- Register as an owner and manage all listings from a dashboard
- Add properties with: title, location, rent, BHK, type, furnishing, floor details
- Upload up to 10 photos with drag-and-drop support
- Add rules with categories: ✅ Allowed / ❌ Not Allowed / ℹ️ General
- Add amenities from a preset list or custom ones
- Toggle listing availability with one click
- View all contact requests from interested renters
- Edit or delete any listing at any time

### 🔒 General
- JWT-based secure authentication
- Role-based access control (owners and renters see different menus)
- Responsive design — works on desktop, tablet, and mobile
- Uploaded images served via backend `/uploads` folder

---

## 🗄 Database Schema

The database is SQLite and auto-created at `backend/database/homenest.db` on first run.

| Table | Description | Key Fields |
|-------|-------------|-----------|
| `users` | Owners and renters | id, name, email, role, phone |
| `properties` | All property listings | id, owner_id, title, city, rent, bedrooms |
| `property_images` | Uploaded photos | id, property_id, filename, is_primary |
| `property_rules` | Rules per property | id, property_id, rule_text, rule_type |
| `amenities` | Amenity tags | id, property_id, name |
| `bookmarks` | Saved properties | renter_id, property_id |
| `contact_requests` | Renter messages | renter_id, property_id, message |

---

## 📡 API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register as owner or renter |
| POST | `/api/auth/login` | — | Login and receive JWT token |
| GET | `/api/auth/me` | ✅ JWT | Get current user profile |

### Properties — `/api/properties`

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/properties` | Public | Browse all (with filters) |
| GET | `/api/properties/:id` | Public | Get single property detail |
| GET | `/api/properties/owner/mine` | Owner | Owner's own listings |
| POST | `/api/properties` | Owner | Create new listing |
| PUT | `/api/properties/:id` | Owner | Update listing |
| DELETE | `/api/properties/:id` | Owner | Delete listing |
| POST | `/api/properties/:id/images` | Owner | Upload photos (multipart) |
| DELETE | `/api/properties/:id/images/:imageId` | Owner | Remove a photo |
| POST | `/api/properties/:id/bookmark` | Renter | Toggle bookmark |
| GET | `/api/properties/renter/bookmarks` | Renter | Get saved properties |
| POST | `/api/properties/:id/contact` | Renter | Send message to owner |
| GET | `/api/properties/owner/contacts` | Owner | View contact requests |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)
- VS Code (recommended)

### Step 1 — Clone / Create the project folder

```
homenest/
├── backend/
└── frontend/
```

Copy all code files into the correct locations as per the project structure above.

### Step 2 — Setup Backend

```bash
cd homenest/backend
npm install
npm run dev
```

✅ You should see:
```
✅ Database connected
✅ Schema ready
🚀 HomeNest backend running on http://localhost:5000
```

### Step 3 — Setup Frontend

Open a **second terminal** (`Ctrl + Shift + `` ` ``):

```bash
cd homenest/frontend
npm install
npm run dev
```

✅ You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 4 — Open the app

```
http://localhost:5173
```

> ⚠️ **Both terminals must stay running at the same time.**  
> Terminal 1 = Backend (port 5000)  
> Terminal 2 = Frontend (port 5173)

---

## ⚙ Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
JWT_SECRET=homenest_super_secret_2024
JWT_EXPIRES_IN=7d
DB_PATH=./database/homenest.db
UPLOAD_DIR=./uploads
FRONTEND_URL=http://localhost:5173
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Backend server port |
| `JWT_SECRET` | `homenest_super_secret_2024` | Secret key for JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `DB_PATH` | `./database/homenest.db` | SQLite database file path |
| `UPLOAD_DIR` | `./uploads` | Directory for uploaded images |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |

---

## 🗺 Pages & Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/` | Home | Public | Landing page with hero & search |
| `/login` | Login | Public | Sign in with email & password |
| `/register` | Register | Public | Create owner or renter account |
| `/browse` | Browse | Public | Search & filter all properties |
| `/property/:id` | Property Detail | Public | Full listing with gallery & contact |
| `/bookmarks` | Bookmarks | Renter | Saved/bookmarked properties |
| `/owner/dashboard` | Dashboard | Owner | Overview of all listings |
| `/owner/add` | Add Property | Owner | Create a new property listing |
| `/owner/edit/:id` | Edit Property | Owner | Update an existing listing |
| `/owner/images/:id` | Manage Images | Owner | Upload & delete property photos |
| `/owner/contacts` | Contact Requests | Owner | View messages from renters |

---

## 🔧 Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module` | A file is missing | Re-create the file from the code provided |
| `ENOENT package.json` | package.json deleted/moved | Re-create it and run `npm install` |
| `Port 5000 in use` | Another process using the port | Change `PORT` in `.env` or kill the process |
| `CORS error` | Frontend URL mismatch | Set `FRONTEND_URL=http://localhost:5173` in `.env` |
| `sqlite3 gyp error` | Missing C++ build tools (Windows) | Use `sqlite3` package, not `better-sqlite3` |
| `@tailwind unknown rule` | VS Code CSS warning (not an error) | Install **Tailwind CSS IntelliSense** extension |
| `401 Unauthorized` | JWT token expired | Log out and log in again |
| Images not loading | Wrong upload path | Ensure `backend/uploads/` folder exists |

---

## 🔐 Security

- Passwords hashed with **bcryptjs** (10 salt rounds)
- JWT tokens signed with secret key, expire after **7 days**
- Role-based middleware blocks cross-role access
- Multer validates file types — only `jpg`, `jpeg`, `png`, `webp` allowed
- File size limited to **5MB** per image
- CORS restricted to the frontend URL in `.env`
- SQLite **foreign keys enforced** for data integrity

---

## 🔮 Future Improvements

- [ ] Google Maps integration for property location
- [ ] Email notifications for contact requests
- [ ] Payment integration for advance/deposit
- [ ] Admin panel for platform management
- [ ] Property rating and review system
- [ ] WhatsApp/SMS contact option
- [ ] Radius-based location search
- [ ] PostgreSQL/MySQL for production deployments
- [ ] Property comparison feature
- [ ] Dark mode support

---

## 📄 License

This project is for educational purposes.

---

<div align="center">
  <strong>🏠 HomeNest</strong> — Built with React.js · Node.js · Express · SQLite · Tailwind CSS
</div>