const mongoose = require('mongoose');

const outpassPermissionSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  grantedBy: { type: String, default: 'HOD' },
  department: { type: String, required: true },
  grantedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

const OutpassPermission = mongoose.models.OutpassPermission || mongoose.model('OutpassPermission', outpassPermissionSchema, 'outpassPermissions');

module.exports = OutpassPermission;
