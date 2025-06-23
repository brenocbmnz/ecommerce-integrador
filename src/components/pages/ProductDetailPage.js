import React from 'react';

const ProductDetailPage = ({ product, onAddToCart, onBack }) => {

    return (
        <div className="container mx-auto px-6 py-12">
            <button onClick={onBack} className="mb-8 text-gray-600 hover:text-gray-900">&larr; Voltar para a loja</button>
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover" />
                    </div>
                </div>
                <div className="md:flex-1 px-4 mt-8 md:mt-0">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <p className="text-gray-600 text-sm mb-4 font-semibold">Em estoque: {product.stock}</p>
                    <div className="flex mb-4">
                        <span className="text-3xl font-bold text-gray-900">R${product.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    

                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;