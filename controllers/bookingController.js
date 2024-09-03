const SeatAvailability = require("../models/SeatAvailability");

const bookingController = {
  bookSeat: (req, res) => {
    const { train_id, seats_to_book } = req.body;

    if (!train_id || !seats_to_book) {
      return res
        .status(400)
        .json({ error: "Train ID and number of seats to book are required" });
    }

    SeatAvailability.getByTrainId(train_id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Train not found" });

      const availability = results[0];
      if (availability.available_seats < seats_to_book) {
        return res.status(400).json({ error: "Not enough seats available" });
      }

      const new_available_seats = availability.available_seats - seats_to_book;

      SeatAvailability.updateAvailableSeats(
        train_id,
        new_available_seats,
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Seats booked successfully" });
        }
      );
    });
  },
};

module.exports = bookingController;
