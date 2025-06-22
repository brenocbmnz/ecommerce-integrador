const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    seedProducts
} = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *         - imageUrl
 *         - description
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do produto
 *         name:
 *           type: string
 *           description: Nome do produto
 *         category:
 *           type: string
 *           description: Categoria do produto
 *         price:
 *           type: number
 *           description: Preço do produto
 *         imageUrl:
 *           type: string
 *           description: URL da imagem do produto
 *         description:
 *           type: string
 *           description: Descrição do produto
 *         stock:
 *           type: integer
 *           description: Quantidade em estoque
 *       example:
 *         id: 1
 *         name: "Mouse Gamer"
 *         category: "Periféricos"
 *         price: 199.99
 *         imageUrl: "https://exemplo.com/mouse.jpg"
 *         description: "Mouse gamer com iluminação RGB"
 *         stock: 50
 */

/**
 * @swagger
 * /api/products/seed:
 *   post:
 *     summary: Insere produtos de exemplo no banco
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Produtos de exemplo adicionados com sucesso
 */
router.post('/products/seed', seedProducts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/products/:id', getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/products', createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put('/products/:id', updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/products/:id', deleteProduct);

module.exports = router;