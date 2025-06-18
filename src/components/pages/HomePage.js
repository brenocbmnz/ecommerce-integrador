// src/pages/HomePage.js
import React from 'react';
import ProductCard from '../product/ProductCard';

const HomePage = ({ products, onAddToCart, onProductClick }) => {
    return (
        <>
            {/* Hero Section */}
            <div className="bg-white">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Encontre Seu Próximo Produto Preferido
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Produtos de alta qualidade selecionados para você.
                    </p>
                    <button onClick={() => onProductClick(products[0])} className="mt-8 bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300">
                        Compre Agora
                    </button>
                </div>
            </div>

            {/* Product List Section */}
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.slice(0, 3).map(product => ( // Show only 3 featured products
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onProductClick={onProductClick} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;