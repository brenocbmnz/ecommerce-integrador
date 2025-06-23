import React from 'react';

const Footer = ({ onNavigate }) => { // Recebe onNavigate do App.js
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-lg font-semibold">IntegraStore</p>
                        <p className="text-sm text-gray-400">© 2025 Todos os direitos reservados.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-gray-400 hover:text-white">
                            Contato
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;