const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "https://store-frontend-two.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Default route
app.get("/", (req, res) => {
  res.send(" App  is running...");
});

//Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

 module.exports = app;

