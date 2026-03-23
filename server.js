const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// GET all expenses
app.get("/expenses", (req, res) => {
    db.query("SELECT * FROM expenses ORDER BY date DESC", (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

// POST add new expense
app.post("/addExpense", (req, res) => {
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !date) {
        return res.status(400).send("Amount, category, and date are required.");
    }

    const sql = "INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)";
    db.query(sql, [amount, category, description, date], (err, result) => {
        if (err) {
            res.status(500).send("Error adding expense: " + err.message);
        } else {
            res.send("Expense added successfully!");
        }
    });
});

// DELETE an expense
app.delete("/deleteExpense/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM expenses WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting expense.");
        } else {
            res.send("Expense deleted.");
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ TrackWise server running at http://localhost:${PORT}`);
});