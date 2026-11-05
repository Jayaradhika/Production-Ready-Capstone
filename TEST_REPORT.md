# Test Report

Run with `npm test` (Node.js built-in test runner, in-memory SQLite database).

**Result: 20 passed, 0 failed.**

The first 15 tests are regression tests from earlier milestones (API contract, validation, security). The last 5 cover the production features added in this milestone (health check, logging, compression, caching, JSON 404).

## Raw output
```
✔ GET /api/internships returns paginated data with meta
✔ GET /api/internships filters by status and search
✔ GET /api/internships rejects a bad page with 400
✔ GET /api/internships/:id returns 200 and 404
✔ POST /api/applications accepts a valid application (201)
✔ POST /api/applications rejects invalid input with field details (400)
✔ POST /api/applications rejects a duplicate (409)
✔ POST /api/applications rejects a closed internship (409)
✔ POST /api/applications returns 404 for an unknown internship
✔ POST /api/applications rejects malformed JSON (400)
✔ POST /api/applications rejects an oversized body (413)
✔ SQL injection text is treated as plain data
✔ Secure headers are set and X-Powered-By is hidden
✔ Rate limit returns 429 after too many applications
✔ Frontend page is served
✔ GET /health reports ok with database status
✔ Requests are logged as JSON without request bodies
✔ Responses are gzip compressed
✔ Static files are cacheable
✔ Unknown API route returns JSON 404
ℹ tests 20
ℹ pass 20
ℹ fail 0
```

## Dependency audit
`npm audit` result: found 0 vulnerabilities.

## Manual user journey check
1. Open the page: loading message appears, then internships render.
2. Search and status filter update the list and reset to page 1.
3. Previous and Next buttons move between pages.
4. Apply button opens the form (disabled for closed internships).
5. Empty or invalid fields show messages next to each field; focus moves to the first error.
6. Valid submit shows a success message; submitting again shows the duplicate message.
7. Stop the server and reload: an error message with a Retry button appears. Start the server and press Retry: the list loads.
8. Resize to 360px: layout stacks, buttons become full width, nothing scrolls sideways.
