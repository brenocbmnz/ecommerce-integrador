// src/pages/ShopPage.js
import React from 'react';
import ProductCard from '../product/ProductCard';

const ShopPage = ({ products, onAddToCart, onProductClick }) => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onProductClick={onProductClick} />
                ))}
            </div>
        </div>
    );
}

export default ShopPage;