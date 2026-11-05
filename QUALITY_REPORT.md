# Quality Report

## Performance
Measured with `npm run perf` on a local machine (200 requests per endpoint, times in ms).

```
Response time over 200 requests (ms)
  /health                            avg 1.6  p95 4.5
  /api/internships?page=1&limit=4    avg 1.7  p95 4.3
  /                                  avg 1.9  p95 4.2

Static file sizes (bytes)
  index.html     raw   3234  gzip   1262
  style.css      raw   3523  gzip   1259
  app.js         raw   6109  gzip   2213
  total          raw  12866  gzip   4734
```

What helps performance:
- Gzip compression on all responses (frontend files shrink from 12,866 to 4,734 bytes, about 63 percent smaller).
- Static files cached for 1 hour (`Cache-Control: max-age=3600`).
- Pagination limits every list response to 50 rows at most (default 4).
- No frontend framework or external libraries, so there is almost nothing to download.
- SQLite in WAL mode, with synchronous prepared statements.

## Accessibility
Text contrast, calculated with the WCAG formula (minimum required is 4.5:1):

| Element | Colors | Ratio | Result |
|---|---|---|---|
| Body text | #172033 on #f5f7fb | 15.2:1 | Pass |
| Muted text on page | #53607a on #f5f7fb | 5.9:1 | Pass |
| Muted text on card | #53607a on #ffffff | 6.3:1 | Pass |
| White on brand (header, buttons) | #ffffff on #2347b5 | 8.0:1 | Pass |
| White on brand hover | #ffffff on #1a3590 | 10.7:1 | Pass |
| Error text on card | #b3261e on #ffffff | 6.5:1 | Pass |
| Success text on card | #17692f on #ffffff | 6.8:1 | Pass |
| Open badge | #17692f on #dff3e5 | 5.8:1 | Pass |
| Closed badge | #4a4a4a on #ececec | 7.5:1 | Pass |
| Secondary button | #172033 on #e4e8f2 | 13.3:1 | Pass |

Other accessibility features in the code:
- `lang="en"`, one `h1`, logical heading order, `main` landmark, skip-to-content link.
- Every form field has a visible `label`; invalid fields get `aria-invalid` and a text message.
- Loading, error and form messages use `aria-live` so screen readers announce them.
- Clear focus outline on every interactive element (`:focus-visible`).
- Buttons are at least 44px tall for touch.
- Motion is switched off for users who prefer reduced motion.
- A `noscript` message explains that JavaScript is needed.

## Security
See `SECURITY_CHECKLIST.md`. `npm audit` reports 0 vulnerabilities.

## Regression
All 20 automated tests pass (see `TEST_REPORT.md`). The 15 tests from earlier milestones still pass unchanged after the production changes.

## Observability
- Every request is logged as one JSON line (time, method, path, status, duration). Request bodies are never logged, so personal data stays out of logs (covered by a test).
- `GET /health` checks the database and returns 200 or 503, used by the hosting platform.
- The server shuts down cleanly on SIGTERM.
