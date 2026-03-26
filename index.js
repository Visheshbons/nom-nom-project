// ---------- IMPORTS ---------- \\
import express from "express";
import chalk from "chalk";

// ---------- CONSTANTS ---------- \\
const app = express();
const port = 3000;

// ---------- ROUTES ---------- \\
app.get("/", (req, res) => {
  res.send("Welcome to the nom-nom project!");
});

// ---------- SERVER INIT ---------- \\
app.listen(port, () => {
  console.log(`Server running on port ${chalk.green(port)}.`);
});
