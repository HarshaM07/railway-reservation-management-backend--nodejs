const Train = require("../models/Train");

const trainController = {
  addTrain: (req, res) => {
    const { train_name, source, destination, total_seats } = req.body;
    Train.create(train_name, source, destination, total_seats, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Train added successfully" });
    });
  },
  getSeatAvailability: (req, res) => {
    const { source, destination } = req.query; // Use req.query for GET requests
    Train.findByRoute(source, destination, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },
};

module.exports = trainController;
