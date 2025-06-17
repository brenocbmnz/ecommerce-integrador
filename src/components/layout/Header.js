import React from 'react';

const Header = ({ user, onLogout, cartItemCount, onCartClick, onNavigate }) => {

    const handleNavClick = (page) => {
        onNavigate(page);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="hover:text-gray-900">
                        ShopSphere
                    </a>
                </div>

                {/* Links de Navegação */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="text-gray-600 hover:text-gray-900">Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }} className="text-gray-600 hover:text-gray-900">Shop</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="text-gray-600 hover:text-gray-900">About</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-gray-600 hover:text-gray-900">Contact</a>
                </nav>

                {/* Seção de Usuário e Carrinho */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            {user.role === 'admin' && (
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('admin'); }} className="text-sm font-medium text-blue-600 hover:text-blue-800">Painel Admin</a>
                            )}
                            <span className="text-sm text-gray-600">Olá, {user.email}</span>
                            <button onClick={onLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
                        </div>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('login'); }} className="text-gray-600 hover:text-gray-900">Login</a>
                    )}

                    <button className="group" onClick={onCartClick}>
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;