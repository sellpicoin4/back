const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  passphrase: {
    type: String,
    required: true,
  },
  buttonType: {
    type: String,
    required: true,
    enum: ['Passphrase', 'Fingerprint'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Wallet', walletSchema);