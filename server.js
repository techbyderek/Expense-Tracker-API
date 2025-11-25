const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

const expensesRoutes = require('./routes/expensesRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/expenses', expensesRoutes);
app.use('/api/v1/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});