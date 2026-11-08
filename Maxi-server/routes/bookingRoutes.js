
import express from "express";
import pool from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ============================================
// CUSTOMER: Create booking + save customer data
// ============================================
router.post("/", async (req, res) => {
  let connection;

  try {
    const {
      customer_id,
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
    } = req.body;

    // Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      typeof pickup !== "string" ||
      !pickup.trim() ||
      typeof destination !== "string" ||
      !destination.trim() ||
      !travelDate ||
      !travelTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone, pickup, destination, date and time are required.",
      });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    let customerId = null;

    // Reuse customer_id only if it exists in the customers table.
    if (customer_id) {
      const [customerRows] = await connection.execute(
        "SELECT id FROM customers WHERE id = ? LIMIT 1",
        [customer_id]
      );

      if (customerRows.length > 0) {
        customerId = customerRows[0].id;
      }
    }

    // Find customer using phone number.
    if (!customerId) {
      const [existingCustomers] = await connection.execute(
        "SELECT id FROM customers WHERE phone = ? LIMIT 1",
        [phone.trim()]
      );

      if (existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;

        await connection.execute(
          `UPDATE customers
           SET full_name = ?, email = ?
           WHERE id = ?`,
          [
            name.trim(),
            email?.trim() || null,
            customerId,
          ]
        );
      } else {
        // Create new customer.
        const [customerResult] = await connection.execute(
          `INSERT INTO customers
           (full_name, email, phone)
           VALUES (?, ?, ?)`,
          [
            name.trim(),
            email?.trim() || null,
            phone.trim(),
          ]
        );

        customerId = customerResult.insertId;
      }
    }

    // Insert booking with customer ID.
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
        vehicle?.trim() || null,
        Math.max(1, Number(passengers) || 1),
        Math.max(0, Number(luggage) || 0),
        notes?.trim() || null,
        "Pending",
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Booking and customer details saved successfully.",
      bookingId: bookingResult.insertId,
      customerId,
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Booking rollback error:", rollbackError);
      }
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

// ============================================
// ADMIN: Get bookings with customer information
// ============================================
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      `SELECT
         b.id,
         b.customer_id,
         b.pickup_location,
         b.dropoff_location,
         b.pickup_date,
         b.pickup_time,
         b.vehicle_type,
         b.passengers,
         b.luggage,
         b.special_requests,
         b.status,
         b.created_at,

         c.full_name AS customer_name,
         c.email AS customer_email,
         c.phone AS customer_phone

       FROM bookings b

       LEFT JOIN customers c
         ON b.customer_id = c.id

       ORDER BY b.created_at DESC`
    );

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

// ============================================
// ADMIN: Get one booking with customer details
// ============================================
router.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT
         b.*,
         c.full_name AS customer_name,
         c.email AS customer_email,
         c.phone AS customer_phone
       FROM bookings b
       LEFT JOIN customers c ON b.customer_id = c.id
       WHERE b.id = ?
       LIMIT 1`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.json({
      success: true,
      booking: rows[0],
    });
  } catch (error) {
    console.error("Fetch booking details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking details.",
    });
  }
});

// ============================================
// ADMIN: Update booking status
// ============================================
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

    const [result] = await pool.execute(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
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
