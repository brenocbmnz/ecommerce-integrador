const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerDocs = require('./config/swagger');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express App
const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Swagger
swaggerDocs(app);

// Root route for simple testing
app.get('/', (req, res) => {
    res.send('Welcome to the ShopSphere API!');
});

// Define the port and start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});