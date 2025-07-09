const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authenticateUser = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

//  GET - Public route (All users can view)
router.get("/", getAllProducts);

//  POST - Admin only
router.post("/", authenticateUser, roleMiddleware("admin"), addProduct);

//  PUT - Admin only
router.put("/:id", authenticateUser, roleMiddleware("admin"), updateProduct);

// DELETE - Admin only
router.delete("/:id", authenticateUser, roleMiddleware("admin"), deleteProduct);

module.exports = router;
