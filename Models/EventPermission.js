const mongoose = require('mongoose');

const eventPermissionSchema = new mongoose.Schema({
  rollNo: { type: String, required: false },  // make optional or remove `required: true`
  department: { type: String, required: false },
  grantedBy: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  grantedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.EventPermission || mongoose.model('EventPermission', eventPermissionSchema);

