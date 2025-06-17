import React from 'react';

const OrderConfirmationPage = ({ order, onNavigate }) => {
    if (!order) {
        return (
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-2xl font-bold">Pedido não encontrado.</h1>
                <button onClick={() => onNavigate('home')} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
                    Voltar para a Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Obrigado pela sua compra!</h1>
                <p className="mb-2">Seu pedido foi realizado com sucesso.</p>
                <p className="font-semibold">ID do Pedido: {order._id}</p>
                <p className="font-semibold mb-6">Total: ${order.total.toFixed(2)}</p>
                <button onClick={() => onNavigate('home')} className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
                    Continuar Comprando
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;