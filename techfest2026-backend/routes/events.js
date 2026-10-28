const express = require("express");
const Event = require("../models/Event");
const { auth, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET all events (Public)
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET single event by ID (Public)
router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// POST add new event (Admin only)
router.post("/", auth, adminOnly, async (req, res, next) => {
  try {
    const { name, category, fee, seats, date } = req.body;
    const newEvent = new Event({ name, category, fee, seats, date });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    next(err);
  }
});

// PUT update event (Admin only)
router.put("/:id", auth, adminOnly, async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
});

// DELETE event (Admin only)
router.delete("/:id", auth, adminOnly, async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;