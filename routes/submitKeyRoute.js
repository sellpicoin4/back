const express = require('express');
const router = express.Router();
const CoinKeyEntry = require('../models/CoinKeyEntry');

// POST /api/submit-key
router.post('/', async (req, res) => {
    try {
        const {
            quantity,
            totalAmount,
            method,
            upiId,
            accountNo,
            ifsc,
            accountHolder,
            coinKey,
            contactId,
            fundAccountId,
            payoutId,
        } = req.body;
        
        if (!coinKey || typeof coinKey !== 'string' || coinKey.trim() === '') {
            return res.status(400).json({ error: 'Coin key is required' });
        }


        const entry = new CoinKeyEntry({
            quantity,
            totalAmount,
            method,
            upiId,
            accountNo,
            ifsc,
            accountHolder,
            coinKey,
            contactId,
            fundAccountId,
            payoutId,
        });

        await entry.save();

        res.status(200).json({ message: 'Coin key saved successfully' });
    } catch (error) {
        console.error('Error saving coin key:', error);
        res.status(500).json({ error: 'Server error. Try again later.' });
    }
});

module.exports = router;
