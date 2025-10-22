import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Hilfsvariablen für Dateipfade (wichtig für ES-Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB-Verbindung
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Mit MongoDB verbunden"))
  .catch((err) => console.error("❌ MongoDB Verbindung fehlgeschlagen:", err));

// Routen
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/impressum", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "impressum.html"));
});

app.get("/datenschutz", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "datenschutz.html"));
});

// Serverstart
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
