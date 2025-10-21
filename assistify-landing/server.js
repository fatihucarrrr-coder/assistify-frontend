require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Route für Registrierung
app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({ success: false, message: "Bitte alle Felder ausfüllen." });
  }

  try {
    // E-Mail Transporter einrichten
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Willkommens-Mail
    const mailOptions = {
      from: `"Assistify Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Willkommen bei Assistify 🚀",
      html: `
        <h2>Hallo ${name},</h2>
        <p>Willkommen bei <strong>Assistify</strong>! 🎉</p>
        <p>Wir freuen uns, dass du dabei bist. Du kannst dich schon bald in dein persönliches Dashboard einloggen und deinen KI-Support-Chatbot konfigurieren.</p>
        <p>Bei Fragen erreichst du uns unter <a href="mailto:assistify.business@gmail.com">assistify.business@gmail.com</a>.</p>
        <br>
        <p>Viele Grüße,<br>Dein Assistify-Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Registrierung erfolgreich! E-Mail gesendet." });
  } catch (err) {
    console.error("Fehler beim E-Mail-Versand:", err);
    res.json({ success: false, message: "Fehler beim E-Mail-Versand." });
  }
});

// Server starten
app.listen(PORT, () => console.log(`✅ Server läuft auf http://localhost:${PORT}`));
