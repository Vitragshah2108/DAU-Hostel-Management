const mongoose = require('mongoose');

const hostelEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('HostelEvent', hostelEventSchema);
