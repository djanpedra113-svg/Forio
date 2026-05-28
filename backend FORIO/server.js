const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Forio backend is currently running.");
});

app.post("/register", async (req, res) => {
    const { username } = req.body;

    db.run(
        "INSERT INTO users (username) VALUES (?)",
        [username],
        function (err) {
            if (err) {
                return res.status(500).json({ message: "User could not be registered." });
            }

            res.json({ message: "User registered successfully." });
        }
    );
});

app.post("/login", (req, res) => {
    const { username } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        function (err, user) {
            if (err) {
                console.error("Login database error:", err);
                return res.status(500).json({ message: "Login database error." });
            }

            if (!user) {
                return res.status(401).json({ message: "User not found." });
            }

            const token = jwt.sign(
                { username: user.username },
                "secretkey",
                { expiresIn: "1h" }
            );

            res.json({
                message: "Login successful.",
                token: token
            });
        }
    );
});

app.post("/save-result", (req, res) => {
    const { username, quizName, score, total, mistakes } = req.body;

    console.log(" Saved result:", req.body);

    db.run(
        `INSERT INTO quiz_results (username, quizName, score, total, mistakes)
         VALUES (?, ?, ?, ?, ?)`,
        [username, quizName, score, total, JSON.stringify(mistakes)],
        function (err) {
            if (err) {
                console.error("Save result database error:", err.message);
                return res.status(500).json({
                    message: "Result could not be saved.",
                    error: err.message
                });
            }

            res.json({
                message: "Result saved to database successfully.",
                resultId: this.lastID
            });
        }
    );
});

app.get("/results/:username/:quizName", (req, res) => {
    const { username, quizName } = req.params;

    db.get(
        `SELECT * FROM quiz_results 
         WHERE username = ? AND quizName = ?
         ORDER BY id DESC 
         LIMIT 1`,
        [username, quizName],
        function (err, result) {
            if (err) {
                return res.status(500).json({ message: "Could not get result." });
            }

            res.json(result);
        }
    );
});

app.get("/admin/results", (req, res) => {
    db.all("SELECT * FROM quiz_results ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Could not get results." });
        }

        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});