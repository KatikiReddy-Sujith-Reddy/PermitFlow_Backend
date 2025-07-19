const OutpassPermission = require('../models/OutpassPermission'); // adjust path

exports.getHourlyAnalytics = async (req, res) => {
  try {
    const hourlyCounts = await OutpassPermission.aggregate([
      {
        $group: {
          _id: { $hour: "$grantedAt" }, // hour from grantedAt without timezone
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const result = Array(24).fill(0);
    hourlyCounts.forEach(item => {
      result[item._id] = item.count;
    });

    res.json({ hourlyOutpassCounts: result });
  } catch (error) {
    console.error('Error fetching hourly analytics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
