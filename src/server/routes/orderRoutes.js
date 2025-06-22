const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - products
 *         - total
 *       properties:
 *         user:
 *           type: string
 *           description: ID do usuário (ObjectId do MongoDB)
 *         products:
 *           type: array
 *           description: Lista de produtos do pedido
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID do produto
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *         total:
 *           type: number
 *           description: Valor total do pedido
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do pedido
 *       example:
 *         user: "60d0fe4f5311236168a109ca"
 *         products:
 *           - productId: 1
 *             name: "Mouse Gamer"
 *             quantity: 2
 *             price: 199.99
 *           - productId: 2
 *             name: "Teclado Mecânico"
 *             quantity: 1
 *             price: 350.00
 *         total: 749.98
 *         createdAt: "2024-06-21T12:00:00Z"
 */ 

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createOrder);

module.exports = router;