const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.post("/menu",async (req,res) => {
    try{
        const newRestaurant = new Restaurant(req.body)
        await newRestaurant.save()
        res.status(201).json({ message: "Menu added successfully" })
    } catch(error) {
        res.status(500).json({ message: "Error saving Menu", error })
    }
})

router.get("/menus", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
})

module.exports = router