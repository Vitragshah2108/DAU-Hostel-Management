const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  phone: { type: String },
  rollNumber: { type: String }, // students only
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
