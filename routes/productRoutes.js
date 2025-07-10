const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authenticateUser = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload")

const router = express.Router();

//  GET - Public route (All users can view)
router.get("/", getAllProducts);

//  POST - Admin only
router.post("/", authenticateUser, roleMiddleware("admin"), upload.single("image"), addProduct);

//  PUT - Admin only
router.put("/:id", authenticateUser, roleMiddleware("admin"), upload.single("image"), updateProduct);

// DELETE - Admin only
router.delete("/:id", authenticateUser, roleMiddleware("admin"), deleteProduct);

module.exports = router;
