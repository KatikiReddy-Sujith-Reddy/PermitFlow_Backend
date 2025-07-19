const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  phoneNumber: { type: String, required: true }
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema, 'Students');
module.exports = Student;
