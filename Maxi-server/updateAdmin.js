import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "./config/db.js";

dotenv.config();

async function updateAdmin() {
  try {
    const username = "admin";
    const email = "maxicabstarprime@gmail.com";
    const password = "Maxicab@123";

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `UPDATE admins
       SET username = ?, email = ?, password = ?
       WHERE id = 1`,
      [username, email, hashedPassword]
    );

    if (result.affectedRows === 0) {
      console.log("Admin ID 1 not found.");
    } else {
      console.log("Admin credentials updated successfully!");
    }
  } catch (error) {
    console.error("Update failed:", error.message);
  } finally {
    await pool.end();
  }
}

updateAdmin();