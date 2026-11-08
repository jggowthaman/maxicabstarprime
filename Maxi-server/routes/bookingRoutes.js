import express from "express";
import db from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ==========================================
   PUBLIC: CREATE BOOKING
   Save customer + booking details in bookings
========================================== */

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      pickup,
      destination,
      travelDate,
      travelTime,
      vehicle,
      passengers,
      luggage,
      notes,
    } = req.body;

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !pickup?.trim() ||
      !destination?.trim() ||
      !travelDate ||
      !travelTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required booking fields.",
      });
    }

    const sql = `
      INSERT INTO bookings (
        customer_name,
        customer_email,
        customer_phone,
        pickup_location,
        dropoff_location,
        pickup_date,
        pickup_time,
        vehicle_type,
        passengers,
        luggage,
        special_requests,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name.trim(),
      email?.trim() || null,
      phone.trim(),
      pickup.trim(),
      destination.trim(),
      travelDate,
      travelTime,
      vehicle || null,
      Number(passengers) || 1,
      Number(luggage) || 0,
      notes?.trim() || null,
      "Pending",
    ]);

    return res.status(201).json({
      success: true,
      message: "Booking saved successfully!",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.error("Booking insert error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save booking.",
      error: error.message,
    });
  }
});

/* ==========================================
   ADMIN: GET ALL BOOKINGS
========================================== */

router.get("/", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await db.execute(`
      SELECT
        id,
        customer_name,
        customer_email,
        customer_phone,
        pickup_location,
        dropoff_location,
        pickup_date,
        pickup_time,
        vehicle_type,
        passengers,
        luggage,
        special_requests,
        status,
        created_at
      FROM bookings
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
    });
  }
});

/* ==========================================
   ADMIN: GET SINGLE BOOKING
========================================== */

router.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await db.execute(
      `SELECT
        id,
        customer_name,
        customer_email,
        customer_phone,
        pickup_location,
        dropoff_location,
        pickup_date,
        pickup_time,
        vehicle_type,
        passengers,
        luggage,
        special_requests,
        status,
        created_at
      FROM bookings
      WHERE id = ?
      LIMIT 1`,
      [req.params.id]
    );

    if (!bookings.length) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking: bookings[0],
    });
  } catch (error) {
    console.error("Fetch booking details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking details.",
    });
  }
});

/* ==========================================
   ADMIN: UPDATE BOOKING STATUS
========================================== */

router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status.",
      });
    }

    const [result] = await db.execute(
      `UPDATE bookings SET status = ? WHERE id = ?`,
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully.",
    });
  } catch (error) {
    console.error("Booking status update error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update booking status.",
    });
  }
});

export default router;