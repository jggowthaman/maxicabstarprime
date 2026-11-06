import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "./config/db.js";

dotenv.config();

async function updateAdmin() {
  try {
    // Your new admin credentials
    const username = "admin";
    const email = "maxicabstarprime@gmail.com";
    const password = "Maxicab@123";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update existing admin
    const [result] = await pool.execute(
      `UPDATE admins
       SET username = ?, email = ?, password = ?
       WHERE id = ?`,
      [username, email, hashedPassword, 1]
    );

    if (result.affectedRows === 0) {
      console.log("Admin not found. Check your admin ID.");
    } else {
      console.log("Admin credentials updated successfully!");
      console.log("Username:", username);
      console.log("Email:", email);
    }
  } catch (error) {
    console.error("Failed to update admin:", error.message);
  } finally {
    await pool.end();
  }
}

updateAdmin();