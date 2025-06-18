import React from 'react';
import ProductCard from '../product/ProductCard';

// O componente agora recebe 'onNavigate' como propriedade
const HomePage = ({ products, onAddToCart, onProductClick, onNavigate }) => {
    return (
        <>
            {/* Seção Hero */}
            <div className="bg-white">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Encontre seu Próximo Item Favorito
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Produtos de alta qualidade selecionados para você.
                    </p>
                    {/* O onClick agora chama a função onNavigate para a página 'shop' */}
                    <button onClick={() => onNavigate('shop')} className="mt-8 bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300">
                        Compre Agora
                    </button>
                </div>
            </div>

            {/* Seção de Produtos em Destaque */}
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Produtos em Destaque</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.slice(0, 3).map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onProductClick={onProductClick} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;