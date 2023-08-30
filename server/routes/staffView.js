
const express = require('express');
const router = express.Router();
const Student = require('../model/studentModel');




router.get('/all', async (req, res) => {
  try {
    const users = await Student.find().sort({ createdAt: 'desc' });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
