const express = require("express");
const path = require("path");

const app = express();

// Statische Dateien (CSS, Bilder, JS)
app.use(express.static(path.join(__dirname)));

// Routen für deine HTML-Seiten
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/impressum", (req, res) => {
  res.sendFile(path.join(__dirname, "impressum.html"));
});

app.get("/datenschutz", (req, res) => {
  res.sendFile(path.join(__dirname, "datenschutz.html"));
});

// Fallback für alle nicht gefundenen Seiten
app.use((req, res) => {
  res.status(404).send("Seite nicht gefunden");
});

// Render verwendet PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
