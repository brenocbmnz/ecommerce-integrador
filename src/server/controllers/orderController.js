const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    const { cartItems, userId } = req.body;

    try {
        let total = 0;
        const orderProducts = [];

        for (const item of cartItems) {
            const product = await Product.findOne({ id: item.id });
            if (!product) {
                return res.status(404).json({ msg: `Produto não encontrado: ${item.name}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ msg: `Estoque insuficiente para: ${item.name}` });
            }

            product.stock -= item.quantity;
            await product.save();

            total += item.price * item.quantity;
            orderProducts.push({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            });
        }

        const newOrder = new Order({
            user: userId,
            products: orderProducts,
            total
        });

        const order = await newOrder.save();
        res.status(201).json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};
