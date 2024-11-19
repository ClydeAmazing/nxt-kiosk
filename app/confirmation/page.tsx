"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderContext } from '../context/OrderContext';

export default function ConfirmationPage() {
    const router = useRouter();
    const { orderType, cartItems, clearCart } = useOrderContext();

    // Handle redirect if no order
    useEffect(() => {
        if (!orderType || cartItems.length === 0) {
            router.push('/');
        }
    }, [orderType, cartItems.length, router]);

    // Don't render anything if no order
    if (!orderType || cartItems.length === 0) {
        return null;
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleNewOrder = () => {
        clearCart();
        router.push('/');
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✓</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-600">
                        Thank you for your order
                    </p>
                </div>

                <div className="border-t border-b border-gray-200 py-4 mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order Type:</span>
                        <span className="font-medium">{orderType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        Your order has been confirmed and will be ready soon.
                    </p>
                    <div className="text-sm text-gray-500">
                        Order number: #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                    </div>
                </div>

                <button
                    onClick={handleNewOrder}
                    className="mt-6 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                    Place New Order
                </button>
            </div>
        </div>
    );
};