import React, { useState, useMemo } from 'react';

import ProductCard from '../product/ProductCard';
import CategoryFilter from '../shop/CategoryFilter';

const ShopPage = ({ products, onAddToCart, onProductClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => {
        return [...new Set(products.map(p => p.category))];
    }, [products]);

    // Filtra os produtos com base na categoria selecionada
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All') {
            return products;
        }
        return products.filter(product => product.category === selectedCategory);
    }, [products, selectedCategory]);

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nossos Produtos</h2>

            {/* Componente de Filtro de Categoria */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* Grid de Produtos Filtrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onProductClick={onProductClick} />
                ))}
            </div>

            {/* Mensagem caso nenhum produto seja encontrado na categoria */}
            {filteredProducts.length === 0 && (
                <div className="text-center mt-12">
                    <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                </div>
            )}
        </div>
    );
};

export default ShopPage;