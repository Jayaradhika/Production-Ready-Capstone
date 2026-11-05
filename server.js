const { createApp } = require("./app");
const { seedIfEmpty } = require("./seed");
const db = require("./db");

// A fresh deployment starts with sample data
const added = seedIfEmpty();
if (added) console.log(JSON.stringify({ level: "info", message: `Seeded ${added} internships` }));

const PORT = process.env.PORT || 3000;
const server = createApp().listen(PORT, () =>
  console.log(JSON.stringify({ level: "info", message: `Listening on port ${PORT}` }))
);

// Graceful shutdown (hosting platforms send SIGTERM on redeploy)
function shutdown(signal) {
  console.log(JSON.stringify({ level: "info", message: `${signal} received, shutting down` }));
  server.close(() => {
    db.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}
["SIGTERM", "SIGINT"].forEach((sig) => process.on(sig, () => shutdown(sig)));
