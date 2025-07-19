const OutpassPermission = require('../models/OutpassPermission');

exports.getGrantedOutpassPermissions = async (req, res) => {
  try {
    const permissions = await OutpassPermission.find().sort({ grantedAt: -1 });

    if (!permissions.length) {
      return res.status(404).json({ message: 'No outpass permissions found' });
    }

    res.status(200).json(permissions);
  } catch (error) {
    console.error('Error fetching outpass permissions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
