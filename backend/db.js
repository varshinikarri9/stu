const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Resolve DB directory
const dataDir = path.join(__dirname, "data");

// Create /data folder if missing (fix for Jenkins)
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("📁 Created data directory at:", dataDir);
}

// Path to DB file
const dbPath = path.join(dataDir, "students.db");

// Open / create DB
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.log("❌ DB Error:", err);
  else console.log("✅ Connected to SQLite DB at:", dbPath);
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    branch TEXT NOT NULL
  )
`);

module.exports = db;
