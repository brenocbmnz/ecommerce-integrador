import React from 'react';

const ProductCard = ({ product, onAddToCart, onProductClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
            <div onClick={() => onProductClick(product)} className="cursor-pointer">
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h3 onClick={() => onProductClick(product)} className="text-lg font-semibold text-gray-800 cursor-pointer">{product.name}</h3>
                    <p className="text-gray-500 mt-1">{product.category}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;