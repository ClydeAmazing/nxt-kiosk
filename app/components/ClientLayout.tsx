"use client";

import { OrderProvider } from "../context/OrderContext";
import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </OrderProvider>
  );
} 