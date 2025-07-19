const Student = require('../models/Student'); // from zStudents collection
const OutpassPermission = require('../models/OutpassPermission');
const jwt = require('jsonwebtoken');

const grantOutpass = async (req, res) => {
  try {
    const { rollNumber } = req.body;

    // Get user info from token (already set in req.user by middleware)
    const hodInfo = req.user;

    if (!hodInfo || hodInfo.role !== 'HOD') {
      return res.status(403).json({ message: 'Only HODs can grant outpasses' });
    }

    // Check student existence in Students
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create new outpass permission
    const newPermission = new OutpassPermission({
      grantedBy: hodInfo.username,
      hodName: hodInfo.name,
      department: hodInfo.branch,
      studentRoll: student.rollNumber,
      studentName: student.name,
      status: 'Granted',
    });

    await newPermission.save();

    return res.status(201).json({
      message: 'Outpass granted successfully',
      data: newPermission,
    });
  } catch (err) {
    console.error('Grant error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { grantOutpass };
