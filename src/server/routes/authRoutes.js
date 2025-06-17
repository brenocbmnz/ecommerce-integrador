const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Registrar um usuário
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Autenticar usuário & obter token
// @access  Public
router.post('/login', login);

module.exports = router;