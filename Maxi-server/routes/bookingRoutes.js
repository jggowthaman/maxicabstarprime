import express from "express";
import pool from "../config/db.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =====================================================
   CUSTOMER: CREATE BOOKING
   Save customer information and booking information
===================================================== */

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
      !name?.trim() ||
      !phone?.trim() ||
      !pickup?.trim() ||
      !destination?.trim() ||
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

    let customerId = customer_id || null;

    /* ---------------------------------------------
       FIND EXISTING CUSTOMER BY PHONE
    --------------------------------------------- */

    const [existingCustomers] = await connection.execute(
      "SELECT id FROM customers WHERE phone = ? LIMIT 1",
      [phone.trim()]
    );

    if (existingCustomers.length > 0) {
      customerId = existingCustomers[0].id;

      // Update customer information
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
      // Insert new customer
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

    /* ---------------------------------------------
       SAVE BOOKING WITH CUSTOMER INFORMATION
    --------------------------------------------- */

    const [bookingResult] = await connection.execute(
      `INSERT INTO bookings (
        customer_id,
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerId,
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
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Customer and booking saved successfully.",
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
      error: error.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/* =====================================================
   ADMIN: GET ALL BOOKINGS WITH CUSTOMER INFORMATION
===================================================== */

router.get("/", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      `SELECT
        b.id,
        b.customer_id,
        b.customer_name,
        b.customer_email,
        b.customer_phone,
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

        c.full_name AS linked_customer_name,
        c.email AS linked_customer_email,
        c.phone AS linked_customer_phone

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

/* =====================================================
   ADMIN: GET SINGLE BOOKING
===================================================== */

router.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      `SELECT
        b.*,
        c.full_name AS linked_customer_name,
        c.email AS linked_customer_email,
        c.phone AS linked_customer_phone
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      WHERE b.id = ?
      LIMIT 1`,
      [req.params.id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.json({
      success: true,
      booking: bookings[0],
    });
  } catch (error) {
    console.error("Fetch single booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking.",
    });
  }
});

/* =====================================================
   ADMIN: UPDATE BOOKING STATUS
===================================================== */

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