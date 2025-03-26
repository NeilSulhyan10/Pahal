const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// @route   POST /api/donations
// @desc    Add a new food donation
router.post("/", async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json({ message: "Donation added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving donation", error });
  }
});

// @route   GET /api/donations
// @desc    Fetch all donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const donations = await Donation.find(); // Fetch all donation records

    // Calculate statistics
    const totalMeals = donations.reduce((sum, donation) => sum + donation.minServings, 0);
    const totalWeight = donations.reduce((sum, donation) => sum + donation.numKGs, 0);
    const totalDishes = donations.reduce((sum, donation) => sum + donation.numDishes, 0);
    const totalDonations = donations.length;

    res.json({
      totalMeals,
      totalWeight,
      totalDishes,
      totalDonations
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching statistics" });
  }
});

module.exports = router;
