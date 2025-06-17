const Product = require('../models/Product');

// GET all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

// GET a single product by its ID
const getProductById = async (req, res) => {
    try {
        // Note: We are finding by the custom 'id' field, not MongoDB's '_id'
        const product = await Product.findOne({ id: req.params.id });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching single product:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

// CREATE a new product
const createProduct = async (req, res) => {
    try {
        // Simple logic to create a new unique ID.
        // In a large-scale application, a more robust solution like UUIDs would be better.
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct = new Product({
            id: newId,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

// UPDATE an existing product by ID
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true } // This option returns the document after it has been updated.
        );

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
};

// DELETE a product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });

        if (deletedProduct) {
            res.json({ message: 'Product successfully deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
};


// Controller function to seed the database with initial data.
const seedProducts = async (req, res) => {
    const initialProducts = [
        { id: 1, name: 'Classic Leather Watch', category: 'Accessories', price: 150, imageUrl: 'https://placehold.co/600x600/5a7a7a/ffffff?text=Leather+Watch', description: 'A timeless timepiece that combines classic design with modern reliability. Featuring a genuine leather strap and a stainless steel case, this watch is perfect for any occasion.' },
        { id: 2, name: 'Modern Bluetooth Headphones', category: 'Electronics', price: 99.99, imageUrl: 'https://placehold.co/600x600/4a5568/ffffff?text=Headphones', description: 'Immerse yourself in high-fidelity sound with these sleek, comfortable Bluetooth headphones. Enjoy up to 20 hours of playtime on a single charge.' },
        { id: 3, name: 'Minimalist Backpack', category: 'Bags', price: 75, imageUrl: 'https://placehold.co/600x600/9a8c78/ffffff?text=Backpack', description: 'Carry your essentials in style with this minimalist backpack. Made from durable, water-resistant materials, it features multiple compartments for organization.' },
        { id: 4, name: 'Organic Cotton T-Shirt', category: 'Apparel', price: 25, imageUrl: 'https://placehold.co/600x600/a8a29e/ffffff?text=T-Shirt', description: 'Soft, breathable, and eco-friendly. This t-shirt is made from 100% organic cotton and is a perfect staple for your wardrobe.' },
        { id: 5, name: 'Stainless Steel Water Bottle', category: 'Home Goods', price: 30, imageUrl: 'https://placehold.co/600x600/78716c/ffffff?text=Bottle', description: 'Stay hydrated on the go with this double-walled, insulated stainless steel water bottle. Keeps your drinks cold for 24 hours or hot for 12.' },
        { id: 6, name: 'Artisan Coffee Beans', category: 'Groceries', price: 22, imageUrl: 'https://placehold.co/600x600/6f4e37/ffffff?text=Coffee', description: 'Start your day right with our single-origin artisan coffee beans. Ethically sourced and roasted to perfection for a rich, flavorful cup.' }
    ];
    try {
        await Product.deleteMany({}); // Clear existing products first
        await Product.insertMany(initialProducts);
        res.status(200).send('Database has been successfully seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ message: 'Error seeding database' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    seedProducts,
};