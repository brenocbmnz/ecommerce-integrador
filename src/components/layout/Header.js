import React from 'react';

const Header = ({ cartItemCount, onCartClick, onNavigate }) => {

    const handleNavClick = (page, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // This console.log is our test.
        // It should appear in the browser's console every time you click a nav link.
        console.log('Header link clicked, attempting to navigate to:', page);
        if (typeof onNavigate === 'function') {
            onNavigate(page);
        } else {
            console.error('onNavigate is not a function', onNavigate);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    <button
                        onClick={() => handleNavClick('home')}
                        className="text-gray-800 hover:text-gray-900 focus:outline-none"
                    >
                        ShopSphere
                    </button>
                </div>
                <nav className="hidden md:flex space-x-6">
                    <button
                        onClick={() => handleNavClick('home')}
                        className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer font-inherit focus:outline-none"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleNavClick('shop')}
                        className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer font-inherit focus:outline-none"
                    >
                        Shop
                    </button>
                    <button
                        onClick={() => handleNavClick('about')}
                        className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer font-inherit focus:outline-none"
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleNavClick('contact')}
                        className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer font-inherit focus:outline-none"
                    >
                        Contact
                    </button>
                </nav>
                <div className="flex items-center">
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