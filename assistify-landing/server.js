require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB Verbindung
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Erfolgreich mit MongoDB verbunden"))
  .catch((err) => console.error("❌ MongoDB Verbindung fehlgeschlagen:", err));

// Benutzer Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Routen
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

// Registrierung
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("<h2>Email existiert bereits. Bitte logge dich ein.</h2>");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.send("<h2>Registrierung erfolgreich! Du kannst dich jetzt einloggen.</h2>");
  } catch (error) {
    console.error(error);
    res.send("<h2>Fehler bei der Registrierung.</h2>");
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("<h2>Benutzer nicht gefunden.</h2>");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("<h2>Falsches Passwort.</h2>");
    }

    res.send("<h2>Login erfolgreich! Willkommen zurück 😊</h2>");
  } catch (error) {
    console.error(error);
    res.send("<h2>Fehler beim Login.</h2>");
  }
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
