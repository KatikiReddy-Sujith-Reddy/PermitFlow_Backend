const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },   // hashed password
  name: { type: String },
  role: { type: String, required: true },
  department: { type: String },
  subject: { type: String },
  image: { type: String },
});
const Employee = mongoose.model('Employee', userSchema, 'Employees');

module.exports = Employee;
