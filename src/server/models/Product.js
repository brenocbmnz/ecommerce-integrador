const mongoose = require('mongoose');

// This defines the structure of the product documents in MongoDB.
const productSchema = new mongoose.Schema({
    // We keep the 'id' field for compatibility with the frontend,
    // but it's not the primary key MongoDB uses (_id is).
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
});

// Create the model from the schema.
const Product = mongoose.model('Product', productSchema);

// Export the model to be used in other files.
module.exports = Product;