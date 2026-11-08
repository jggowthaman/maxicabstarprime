import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const loginId = String(username || email || "").trim();

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/email and password are required",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const [admins] = await pool.execute(
      `SELECT id, username, email, password
       FROM admins
       WHERE username = ? OR email = ?
       LIMIT 1`,
      [loginId, loginId]
    );

    if (!admins.length) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin ID or password",
      });
    }

    const admin = admins[0];

    if (!admin.password) {
      console.error("Admin record has no password hash");
      return res.status(500).json({
        success: false,
        message: "Admin account configuration error",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin ID or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    // Actual error appears in Hostinger backend logs
    console.error("Admin login error:", error.message);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;