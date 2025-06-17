const mongoose = require('mongoose');
require('dotenv').config(); // Make environment variables available

const connectDB = async () => {
    try {
        // The options that caused warnings have been removed.
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB Atlas!');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;