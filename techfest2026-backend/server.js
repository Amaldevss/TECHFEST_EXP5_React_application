require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const registrationRoutes = require("./routes/registrations");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err.message));

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});