
import express from "express";
import db from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC: Save Contact form enquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // IMPORTANT: Database uses full_name, not name
    const sql = `
      INSERT INTO customers
      (full_name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name.trim(),
      email.trim(),
      phone?.trim() || null,
      subject?.trim() || "Website Enquiry",
      message.trim(),
    ]);

    return res.status(201).json({
      success: true,
      message: "Enquiry saved successfully!",
      customerId: result.insertId,
    });
  } catch (error) {
    console.error("Customer insert error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save enquiry.",
      error: error.message,
    });
  }
});

// ADMIN: Get all customer enquiries
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const [customers] = await db.execute(`
      SELECT
        id,
        full_name AS name,
        email,
        phone,
        subject,
        message,
        created_at
      FROM customers
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("Customer fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
});

export default router;
