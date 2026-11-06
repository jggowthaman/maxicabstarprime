import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Accept either username or email
    const loginId = (username || email || "").trim();

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/email and password are required",
      });
    }

    // Find admin by username OR email
    const [admins] = await pool.execute(
      `SELECT id, username, email, password
       FROM admins
       WHERE username = ? OR email = ?
       LIMIT 1`,
      [loginId, loginId]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin ID or password",
      });
    }

    const admin = admins[0];

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin ID or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    // Generate JWT
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
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;