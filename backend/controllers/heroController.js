// controllers/heroController.js

import Hero from '../models/Hero.js'; // Adjust the path to your Hero model

export const getHeroData = async (req, res) => {
  try {
    const heroData = await Hero.findOne({});
    if (!heroData) {
      return res.status(404).json({ message: 'Hero data not found' });
    }
    res.json({ success: true, data: heroData });
  } catch (error) {
    console.error('Error fetching hero data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hero data' });
  }
};

export const updateHeroData = async (req, res) => {
  try {
    const { imageUrl, title, subtitle } = req.body;
    let heroData = await Hero.findOne({});

    if (heroData) {
      heroData.imageUrl = imageUrl;
      heroData.title = title;
      heroData.subtitle = subtitle;
      heroData.updatedAt = Date.now();
      await heroData.save();
      res.json({ success: true, message: 'Hero data updated successfully', data: heroData });
    } else {
      const newHero = new Hero({ imageUrl, title, subtitle });
      await newHero.save();
      res.status(201).json({ success: true, message: 'Hero data created successfully', data: newHero });
    }
  } catch (error) {
    console.error('Error updating/creating hero data:', error);
    res.status(500).json({ success: false, message: 'Failed to update/create hero data' });
  }
};