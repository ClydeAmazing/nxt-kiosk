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
      <div>
          {/* Collapsed Cart Summary */}
          {isCollapsed ? (
              <div 
                  onClick={toggleCollapse} 
                  className="fixed top-0 right-0 m-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg cursor-pointer z-50"
              >
                  <span>Cart ({cartItems.length} items)</span>
              </div>
          ) : (
              /* Expanded Cart Details */
              <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex flex-col z-50">
                  <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                      <h2 className="font-bold text-xl">Your Cart</h2>
                      <button onClick={toggleCollapse} className="text-white font-bold text-lg">
                          Close
                      </button>
                  </div>

                  {/* Scrollable Cart Items */}
                  <div className="flex-grow overflow-y-auto p-4">
                      {cartItems.length === 0 ? (
                          <p>Your cart is empty.</p>
                      ) : (
                          <ul>
                              {cartItems.map(item => (
                                  <li key={item.id} className="flex justify-between mb-2 border-b pb-2">
                                      <span>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
                                      <button 
                                          onClick={() => handleRemoveItem(item.id)} 
                                          className="text-red-500 hover:text-red-700"
                                      >
                                          Remove
                                      </button>
                                  </li>
                              ))}
                          </ul>
                      )}
                  </div>

                  {/* Bottom Footer within Main Content */}
                  <div className="p-4">
                      <div className="flex justify-between gap-4 w-full max-w-md mx-auto">
                          <button onClick={handleClearCart} className="flex-1 bg-red-500 text-white py-2 rounded">
                              Clear Cart
                          </button>
                          <button onClick={handleProceedToPayment} className="flex-1 bg-green-500 text-white py-2 rounded">
                              Proceed to Payment
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}