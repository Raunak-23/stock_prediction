const express = require("express");
const mysql = require("mysql2"); // Use mysql2 instead of mysql
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON body parsing

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change if needed
    password: "",  // Change if needed
    database: "da2_student",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// Test API Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
