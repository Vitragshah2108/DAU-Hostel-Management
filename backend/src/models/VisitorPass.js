const mongoose = require('mongoose');

const visitorPassSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitorName: { type: String, required: true },
  visitorPhone: { type: String, required: true },
  visitDate: { type: Date, required: true },
  purpose: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  qrCode: { type: String }, // generated QR code URL/path
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rejectedAt: { type: Date },
  rejectionReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('VisitorPass', visitorPassSchema);
