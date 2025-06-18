import React, { useMemo } from 'react';

const ShoppingCart = ({ isOpen, cartItems, onClose, onUpdateQuantity, onRemoveFromCart, onGoToCheckout }) => {
    // Calcula o subtotal, e só recalcula se os itens do carrinho mudarem
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

    return (
        // Overlay de fundo, que fica visível ou não com base no estado 'isOpen'
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            {/* O painel do carrinho que desliza da direita */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 ease-in-out`}>

                <div className="flex flex-col h-full">
                    {/* Cabeçalho do Carrinho */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold">Seu Carrinho</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-2xl">&times;</button>
                    </div>

                    {/* Corpo do Carrinho */}
                    {cartItems.length === 0 ? (
                        // Mensagem exibida se o carrinho estiver vazio
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-gray-500">Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        // Lista de itens se o carrinho não estiver vazio
                        <div className="flex-grow p-6 overflow-y-auto">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center mb-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">R${item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="border rounded-md px-2 py-1">-</button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="border rounded-md px-2 py-1">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-4 text-sm">Remover</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Rodapé do Carrinho */}
                    <div className="p-6 border-t">
                        <div className="flex justify-between items-center font-bold text-xl mb-4">
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <button
                            onClick={onGoToCheckout} // A função agora navega para a página de checkout
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={cartItems.length === 0}
                        >
                            Ir para o Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;