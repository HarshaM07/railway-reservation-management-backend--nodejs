const connection = require("../config/db");

const Train = {
  create: (train_name, source, destination, total_seats, callback) => {
    const query =
      "INSERT INTO trains (train_name, source, destination, total_seats) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [train_name, source, destination, total_seats],
      (err, results) => {
        if (err) return callback(err);

        const train_id = results.insertId;
        const availabilityQuery =
          "INSERT INTO seat_availability (train_id, available_seats) VALUES (?, ?)";
        connection.query(availabilityQuery, [train_id, total_seats], callback);
      }
    );
  },
  findByRoute: (source, destination, callback) => {
    const query = `
            SELECT t.*, sa.available_seats
            FROM trains t
            JOIN seat_availability sa ON t.id = sa.train_id
            WHERE t.source = ? AND t.destination = ?
        `;
    connection.query(query, [source, destination], callback);
  },
  findById: (train_id, callback) => {
    const query = "SELECT * FROM trains WHERE id = ?";
    connection.query(query, [train_id], callback);
  },
  updateSeats: (train_id, available_seats, callback) => {
    const query =
      "UPDATE seat_availability SET available_seats = ? WHERE train_id = ?";
    connection.query(query, [available_seats, train_id], callback);
  },
};

module.exports = Train;
