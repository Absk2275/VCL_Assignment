const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../model/studentModel');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, './uploads'), // Use path.join to ensure correct path
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to create a new user
router.post('/create', upload.single('pdf'), async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const pdfPath = req.file ? req.file.path : '';

    const newUser = new Student({
      name,
      email,
      contact,
      pdfPath,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;