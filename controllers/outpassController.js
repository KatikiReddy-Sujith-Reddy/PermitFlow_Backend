const Student = require('../models/Student');  // Your Student model
const OutpassPermission = require('../models/OutpassPermission');

exports.grantOutpassPermission = async (req, res) => {
  try {
    const { rollNo } = req.body;
    if (!rollNo) {
      return res.status(400).json({ message: 'rollNumber is required' });
    }

    // Find student in Students collection
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if permission already granted and still valid (expiresAt > now)
    const now = new Date();
    const existingPermission = await OutpassPermission.findOne({
      rollNo,
      expiresAt: { $gt: now },
    });

    if (existingPermission) {
      return res.status(200).json({
        message: 'Permission already granted and still valid',
        permission: existingPermission,
      });
    }

    // Grant new permission for 3 hours
    const expiresAt = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    const newPermission = new OutpassPermission({
      rollNo,
      grantedBy: req.user?.name || 'HOD',  // from auth middleware or default
      department: student.department,
      grantedAt: now,
      expiresAt,
    });

    await newPermission.save();

    return res.status(200).json({
      message: 'Outpass permission granted',
      permission: newPermission,
    });
  } catch (error) {
    console.error('Error in grantOutpassPermission:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
