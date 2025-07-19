const EventPermission = require('../models/EventPermission');

exports.getAllEventPermissions = async (req, res) => {
  try {
    const permissions = await EventPermission.find().sort({ grantedAt: -1 });
    res.status(200).json({ eventPermissions: permissions });
  } catch (error) {
    console.error('Error fetching event permissions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
