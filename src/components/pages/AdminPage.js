import React, { useState, useEffect } from 'react';
import ProductForm from '../admin/ProductForm';

// API para as chamadas fetch
const api = {
    getProducts: () => fetch('http://localhost:5001/api/products').then(res => res.json()),
    createProduct: (product) => fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    }).then(res => res.json()),
    updateProduct: (id, product) => fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    }).then(res => res.json()),
    deleteProduct: (id) => fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'DELETE',
    }),
};

// A página agora recebe a propriedade onProductsChange do App.js
const AdminPage = ({ onProductsChange }) => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    // A função loadProducts agora só é usada para carregar a lista inicial da página de admin
    const loadProducts = async () => {
        const data = await api.getProducts();
        setProducts(data.sort((a, b) => a.id - b.id));
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            await api.deleteProduct(id);
            loadProducts(); // Atualiza a lista da página de admin
            onProductsChange(); // AVISA O App.js para recarregar a lista global
        }
    };

    const handleSave = async (productData) => {
        if (editingProduct) {
            await api.updateProduct(editingProduct.id, productData);
        } else {
            await api.createProduct(productData);
        }
        loadProducts(); // Atualiza a lista da página de admin
        onProductsChange(); // AVISA O App.js para recarregar a lista global
        setIsFormVisible(false);
        setEditingProduct(null);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsFormVisible(true);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Painel de Administrador</h1>

            {isFormVisible ? (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsFormVisible(false);
                        setEditingProduct(null);
                    }}
                />
            ) : (
                <div className="text-right mb-4">
                    <button onClick={handleAddNew} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Adicionar Novo Produto
                    </button>
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
                <h2 className="text-2xl font-semibold mb-4">Gerenciar Produtos</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4">ID</th>
                                <th className="p-4">Nome</th>
                                <th className="p-4">Preço</th>
                                <th className="p-4">Estoque</th>
                                <th className="p-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b">
                                    <td className="p-4">{product.id}</td>
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4">R${product.price.toFixed(2)}</td>
                                    <td className="p-4">{product.stock}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleEdit(product)} className="text-sm bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600">Editar</button>
                                        <button onClick={() => handleDelete(product.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;