import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
    // Estado inicial do formulário agora inclui o campo 'stock'
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        imageUrl: '',
        description: '',
        stock: ''
    });

    useEffect(() => {
        if (product) {
            // Se estiver editando, preenche o formulário com os dados do produto
            setFormData(product);
        } else {
            // Se estiver criando, reseta o formulário com um valor padrão para o estoque
            setFormData({ name: '', category: '', price: '', imageUrl: '', description: '', stock: '10' });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-6">{product ? 'Editar Produto' : 'Criar Novo Produto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Nome */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    {/* Campo Categoria */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                        <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    {/* Campo Preço */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required step="0.01" />
                    </div>
                    {/* Campo Estoque */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque</label>
                        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                </div>
                {/* Campo URL da Imagem */}
                <div className="mt-6">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                    <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                {/* Campo Descrição */}
                <div className="mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
                </div>
                {/* Botões */}
                <div className="mt-8 flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Salvar Produto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
