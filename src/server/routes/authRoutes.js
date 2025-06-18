const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Importa o middleware
const { register, login, getLoggedInUser } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Registrar um usuário
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Autenticar usuário & obter token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Pega o usuário logado
// @access  Privado (requer token)
router.get('/me', authMiddleware, getLoggedInUser);

module.exports = router;