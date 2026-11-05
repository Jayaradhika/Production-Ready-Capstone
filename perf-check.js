// Simple performance check. Start the server first (npm start), then run: npm run perf
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const RUNS = 200;

async function timeEndpoint(url) {
  const times = [];
  for (let i = 0; i < RUNS; i++) {
    const t = performance.now();
    const res = await fetch(BASE + url);
    await res.arrayBuffer();
    times.push(performance.now() - t);
  }
  times.sort((a, b) => a - b);
  const avg = times.reduce((a, b) => a + b, 0) / RUNS;
  return { avg, p95: times[Math.floor(RUNS * 0.95)] };
}

(async () => {
  console.log(`Response time over ${RUNS} requests (ms)`);
  for (const url of ["/health", "/api/internships?page=1&limit=4", "/"]) {
    const r = await timeEndpoint(url);
    console.log(`  ${url.padEnd(34)} avg ${r.avg.toFixed(1)}  p95 ${r.p95.toFixed(1)}`);
  }
  console.log("\nStatic file sizes (bytes)");
  let rawTotal = 0, gzTotal = 0;
  for (const f of ["index.html", "style.css", "app.js"]) {
    const buf = fs.readFileSync(path.join(__dirname, "..", "public", f));
    const gz = zlib.gzipSync(buf).length;
    rawTotal += buf.length; gzTotal += gz;
    console.log(`  ${f.padEnd(14)} raw ${String(buf.length).padStart(6)}  gzip ${String(gz).padStart(6)}`);
  }
  console.log(`  ${"total".padEnd(14)} raw ${String(rawTotal).padStart(6)}  gzip ${String(gzTotal).padStart(6)}`);
})();
