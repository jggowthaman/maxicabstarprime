import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login first.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store authenticated admin information
    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

export default adminMiddleware;