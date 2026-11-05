# Walkthrough Video Script (about 3 minutes)

Record your screen with any free tool (Loom, OBS, or Zoom). Upload to YouTube as Unlisted or Google Drive with "anyone with the link can view".

1. **Intro (15 sec)**: "This is my Internship Portal, a full-stack app with an Express API and a plain JavaScript frontend."
2. **User journey (60 sec)**: Open the live site. Search, filter by status, change pages. Click Apply, submit an empty form to show validation, then submit a valid one. Submit again to show the duplicate message.
3. **Mobile (20 sec)**: Open DevTools, switch to a 360px phone view, show the stacked layout.
4. **Failure state (15 sec)**: Show the error message and Retry button (stop the server locally, or turn off the network in DevTools).
5. **Engineering decisions (45 sec)**: Show the README sections: SQLite for simple persistence, parameterized queries, rate limiting, helmet, validation on both sides, JSON logs without personal data, `/health` endpoint.
6. **Quality evidence (25 sec)**: Run `npm test` and show 20 passing tests. Open `QUALITY_REPORT.md`.
7. **Close (10 sec)**: Show the GitHub repository and the live link.
