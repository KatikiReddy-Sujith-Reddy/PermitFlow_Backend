const EventPermission = require('../models/eventPermission');
const Student = require('../models/Student');

exports.grantEventPermissions = async (req, res) => {
  try {
    const { rollNumbers, startDate, endDate } = req.body;

    if (!rollNumbers || !Array.isArray(rollNumbers) || rollNumbers.length === 0) {
      return res.status(400).json({ message: 'rollNumbers array is required' });
    }
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ message: 'startDate must be before endDate' });
    }

    // Fetch students by rollNo to verify all exist
    const students = await Student.find({ rollNo: { $in: rollNumbers } });
    if (students.length !== rollNumbers.length) {
      return res.status(404).json({ message: 'Some students not found' });
    }

    // Prepare permission docs
    const permissionsToInsert = students.map(student => ({
      rollNo: student.rollNo,
      startDate: start,
      endDate: end,
      grantedBy: req.user?.name || 'HOD',
      grantedAt: new Date(),
    }));

    // Insert permissions
    await EventPermission.insertMany(permissionsToInsert);

    return res.status(200).json({ message: 'Event permissions granted successfully' });

  } catch (error) {
    console.error('Error in grantEventPermissions:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
