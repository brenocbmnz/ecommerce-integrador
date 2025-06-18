import React, { useMemo } from 'react';

const CheckoutPage = ({ cartItems, user, onConfirmPurchase, onNavigate }) => {
    // Calcula o subtotal, e só recalcula se os itens do carrinho mudarem
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

    // Se o carrinho estiver vazio, redireciona para a loja
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-2xl font-bold">Seu carrinho está vazio.</h1>
                <button onClick={() => onNavigate('shop')} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
                    Voltar para a Loja
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Revisão do Pedido</h1>

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Resumo dos Itens */}
                <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-4">Itens no Carrinho</h2>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-4 border-b">
                            <div className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">Quantidade: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-semibold">R${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Sumário do Pedido e Finalização */}
                <div className="w-full md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Sumário</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Frete</span>
                            <span>Grátis</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-4">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <button
                            onClick={onConfirmPurchase}
                            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Concluir Compra
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={() => onNavigate('shop')} className="text-blue-600 hover:underline">
                            Continuar comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;