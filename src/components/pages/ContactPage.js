import React, { useState } from 'react';

const ContactPage = () => {
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        e.target.reset();
    };

    console.log('Rendering ContactPage component');
    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Mande uma Mensagem</h2>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                {showMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        Obrigado pela sua mensagem! Entraremos em contato em breve.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nome</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Seu Nome" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Seu E-mail" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Mensagem</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Sua Mensagem"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:shadow-outline" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;