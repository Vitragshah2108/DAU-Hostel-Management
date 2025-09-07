const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  status: { type: String, enum: ['lost', 'found', 'returned'], default: 'lost' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);
