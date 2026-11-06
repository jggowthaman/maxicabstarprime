import express from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ADMIN: Change password
router.put("/change-password", adminMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // The JWT middleware should provide the logged-in admin ID
    const adminId = req.admin?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new passwords are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters.",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password.",
      });
    }

    // Fetch authenticated admin
    const [admins] = await db.execute(
      "SELECT id, password FROM admins WHERE id = ? LIMIT 1",
      [adminId]
    );

    if (!admins.length) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    const admin = admins[0];

    // Verify existing password
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update MySQL
    await db.execute(
      "UPDATE admins SET password = ? WHERE id = ?",
      [hashedPassword, adminId]
    );

    return res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password.",
    });
  }
});

export default router;