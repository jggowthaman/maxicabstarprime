
import express from "express";
import pool from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// CUSTOMER: Submit a booking
router.post("/", async (req, res) => {
  try {
    const {
      customer_id,
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
      !pickup?.trim() ||
      !destination?.trim() ||
      !travelDate ||
      !travelTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide pickup, destination, date and time.",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO bookings
      (customer_id, pickup_location, dropoff_location,
       pickup_date, pickup_time, vehicle_type,
       passengers, luggage, special_requests, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_id || null,
        pickup.trim(),
        destination.trim(),
        travelDate,
        travelTime,
        vehicle || null,
        Number(passengers) || 1,
        luggage || null,
        notes || null,
        "Pending",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save booking",
    });
  }
});

// ADMIN: Get all bookings
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      "SELECT * FROM bookings ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});

// ADMIN: Update booking status
router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Cancelled",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const [result] = await pool.execute(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
});

export default router;
