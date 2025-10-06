# Evangadi Forum

A full‑stack Q&A forum with a Node.js/Express + MySQL backend and a React (Vite) frontend.

## Monorepo structure

```
./backend   # Express API + MySQL
./frontend  # React (Vite) client
```

## Tech stack

- Backend: Node.js, Express, MySQL (mysql2), JWT auth, bcrypt, CORS, dotenv
- Frontend: React 18, Vite, React Router, Axios, Bootstrap/MUI

## Prerequisites

- Node.js 18+
- MySQL 8+
- npm (comes with Node)

---

## Backend setup (Express API)

1) Install dependencies

```bash
cd backend
npm install
```

2) Create an `.env` file in `backend/`

```bash
# server
PORT=5000
JWT_SECRET=your_jwt_secret_here

# database
DB_HOST=localhost
USER=your_mysql_username
PASSWORD=your_mysql_password
DATABASE=evangadi_forum
```

3) Initialize the database (optional but recommended)

- Open MySQL and create the database if it does not exist.
- Seed schema/data using the SQL in `backend/services/sql/initial-queries.sql`.

```bash
# example (from mysql client)
CREATE DATABASE IF NOT EXISTS evangadi_forum;
# then run the contents of backend/services/sql/initial-queries.sql
```

4) Start the API server

```bash
# from backend/
node app.js
```

- The server reads `PORT` from `.env`. Example: `http://localhost:5000`
- All routes are mounted under `/api/*`.

### Auth

- Protected routes require an `Authorization: Bearer <token>` header (JWT signed with `JWT_SECRET`).

### API routes (summary)

Base: `http://<HOST>:<PORT>/api`

- Users
  - `POST /users/register`
  - `POST /users/login`
  - `GET  /users/check` (protected)
- Questions (protected by auth middleware in `app.js`)
  - `POST /questions/ask-questions`
  - `GET  /questions/all-questions`
  - `GET  /questions/single-questions/:question_id`
- Answers (protected)
  - `POST /answers/give-answer/:question_id`
  - `GET  /answers/all-answers/:post_id`
- Install
  - `GET  /install/install`

---

## Frontend setup (React + Vite)

1) Install dependencies

```bash
cd frontend
npm install
```

2) Create `.env` in `frontend/` and set the API base URL (must include `/api`)

```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

3) Run the development server

```bash
npm run dev
```

- Vite default dev server: `http://localhost:5173`
- The app uses `frontend/src/axiosConfig.jsx` to point Axios at `VITE_API_URL`.

### Build

```bash
npm run build
npm run preview
```

---

## Deployment notes

- Frontend includes a `netlify.toml` with SPA rewrite to `index.html`.
- For backend hosting (e.g., Render, Railway), expose the Express app and set the env vars.
- Ensure the frontend `VITE_API_URL` points to your deployed API base (including `/api`).

## Scripts reference

- Backend `package.json` currently has no start script; use `node app.js` (or add scripts as desired).
- Frontend scripts:
  - `npm run dev` – start Vite dev server
  - `npm run build` – production build
  - `npm run preview` – preview the production build

## Troubleshooting

- If auth‑protected endpoints return 401, verify the `Authorization` header is `Bearer <token>` and `JWT_SECRET` matches server config.
- Verify MySQL credentials and that the database exists (`DB_HOST`, `USER`, `PASSWORD`, `DATABASE`).
- Confirm `VITE_API_URL` includes `/api` and matches your backend origin/port.

