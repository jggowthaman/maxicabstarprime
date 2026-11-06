
import express from "express";
import db from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

const DEFAULT_SETTINGS = {
  companyName: "MaxiCabStar Prime",
  companyEmail: "maxicabstarprime@gmail.com",
  companyPhone: "",
  companyAddress: "Singapore",
  currency: "SGD",
  timezone: "Asia/Singapore",
  bookingNotifications: true,
  cancellationNotifications: true,
  customerNotifications: true,
  marketingNotifications: false,
};

async function getSettings() {
  const [rows] = await db.execute(
    "SELECT setting_value FROM website_settings WHERE setting_key = ?",
    ["general"]
  );

  if (!rows.length) {
    return DEFAULT_SETTINGS;
  }

  const saved =
    typeof rows[0].setting_value === "string"
      ? JSON.parse(rows[0].setting_value)
      : rows[0].setting_value;

  return { ...DEFAULT_SETTINGS, ...saved };
}

// ADMIN: Get settings
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const settings = await getSettings();

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load settings.",
    });
  }
});

// ADMIN: Save settings
router.put("/", adminMiddleware, async (req, res) => {
  try {
    const settings = {
      ...DEFAULT_SETTINGS,
      ...req.body,
    };

    await db.execute(
      `INSERT INTO website_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      ["general", JSON.stringify(settings)]
    );

    res.json({
      success: true,
      message: "Settings saved successfully.",
      settings,
    });
  } catch (error) {
    console.error("Save settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save settings.",
    });
  }
});

export default router;
