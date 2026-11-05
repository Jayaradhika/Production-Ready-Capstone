# Internship Portal

A full-stack internship portal. Browse and search internships, then apply through a form validated on both the client and the server.

**Live app:** ADD_YOUR_LIVE_LINK_HERE
**Walkthrough video:** ADD_YOUR_VIDEO_LINK_HERE

## Features
- Internship list with search, status filter and pagination
- Loading, empty and error states with a Retry button
- Application form with field-level errors from both browser and server
- Mobile-first layout, keyboard and screen reader friendly
- Rate limiting, secure headers, parameterized queries, request logging, health check

## Tech stack
Node.js, Express, SQLite (better-sqlite3), plain HTML/CSS/JavaScript, helmet, express-rate-limit, compression, Node test runner.

## Run locally
```bash
npm install
npm start        # http://localhost:3000 (seeds 8 sample internships on first start)
npm test         # 20 tests
npm run perf     # response time check (server must be running)
```
Requires Node.js 18 or newer. Optional: `PORT` changes the port, `DB_FILE` changes the database path.

## API
| Method | Path | Purpose | Status codes |
|---|---|---|---|
| GET | `/health` | Health check | 200, 503 |
| GET | `/api/internships` | List (`page`, `limit`, `status`, `q`) | 200, 400, 429 |
| GET | `/api/internships/:id` | One internship | 200, 400, 404 |
| POST | `/api/applications` | Submit application | 201, 400, 404, 409, 413, 429 |

Success: `{ "data": ... }` (lists add `"meta"`). Error: `{ "error": { "code", "message", "details" } }`.

## Deploy (Render, free)
1. Push this repo to GitHub.
2. On render.com choose New, Web Service, connect the repo. Render reads `render.yaml`.
3. Deploy. Health check path is `/health`.
Note: on the free plan the database file resets on redeploy; sample data is seeded again automatically.

## Engineering decisions
- **SQLite**: no separate database server, so setup and deployment stay simple. For many users, switch to PostgreSQL.
- **Parameterized queries only**: user input never becomes SQL text, which prevents SQL injection.
- **Validate twice**: the browser gives fast feedback, the server is the real gatekeeper.
- **Two rate limits**: a general one for the API and a stricter one for the form, to slow spam.
- **Logs without bodies**: JSON lines make logs easy to search, and leaving out bodies keeps personal data out.
- **`textContent` instead of `innerHTML`**: stops stored text from running as script.
- **No frontend framework**: the page is under 5 KB gzipped and loads fast.
- **App factory (`createApp`)**: lets tests start isolated copies with different settings.

## Project structure
```
public/        frontend (index.html, style.css, app.js)
src/           app.js (routes, security, logging), validate.js, db.js, seed.js, server.js
test/          api.test.js
scripts/       perf-check.js
schema.sql     database tables
seed.json      sample data
TEST_REPORT.md, QUALITY_REPORT.md, SECURITY_CHECKLIST.md, WALKTHROUGH_SCRIPT.md
```

## Known limits
Applications are stored but there is no admin screen to view them, and there is no login. Both would be the next steps.
