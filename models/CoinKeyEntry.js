const mongoose = require('mongoose');

const CoinKeyEntrySchema = new mongoose.Schema({
  quantity: Number,
  totalAmount: Number,
  method: String,
  upiId: String,
  accountNo: String,
  ifsc: String,
  accountHolder: String,
  coinKey: String,
  contactId: String,
  fundAccountId: String,
  payoutId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CoinKeyEntry', CoinKeyEntrySchema);
