"use client";

import { useRouter } from "next/navigation";
import { useOrderContext } from "../context/OrderContext";
import { useState } from "react";

export default function Cart() {
    const router = useRouter();
    const { cartItems, removeFromCart, clearCart } = useOrderContext();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleProceedToPayment = () => {
      if (cartItems.length > 0){
          router.push('/payment');
      }else{
          alert("Your cart is empty. Please add items before proceeding to payment.")
      }
    };

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {isCollapsed ? (
                <div className="bg-teal-600 text-white p-4 shadow-lg flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">🛒 Cart</span>
                        <span className="bg-teal-500 px-2 py-1 rounded-full text-sm">
                            {cartItems.length} items
                        </span>
                    </div>
                    <button 
                        className="bg-teal-700 px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors"
                        onClick={toggleCollapse}
                    >
                        View Order
                    </button>
                </div>
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="font-bold text-xl">Your Cart</h2>
                            <button 
                                onClick={toggleCollapse}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">
                                    <p className="text-4xl mb-2">🛒</p>
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {cartItems.map(item => (
                                        <li key={item.id} 
                                            className="flex items-center justify-between bg-teal-50 p-4 rounded-lg"
                                        >
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span>Quantity: {item.quantity}</span>
                                                    <span>•</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-teal-600 hover:text-teal-800 p-2"
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="border-t p-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-lg">
                                    ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleClearCart}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Clear Cart
                                </button>
                                <button 
                                    onClick={handleProceedToPayment}
                                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}