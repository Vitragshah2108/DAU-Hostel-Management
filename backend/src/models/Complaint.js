const mongoose = require('mongoose');

const adminNoteSchema = new mongoose.Schema({
  note: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedAt: { type: Date, default: Date.now },
});

const complaintSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['electrical', 'plumbing', 'geyser', 'other'], default: 'other' },
  photo: { type: String }, // Cloudinary URL
  status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' },
  adminNotes: [adminNoteSchema],
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
