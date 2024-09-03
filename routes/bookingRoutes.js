const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware"); // For token validation

router.post(
  "/book-seat",
  authMiddleware.verifyToken, // Ensure user is authenticated
  bookingController.bookSeat
);

module.exports = router;
