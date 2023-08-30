const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Student = require("../model/studentModel")

// ...

// GET route to download a PDF file
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `./uploads/${filename}`);
    console.log(filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});
module.exports = router;