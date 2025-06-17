// src/components/cart/ShoppingCart.js
import React, { useMemo } from 'react';

const ShoppingCart = ({ isOpen, cartItems, onClose, onUpdateQuantity, onRemoveFromCart }) => {
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 ease-in-out`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold">Your Cart</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-2xl">&times;</button>
                    </div>
                    {cartItems.length === 0 ? (
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-gray-500">Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="flex-grow p-6 overflow-y-auto">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center mb-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="border rounded-md px-2 py-1">-</button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="border rounded-md px-2 py-1">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-4">Remove</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="p-6 border-t">
                        <div className="flex justify-between items-center font-bold text-xl mb-4">
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700" disabled={cartItems.length === 0}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ShoppingCart;