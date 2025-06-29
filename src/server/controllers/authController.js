const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função de Registro de Usuário
exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        user = new User({ email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Função de Login de Usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};


// Função para buscar o usuário logado a partir do token
exports.getLoggedInUser = async (req, res) => {
    try {
        // req.user é adicionado pelo middleware de autenticação
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro de Servidor');
    }
};