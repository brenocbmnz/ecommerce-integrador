const mongoose = require('mongoose');
require('dotenv').config(); // Make environment variables available

const connectDB = async () => {
    // DEBUGGING: Log the URI to see if it's being loaded correctly.
    console.log('Attempting to connect with URI:', process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB Atlas!');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;