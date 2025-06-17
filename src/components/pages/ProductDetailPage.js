import React, { useState } from 'react';

const ProductDetailPage = ({ product, onAddToCart, onBack }) => {
    const [aiDescription, setAiDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateDescription = async () => {
        setIsLoading(true);
        setError('');
        setAiDescription('');

        const prompt = `You are a creative marketing assistant for an e-commerce store called ShopSphere. Write a fresh, exciting, and short (2-3 sentences) product description for the following item. Be creative and engaging.

Product Name: ${product.name}
Category: ${product.category}
Original Description: ${product.description}`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // Será fornecida pelo ambiente
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`A requisição da API falhou com o status ${response.status}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAiDescription(text);
            } else {
                throw new Error("Estrutura de resposta inválida da API.");
            }
        } catch (err) {
            console.error("Erro ao chamar a API Gemini:", err);
            setError("Desculpe, não conseguimos gerar uma nova descrição no momento. Por favor, tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    {/* Exibe o estoque do produto */}
                    <p className="text-gray-600 text-sm mb-4 font-semibold">Em estoque: {product.stock}</p>

                    <div className="flex mb-4">
                        <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    </div>

                    <p className="text-gray-600 mb-6">{aiDescription || product.description}</p>

                    {/* Funcionalidade da API Gemini */}
                    <div className="mb-6">
                        <button
                            onClick={generateDescription}
                            disabled={isLoading}
                            className="flex items-center justify-center w-full bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Gerando...
                                </>
                            ) : (
                                "✨ Gerar nova descrição"
                            )}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0} // Desabilita o botão se o estoque for 0
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