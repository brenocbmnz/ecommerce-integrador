import React, { useState } from 'react';

const RegisterPage = ({ onRegister, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || 'Falha no cadastro');
            }
            onRegister(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 flex justify-center">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold text-center mb-6">Cadastrar Usuário</h2>
                    {error && <p className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Senha</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Cadastrar</button>
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-6">
                        Já tem uma conta?{' '}
                        <a className="font-bold text-blue-500 hover:text-blue-800" href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>
                            Faça o login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;