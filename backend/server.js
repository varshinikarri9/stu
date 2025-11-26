const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET all students
app.get("/students", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.json({ error: err.message });
    res.json(rows);
  });
});

// GET single student by ID
app.get("/students/:id", (req, res) => {
  db.get("SELECT * FROM students WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.json({ error: err.message });
    res.json(row);
  });
});

// POST (Create)
app.post("/students", (req, res) => {
  const { name, age, branch } = req.body;
  db.run(
    "INSERT INTO students (name, age, branch) VALUES (?, ?, ?)",
    [name, age, branch],
    function (err) {
      if (err) return res.json({ error: err.message });
      res.json({ id: this.lastID, name, age, branch });
    }
  );
});

// PUT (Update)
app.put("/students/:id", (req, res) => {
  const { name, age, branch } = req.body;
  db.run(
    "UPDATE students SET name=?, age=?, branch=? WHERE id=?",
    [name, age, branch, req.params.id],
    function (err) {
      if (err) return res.json({ error: err.message });
      res.json({ updatedID: req.params.id });
    }
  );
});

// PATCH (Partial update)
app.patch("/students/:id", (req, res) => {
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  const updates = fields.map((f) => `${f} = ?`).join(", ");

  db.run(
    `UPDATE students SET ${updates} WHERE id = ?`,
    [...values, req.params.id],
    function (err) {
      if (err) return res.json({ error: err.message });
      res.json({ updatedID: req.params.id });
    }
  );
});

// DELETE
app.delete("/students/:id", (req, res) => {
  db.run("DELETE FROM students WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.json({ error: err.message });
    res.json({ deletedID: req.params.id });
  });
});

if (require.main === module) {
   app.listen(5000, () => console.log("Server running"));
}
module.exports = app;
