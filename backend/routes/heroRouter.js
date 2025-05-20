// (In your Express.js routes file, e.g., server.js or routes/hero.js)
const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero'); // Adjust the path to your Hero model

// GET route to fetch hero data
router.get('/api/hero', async (req, res) => {
  try {
    const heroData = await Hero.findOne({});
    if (!heroData) {
      return res.status(404).json({ message: 'Hero data not found' });
    }
    res.json(heroData);
  } catch (error) {
    console.error('Error fetching hero data:', error);
    res.status(500).json({ message: 'Failed to fetch hero data' });
  }
});

// POST route to update hero data (example - needs proper authentication)
router.post('/api/admin/hero', async (req, res) => {
  try {
    const { imageUrl, title, subtitle } = req.body;
    let heroData = await Hero.findOne({});

    if (heroData) {
      heroData.imageUrl = imageUrl;
      heroData.title = title;
      heroData.subtitle = subtitle;
      heroData.updatedAt = Date.now();
      await heroData.save();
      res.json({ message: 'Hero data updated successfully', heroData });
    } else {
      const newHero = new Hero({ imageUrl, title, subtitle });
      await newHero.save();
      res.status(201).json({ message: 'Hero data created successfully', heroData: newHero });
    }
  } catch (error) {
    console.error('Error updating/creating hero data:', error);
    res.status(500).json({ message: 'Failed to update/create hero data' });
  }
});

module.exports = router; // Export the router if you're using separate route files