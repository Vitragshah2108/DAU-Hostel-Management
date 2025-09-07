const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  wing: { type: String, required: true },
  capacity: { type: Number, default: 3 },
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['available', 'pending', 'allocated'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
