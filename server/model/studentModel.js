// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   resume: {
//     type: String,
//     required: true
//   }
// });

// const Student = mongoose.model('student', studentSchema);

// module.exports = Student;


// server/models/User.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  pdfPath: String,
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
