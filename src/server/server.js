const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Initialize Express App
const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// API Routes
// Use the productRoutes for any request to /api
app.use('/api', productRoutes);

// Root route for simple testing
app.get('/', (req, res) => {
    res.send('Welcome to the ShopSphere API!');
});

// Define the port and start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});