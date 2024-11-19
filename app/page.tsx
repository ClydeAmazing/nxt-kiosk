"use client";

import { useRouter } from "next/navigation";
import { useOrderContext } from "./context/OrderContext";
import { FaUtensils, FaShoppingBag } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const { setOrderType } = useOrderContext();

  const handleOrderTypeSelection = (orderType: string) => {
    setOrderType(orderType);
    router.push('/order');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <main className="flex flex-col items-center text-center">
          <div className="mb-16 space-y-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
              Welcome to 
              <span className="text-teal-600"> nxt-kiosk</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience quick and easy ordering with our self-service kiosk.
              Choose your preferred dining option to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
            <button 
              onClick={() => handleOrderTypeSelection('DineIn')}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-teal-50"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full bg-teal-100 p-6 text-teal-600 group-hover:bg-teal-200 transition-colors">
                  <FaUtensils size={40} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Dine In</h2>
                  <p className="text-gray-600">Enjoy your meal in our restaurant</p>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-teal-200 rounded-2xl transition-colors" />
            </button>

            <button 
              onClick={() => handleOrderTypeSelection('TakeAway')}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-teal-50"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full bg-teal-100 p-6 text-teal-600 group-hover:bg-teal-200 transition-colors">
                  <FaShoppingBag size={40} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Take Away</h2>
                  <p className="text-gray-600">Order and take your food with you</p>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-teal-200 rounded-2xl transition-colors" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
