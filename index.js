// ---------- IMPORTS ---------- \\
import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";

// ---------- CONSTANTS ---------- \\
const app = express();
const port = 3000;

// ---------- MIDDLEWARE ---------- \\
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ---------- ROUTES ---------- \\
app.use((req, res) => {
  res.render("index", { page: req.path });
});

// ---------- SERVER INIT ---------- \\
app.listen(port, () => {
  console.log(`Server running on port ${chalk.green(port)}.`);
});
