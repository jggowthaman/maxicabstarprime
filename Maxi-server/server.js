
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adminPasswordRoutes from "./routes/adminPasswordRoutes.js";

dotenv.config();

const app = express();

// ===============================
// CORS CONFIGURATION
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://maxicabstarprime.com",
  "https://www.maxicabstarprime.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (e.g. direct API checks)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// API HEALTH CHECK
// ===============================
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MaxiCabStar Prime API is running",
  });
});

// Root health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MaxiCabStar Prime backend is live",
  });
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminPasswordRoutes);

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS origin not allowed",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MaxiCabStar Prime API running on port ${PORT}`);
});
