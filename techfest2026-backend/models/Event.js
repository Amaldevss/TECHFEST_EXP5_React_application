const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  fee: { type: Number, required: true, min: 0 },
  seats: { type: Number, required: true, min: 0 },
  date: { type: String, required: true }
});

module.exports = mongoose.model("Event", EventSchema);