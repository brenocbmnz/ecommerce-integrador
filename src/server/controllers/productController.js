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
            stock: req.body.stock || 10,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

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



const seedProducts = async (req, res) => {
    const initialProducts = [
        // As categorias agora estão em português para consistência
        { id: 1, name: 'Relógio de Couro Clássico', category: 'Acessórios', price: 150, imageUrl: 'https://placehold.co/600x600/5a7a7a/ffffff?text=Relógio', description: 'Um relógio atemporal que combina design clássico com confiabilidade moderna.', stock: 15 },
        { id: 2, name: 'Fones de Ouvido Bluetooth', category: 'Eletrônicos', price: 99.99, imageUrl: 'https://placehold.co/600x600/4a5568/ffffff?text=Fones', description: 'Mergulhe em som de alta fidelidade com estes fones de ouvido Bluetooth elegantes e confortáveis.', stock: 25 },
        { id: 3, name: 'Mochila Minimalista', category: 'Bolsas', price: 75, imageUrl: 'https://placehold.co/600x600/9a8c78/ffffff?text=Mochila', description: 'Carregue seus itens essenciais com estilo nesta mochila minimalista.', stock: 20 },
        { id: 4, name: 'Camiseta de Algodão Orgânico', category: 'Vestuário', price: 25, imageUrl: 'https://placehold.co/600x600/a8a29e/ffffff?text=Camiseta', description: 'Macia, respirável e ecológica. Esta camiseta é feita de 100% algodão orgânico.', stock: 50 },
        { id: 5, name: 'Garrafa de Água Inox', category: 'Artigos para Casa', price: 30, imageUrl: 'https://placehold.co/600x600/78716c/ffffff?text=Garrafa', description: 'Mantenha-se hidratado em movimento com esta garrafa de água de aço inoxidável com parede dupla.', stock: 40 },
        { id: 6, name: 'Grãos de Café Artesanal', category: 'Alimentos', price: 22, imageUrl: 'https://placehold.co/600x600/6f4e37/ffffff?text=Café', description: 'Comece o seu dia bem com nossos grãos de café artesanais de origem única.', stock: 30 }
    ];
    try {
        await Product.deleteMany({}); // Limpa os produtos existentes primeiro
        await Product.insertMany(initialProducts);
        res.status(200).send('Database has been successfully seeded with stock in Portuguese!');
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