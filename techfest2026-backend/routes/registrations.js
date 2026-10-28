const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Register for an event
router.post("/", auth, async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    // Check 1: Does event exist?
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check 2: Are seats available?
    if (event.seats <= 0) return res.status(400).json({ message: "No seats available" });

    // Check 3: Has user already registered?
    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) return res.status(400).json({ message: "Already registered for this event" });

    // Create registration & decrement available seats
    const registration = new Registration({ user: userId, event: eventId });
    await registration.save();

    event.seats -= 1;
    await event.save();

    res.status(201).json({ message: "Successfully registered for event", registration });
  } catch (err) {
    next(err);
  }
});

// Get user's registrations
router.get("/my", auth, async (req, res, next) => {
  try {
    const list = await Registration.find({ user: req.user.id }).populate("event");
    
    // Filter out registrations where event might be deleted/null
    const validRegistrations = list.filter((r) => r.event !== null);

    res.json(validRegistrations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;