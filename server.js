const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Only declared once

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sellpicoin.in',
    'https://www.sellpicoin.in',
    'https://front-ykr8.onrender.com',
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Routes
const submitKeyRoute = require('./routes/submitKeyRoute');
app.use('/api/submit-key', submitKeyRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
