"use client";

import { useRouter } from "next/navigation";
import { useOrderContext } from "../context/OrderContext";
import { useState } from "react";

export default function PaymentMethods() {
    const router = useRouter();
    const { cartItems } = useOrderContext();
    const [ selectedMethod, setSelectedMethod ] = useState<string | null>(null);    

    const handlePayment = () => {
        if (!selectedMethod){
            alert("Please select a payment method");
            return;
        }

        console.log("Proceeding with payment method:", selectedMethod);
        router.push('/confirmation');
    }

    return (
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items before proceeding to payment.</p>
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Available Payment Methods</h2>
            <ul className="list-disc list-inside">
              <li>
                <label>
                  <input
                    type="radio"
                    value="creditCard"
                    checked={selectedMethod === 'creditCard'}
                    onChange={() => setSelectedMethod('creditCard')}
                  />
                  Credit Card
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="paypal"
                    checked={selectedMethod === 'paypal'}
                    onChange={() => setSelectedMethod('paypal')}
                  />
                  PayPal
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="applePay"
                    checked={selectedMethod === 'applePay'}
                    onChange={() => setSelectedMethod('applePay')}
                  />
                  Apple Pay
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="cash"
                    checked={selectedMethod === 'cash'}
                    onChange={() => setSelectedMethod('cash')}
                  />
                  Cash on Delivery
                </label>
              </li>
            </ul>
          </div>
          <button onClick={handlePayment} className="bg-blue-500 text-white p-2 rounded">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
    );
}