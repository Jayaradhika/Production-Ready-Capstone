# Security Checklist

- [x] **Parameterized queries**: all SQL uses `?` or named parameters, never string joining (`src/app.js`).
- [x] **Secure headers**: `helmet` sets CSP, HSTS, nosniff, frameguard and hides `X-Powered-By`.
- [x] **Rate limiting**: 100 requests per minute on `/api`, 5 per minute on `POST /api/applications`; returns 429.
- [x] **Server-side validation**: every field is checked again on the server (`src/validate.js`), even though the browser also checks.
- [x] **Body size limit**: JSON bodies over 10 KB are rejected with 413.
- [x] **XSS protection**: the frontend uses `textContent`, never `innerHTML`, for API data.
- [x] **Safe errors**: clear messages, no stack traces or database details sent to the user.
- [x] **Duplicate protection**: one application per email per internship (database `UNIQUE` constraint).
- [x] **Data integrity**: foreign keys on, `CHECK` constraints in `schema.sql`.
- [x] **No personal data in logs**: request bodies are never logged.
- [x] **No secrets in the repo**: `.gitignore` excludes `.env` and the database file.
- [x] **Dependencies**: `npm audit` shows 0 known vulnerabilities.
