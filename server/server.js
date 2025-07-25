const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db')
require('dotenv').config();


const app = express();
app.use(express.json());

connectDB();


// CORS for local development or if frontend is separate
app.use(cors());

// Serve API routes
app.use('/api/clients', require('./routes/clientRoutes'));

const serviceRoutes = require('./routes/services');

app.use('/api/services', serviceRoutes);


// Serve React frontend
app.use(express.static(path.join(__dirname, '../pretty-hair/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../pretty-hair/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));