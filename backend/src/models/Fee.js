const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amountDue: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
