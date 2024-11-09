"use client";

import { useRouter } from "next/navigation";
import { useOrderContext } from "./context/OrderContext";

export default function Home() {
  const router = useRouter();
  const { setOrderType } = useOrderContext();

  const handleOrderTypeSelection = ( orderType: string ) => {
    setOrderType(orderType); // Set the order type in the context
    router.push('/order');
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold mb-8">Welcome to nxt-kiosk</h1>
      <p className="text-lg mb-8">Please choose an option to continue:</p>
      <div className="flex gap-8">
        <button 
          onClick={() => handleOrderTypeSelection('DineIn')}
          className="w-48 h-24 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-600">
          Dine In
        </button>
        <button 
          onClick={() => handleOrderTypeSelection('TakeAway')}
          className="w-48 h-24 bg-green-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-green-600">
          Take Away
        </button>
      </div>
      </main>
    </div>
  );
}
