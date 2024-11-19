"use client";

import { useRouter } from "next/navigation";
import { useOrderContext } from "../context/OrderContext";
import { useState } from "react";

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
  },
  {
    id: 'cash',
    name: 'Cash',
    icon: '💵',
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: '📱',
  },
];

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems } = useOrderContext();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);    

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePayment = () => {
        if (!selectedMethod) {
            alert("Please select a payment method");
            return;
        }
        router.push('/confirmation');
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button 
                    onClick={() => router.push('/order')}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                >
                    Return to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 pb-24">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment</h1>
                <p className="text-gray-600">Total amount: ${total.toFixed(2)}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Select Payment Method</h2>
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4
                            ${selectedMethod === method.id 
                                ? 'border-primary-400 bg-primary-50' 
                                : 'border-gray-200 hover:border-primary-200'
                            }`}
                    >
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-medium text-gray-800">{method.name}</span>
                    </button>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handlePayment}
                        disabled={!selectedMethod}
                        className={`w-full py-3 rounded-lg text-white font-medium transition-colors
                            ${selectedMethod 
                                ? 'bg-primary-600 hover:bg-primary-700' 
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        Pay ${total.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
}