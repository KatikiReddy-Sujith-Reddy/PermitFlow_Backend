// controllers/studentController.js
const Student = require('../models/Student');

exports.getStudentsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    const students = await Student.find({ year: year });

    if (!students.length) {
      return res.status(404).json({ message: 'No students found for this year' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
