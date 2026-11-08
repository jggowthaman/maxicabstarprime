import express from "express";
import pool from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ======================================================
// CUSTOMER: Create booking and save customer information
// ======================================================
router.post("/", async (req, res) => {
  let connection;

  try {
    const {
      name,
      phone,
      email,
      pickup,
      destination,
      travelDate,
      travelTime,
      vehicle,
      passengers,
      luggage,
      notes,
      tripType,
      flightNumber,
    } = req.body;

    // Validate required customer and booking fields
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
        message: "Please provide all required booking and customer details.",
      });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Save customer information
    const customerMessage = [
      `Trip Type: ${tripType || "N/A"}`,
      `Vehicle: ${vehicle || "N/A"}`,
      `Pickup: ${pickup}`,
      `Destination: ${destination}`,
      `Travel Date: ${travelDate}`,
      `Travel Time: ${travelTime}`,
      `Passengers: ${passengers || 1}`,
      `Luggage: ${luggage ?? 0}`,
      `Flight Number: ${flightNumber || "N/A"}`,
      `Notes: ${notes || "N/A"}`,
    ].join("\n");

    const [customerResult] = await connection.execute(
      `INSERT INTO customers
        (full_name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email?.trim() || null,
        phone.trim(),
        "MaxiCabStar Prime Booking",
        customerMessage,
      ]
    );

    const customerId = customerResult.insertId;

    // 2. Save booking linked to the customer
    const [bookingResult] = await connection.execute(
      `INSERT INTO bookings
        (
          customer_id,
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
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerId,
        pickup.trim(),
        destination.trim(),
        travelDate,
        travelTime,
        vehicle || null,
        Number(passengers) || 1,
        Number(luggage) || 0,
        notes?.trim() || null,
        "Pending",
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Booking and customer information saved successfully.",
      bookingId: bookingResult.insertId,
      customerId,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save booking.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// ======================================================
// ADMIN: Get all bookings with customer details
// ======================================================
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      `SELECT
          b.*,
          c.full_name AS customer_name,
          c.full_name AS customer_full_name,
          c.email AS customer_email,
          c.phone AS customer_phone,
          c.phone AS customer_phone_number,
          c.id AS linked_customer_id
       FROM bookings b
       LEFT JOIN customers c
          ON b.customer_id = c.id
       ORDER BY b.created_at DESC`
    );

    // Provide customer data in both flat and nested formats
    const formattedBookings = bookings.map((booking) => ({
      ...booking,

      customer: booking.linked_customer_id
        ? {
            id: booking.linked_customer_id,
            full_name: booking.customer_name,
            name: booking.customer_name,
            email: booking.customer_email,
            phone: booking.customer_phone,
          }
        : null,
    }));

    return res.status(200).json({
      success: true,
      bookings: formattedBookings,
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
    });
  }
});

// ======================================================
// ADMIN: Get one booking with customer details
// ======================================================
router.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT
          b.*,
          c.full_name AS customer_name,
          c.full_name AS customer_full_name,
          c.email AS customer_email,
          c.phone AS customer_phone,
          c.phone AS customer_phone_number,
          c.id AS linked_customer_id
       FROM bookings b
       LEFT JOIN customers c
          ON b.customer_id = c.id
       WHERE b.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const booking = rows[0];

    booking.customer = booking.linked_customer_id
      ? {
          id: booking.linked_customer_id,
          full_name: booking.customer_name,
          name: booking.customer_name,
          email: booking.customer_email,
          phone: booking.customer_phone,
        }
      : null;

    return res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Fetch booking details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking details.",
    });
  }
});

// ======================================================
// ADMIN: Update booking status
// ======================================================
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
        message: "Invalid booking status.",
      });
    }

    const [result] = await pool.execute(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.json({
      success: true,
      message: "Booking status updated successfully.",
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update booking status.",
    });
  }
});

export default router;