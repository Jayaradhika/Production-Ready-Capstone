const fs = require("fs");
const path = require("path");
const db = require("./db");

const insert = db.prepare(`
  INSERT INTO internships (title, company, location, work_mode, duration_weeks, stipend, status, description)
  VALUES (@title, @company, @location, @work_mode, @duration_weeks, @stipend, @status, @description)
`);

function seed() {
  const records = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "seed.json"), "utf8"));
  db.transaction(() => {
    db.exec("DELETE FROM applications");
    db.exec("DELETE FROM internships");
    db.exec("DELETE FROM sqlite_sequence WHERE name IN ('internships', 'applications')");
    records.forEach((r) => insert.run(r));
  })();
  return records.length;
}

function seedIfEmpty() {
  const { n } = db.prepare("SELECT COUNT(*) AS n FROM internships").get();
  return n === 0 ? seed() : 0;
}

if (require.main === module) console.log(`Seeded ${seed()} internships.`);

module.exports = { seed, seedIfEmpty };
