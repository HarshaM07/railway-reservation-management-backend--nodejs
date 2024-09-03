const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post(
  "/add-train",
  adminMiddleware.protectAdmin,
  trainController.addTrain
);
router.get("/availability", trainController.getSeatAvailability);

module.exports = router;
