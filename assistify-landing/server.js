const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware für statische Dateien
app.use(express.static(path.join(__dirname)));

// Routen
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.get(["/login", "/login.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/impressum", (req, res) => {
  res.sendFile(path.join(__dirname, "impressum.html"));
});

app.get("/datenschutz", (req, res) => {
  res.sendFile(path.join(__dirname, "datenschutz.html"));
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).send("<h1>404 - Seite nicht gefunden</h1>");
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
