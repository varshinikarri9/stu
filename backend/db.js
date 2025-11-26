const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/students.db", (err) => {
  if (err) console.log("❌ DB Error:", err);
  else console.log("✅ Connected to SQLite DB");
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    branch TEXT NOT NULL
  )
`);

module.exports = db;
